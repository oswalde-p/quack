import clock from 'clock'
import document from 'document'
import { battery } from 'power'
import { me as device } from 'device'
import { vibration } from 'haptics'

import * as simpleSettings from './simple/device-settings'
import { formatDate, getTimeStr, round } from '../common/utils'
import { SETTINGS_EVENTS, DEFAULT_WARNING_THRESHOLD } from '../common/constants'

// Update the clock every minute
clock.granularity = 'minutes'

// settings variables
let secondtimeOffset = 0
let showSyncWarning = true
let syncWarningThreshold = DEFAULT_WARNING_THRESHOLD

// Get a handle on the <text> element
const timeText = document.getElementById('time')
const message = document.getElementById('message')
const dateText = document.getElementById('date')
const batteryStatusText = document.getElementById('stat1')
const secondTimeText = document.getElementById('stat2')

message.style.display = 'none'

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let now = evt.date
  updateClock(now)
  updateDate(now)
  updateSecondTime(now, secondtimeOffset)
  updateBattery()
  updateConnectionStatus(now)
}

function updateConnectionStatus(now){
  let minutesSinceSync = (now - device.lastSyncTime) / (60*1000)
  if (showSyncWarning && minutesSinceSync > syncWarningThreshold){
    displaySyncWarning(minutesSinceSync)
    if (message.style.display == 'none'){
      // showing warning for first time
      warningVibrate()
    }
    message.style.display = 'inline'
  }else{
    message.style.display = 'none'
  }

}

function displaySyncWarning(minutes){
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
  dateText.text = formatDate(now.getDate(), now.getMonth())
}

function updateSecondTime(now, offset){
  secondTimeText.text = getTimeStr(now, offset)
}

function updateBattery(){
  batteryStatusText.text = Math.floor(battery.chargeLevel) + '%'
}

function updateClock(now){
  timeText.text = getTimeStr(now)
}

function warningVibrate(){
  vibration.start('nudge-max')
}

/* -------- SETTINGS -------- */
function settingsCallback(data) {
  if (!data) {
    return
  }

  data[SETTINGS_EVENTS.SHOW_BATTERY_STATUS] ? batteryStatusText.style.display = 'inline' : batteryStatusText.style.display = 'none'

  data[SETTINGS_EVENTS.SHOW_SECOND_TIME] ? secondTimeText.style.display = 'inline' : secondTimeText.style.display = 'none'

  if (data[SETTINGS_EVENTS.SECOND_TIME_OFFSET]) {
    secondtimeOffset = Number(data[SETTINGS_EVENTS.SECOND_TIME_OFFSET].name)
    updateSecondTime(new Date(), secondtimeOffset)
  }

  if (data[SETTINGS_EVENTS.SHOW_SYNC_WARNING]){
    showSyncWarning = data[SETTINGS_EVENTS.SHOW_SYNC_WARNING]
    updateConnectionStatus(new Date())
  } else {
    showSyncWarning = false
    updateConnectionStatus(new Date())
  }

  if (data[SETTINGS_EVENTS.SYNC_WARNING_THRESHOLD] && data[SETTINGS_EVENTS.SYNC_WARNING_THRESHOLD].name != '') {
    // console.log(JSON.stringify(data, null, 2))
    syncWarningThreshold = Number(data[SETTINGS_EVENTS.SYNC_WARNING_THRESHOLD].name)
    updateConnectionStatus(new Date())
  }

  if (data[SETTINGS_EVENTS.PRIMARY_COLOR]) {
    timeText.style.fill = data[SETTINGS_EVENTS.PRIMARY_COLOR]
  }

  if (data[SETTINGS_EVENTS.PRIMARY_COLOR_CUSTOM] && data[SETTINGS_EVENTS.PRIMARY_COLOR_CUSTOM].name != '') {
    try {
      timeText.style.fill = data[SETTINGS_EVENTS.PRIMARY_COLOR_CUSTOM].name
    } catch(err) {
      console.log(err)
    }
  }


}
simpleSettings.initialize(settingsCallback)
