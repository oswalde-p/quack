import clock from 'clock'
import document from 'document'
import { battery } from 'power'
import { me as device } from 'device'
import { vibration } from 'haptics'

import { formatDate, formatTime, round } from '../common/utils'
import { LOW_BATTERY_LIMIT } from '../common/constants'
import { Settings } from './settings'

// Get a handle on the <text> element
const timeText = document.getElementById('time')
const abbreviationText = document.getElementById('abbreviation')
const message = document.getElementById('message')
const dateText = document.getElementById('date')
const batteryStatusText = document.getElementById('stat1')
const secondTimeText = document.getElementById('stat2')

message.style.display = 'none'
batteryStatusText.text = ''

function onTick(evt) {
  const now = evt ? evt.date : new Date()
  updateClock(now)
  updateDate(now)
  updateSecondTime(now)
  updateBattery()
  updateConnectionStatus(now)
}

const settings = new Settings(onTick)
clock.granularity = 'minutes'
clock.ontick = onTick

function updateConnectionStatus(now){
  let minutesSinceSync = (now - device.lastSyncTime) / (60 * 1000)
  if (settings.showSyncWarning && minutesSinceSync > settings.syncWarningThreshold){
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

function updateSecondTime(now){
  if (settings.showSecondTime) {
    const { time, abbreviation } = formatTime(now, settings.secondtimeOffset)
    secondTimeText.text = `${time}${abbreviation}`
  } else {
    secondTimeText.text = ''
  }
}

function updateBattery(){
  if (settings.showBatteryStatus) {
    if (battery.chargeLevel > LOW_BATTERY_LIMIT && !battery.charging) {
      return batteryStatusText.text = Math.floor(battery.chargeLevel) + '%'
    }
  }
  batteryStatusText.text = ''
}

function updateClock(now){
  const { time, abbreviation } = formatTime(now)
  timeText.text = time
  abbreviationText.text = abbreviation || ''

  if (settings.color != timeText.style.fill) {
    try {
      timeText.style.fill = settings.color
      abbreviationText.style.fill = settings.color
    } catch(err) {
      if (err.message.substring(0,22) == 'Cannot set property to') {
        console.log(`Cannot set color to "${settings.color}"`) // eslint-disable-line no-console
      } else {
        throw err
      }
    }
  }
}

function warningVibrate(){
  vibration.start('nudge-max')
}
