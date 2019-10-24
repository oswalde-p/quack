import { settingsStorage } from 'settings'

import * as simpleSettings from './simple/companion-settings'
import { SETTINGS_EVENTS } from '../common/constants'

// make sure the settings component starts out with default values

settingsStorage.setItem(SETTINGS_EVENTS.SHOW_SECOND_TIME, 'true')
settingsStorage.setItem(SETTINGS_EVENTS.SHOW_BATTERY_STATUS, 'true')
settingsStorage.setItem(SETTINGS_EVENTS.SHOW_SYNC_WARNING, 'true')
settingsStorage.setItem(SETTINGS_EVENTS.SYNC_WARNING_THRESHOLD, '40')
settingsStorage.setItem(SETTINGS_EVENTS.PRIMARY_COLOR = '#783c94')

simpleSettings.initialize()
