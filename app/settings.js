import * as simpleSettings from './simple/device-settings'
import { SETTINGS_EVENTS as EVENTS, DEFAULT_WARNING_THRESHOLD } from '../common/constants'

class Settings {
  constructor(onTick) {
    this.onTick = onTick
    this.showSyncWarning = true
    this.syncWarningThreshold = DEFAULT_WARNING_THRESHOLD
    this.showBatteryStatus = true
    this.showSecondTime = true
    this.secondtimeOffset = 0
    this.color = '#783c94'
    simpleSettings.initialize((data) => {
      callback(data, this)
      try {
        this.onTick()
      } catch(err) {
        // swallow the error thrown during intializing
        console.log('Ignoring error during initialization:') // eslint-disable-line no-console
        console.log(err) // eslint-disable-line no-console
      }
    })
  }
}

function callback(data, storage) {
  if (!data) {
    return
  } else {
    storage.showBatteryStatus = !!(data[EVENTS.SHOW_BATTERY_STATUS])
    storage.showSecondTime = !!(data[EVENTS.SHOW_SECOND_TIME])
    storage.showSyncWarning = !!(data[EVENTS.SHOW_SYNC_WARNING])

    if (data[EVENTS.SECOND_TIME_OFFSET]) {
      storage.secondtimeOffset = Number(data[EVENTS.SECOND_TIME_OFFSET].name)
    }

    if (data[EVENTS.SYNC_WARNING_THRESHOLD] && data[EVENTS.SYNC_WARNING_THRESHOLD].name != '') {
      storage.syncWarningThreshold = Number(data[EVENTS.SYNC_WARNING_THRESHOLD].name)
    }

    if (data[EVENTS.PRIMARY_COLOR]) {
      storage.color = data[EVENTS.PRIMARY_COLOR]
    }

    if (data[EVENTS.PRIMARY_COLOR_CUSTOM] && data[EVENTS.PRIMARY_COLOR_CUSTOM].name != '') {
      storage.color = data[EVENTS.PRIMARY_COLOR_CUSTOM].name
    }
  }

}

export { Settings }
