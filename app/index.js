import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { battery } from "power";
import * as util from "../common/utils";
import { me as device } from "device";
import { type } from "os";
import { vibration } from "haptics"

// settings
const CONFIG = {
  NO_SYNC_LIMIT: 35,
  SECOND_TIME_OFFSET: 10
}
// Update the clock every minute
clock.granularity = "minutes";


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
  updateSecondTime(now, CONFIG.SECOND_TIME_OFFSET)
  updateBattery();
  updateConnectionStatus(now)
}


function updateConnectionStatus(now){
  let minutesSinceSync = (now - device.lastSyncTime) / (60*1000)
  if (minutesSinceSync > CONFIG.NO_SYNC_LIMIT){
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
    message.text = `${minutes}m since sync`
  }
}

function round(number, roundTo) {
  const rounded = Math.round(number)
  return rounded -  rounded % roundTo
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

function getTimeStr(now, offset=0){
    let dayPrefix = "";
    let hours = now.getHours() + offset;

    if(hours >= 24){
      hours = hours % 24;
      dayPrefix = "+";
    }else if(hours < 0){
      hours = hours + 24;
      dayPrefix = "-";
    }


    //if (preferences.clockDisplay === "12h") {
    if (false){
        // 12h format
        hours = util.spacePad(hours % 12 || 12);
    } else {
        // 24h format
        hours = util.zeroPad(hours);
    }
    let mins = util.zeroPad(now.getMinutes());
    return `${dayPrefix}${hours}:${mins}`

}
function formatDate(date, month){
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
                     "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (monthNames[month] + " " + date);
}

function warningVibrate(){
    vibration.start("nudge-max")
}
