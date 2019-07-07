const SETTINGS_EVENTS = {
  SHOW_BATTERY_STATUS: 'showBatteryStatus',
  SHOW_SECOND_TIME: 'showSecondTime',
  SECOND_TIME_OFFSET: 'secondTimeOffset',
  SHOW_SYNC_WARNING: 'showWarning',
  SYNC_WARNING_THRESHOLD: 'warningThreshold',
  PRIMARY_COLOR: 'primaryColor',
  PRIMARY_COLOR_CUSTOM: 'primaryColorCustom'
}

const DEFAULT_WARNING_THRESHOLD = 40
const LOW_BATTERY_LIMIT = 16 // below 17%, OS low battery icon is shown

export { SETTINGS_EVENTS, DEFAULT_WARNING_THRESHOLD, LOW_BATTERY_LIMIT }
