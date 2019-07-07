import clock from "clock"
import document from "document"
import { preferences } from "user-settings"
import { peerSocket } from "messaging"
import { battery } from "power"
import { formatDate, getTimeStr, round } from "../common/utils"
import { me as device } from "device"
import { type } from "os"
import { vibration } from "haptics"

// settings
const settings = {
  warningThreshold: 35,
  secondTimeOffset: -8,
  color: '#783c94',
  showWarning: true,
  showBattery: true,
  showSecondTime: true
}
// Update the clock every minute
clock.granularity = "minutes"

// Get a handle on the <text> element
const timeText = document.getElementById("time");
const message = document.getElementById("message");
const dateText = document.getElementById("date");
const batteryStatusText = document.getElementById("stat1");
const secondTimeText = document.getElementById("stat2");

let messageOn = false;
message.style.display = "none";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let now = evt.date;
  updateClock(now);
  updateDate(now);
  updateSecondTime(now, settings.secondTimeOffset) // not sure why "name" is needed here but okay
  updateBattery();
  updateConnectionStatus(now)
}

peerSocket.onmessage = function (evt){
  // settings.warningThreshold = evt.data.warningThreshold
  if ( evt.data.secondTimeOffset) settings.secondTimeOffset = evt.data.secondTimeOffset.name
  settings.color = evt.data.color
  settings.showWarning = evt.data.showWarning
  settings.showBattery = evt.data.showBattery
  settings.showSecondTime = evt.data.showSecondTime
  console.log(settings.secondTimeOffset)
  applySettings()
}

function applySettings() {
  console.log('applying settings')
  console.log(settings)
  if (settings.showBattery) {
    batteryStatusText.text = 'on'
  } else {
    batteryStatusText.text = 'off'
  }
}

function updateConnectionStatus(now){
  let minutesSinceSync = (now - device.lastSyncTime) / (60*1000)
  if (minutesSinceSync > settings.warningThreshold){
    showSyncWarning(minutesSinceSync)
    if (message.style.display === 'none'){
        // showing warning for first time
        warningVibrate()
    }
    message.style.display = 'inline'
  }else{
      message.style.display = 'none'
  }

}

function showSyncWarning(minutes){
  if (message){
    let roundTo = 5
    if (minutes > 60) {
      roundTo = 10
    }
    const roundedMinutes = round(minutes, roundTo)
    message.text = `${roundedMinutes}m since sync`
  }
}

function updateDate(now){
  dateText.text = formatDate(now.getDate(), now.getMonth());
}

function updateSecondTime(now, offset){
  secondTimeText.text = getTimeStr(now, offset)
}

function updateBattery(){
  batteryStatusText.text = Math.floor(battery.chargeLevel) + "%"
}

function updateClock(now){
    timeText.text = getTimeStr(now);
}

function warningVibrate(){
    vibration.start("nudge-max")
}
