// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

// Add a single space in front of numbers < 10
export function spacePad(i) {
  if (i < 10) {
    i = ' ' + i
  }
  return i
}

export function round(number, roundTo) {
  const rounded = Math.round(number)
  return rounded -  rounded % roundTo
}

export function getTimeStr(now, offset=0){
  let dayPrefix = '';
  now.setMinutes(now.getMinutes() + offset * 60);
  let hours = now.getHours();

  if(hours >= 24){
    hours = hours % 24
    dayPrefix = '+'
  }else if(hours < 0){
    hours = hours + 24
    dayPrefix = '-'
  }


  //if (preferences.clockDisplay === "12h") {
  if (false){
    // 12h format
    hours = util.spacePad(hours % 12 || 12)
  } else {
    // 24h format
    hours = zeroPad(hours)
  }
  let mins = zeroPad(now.getMinutes())
  return `${dayPrefix}${hours}:${mins}`

}

export function formatDate(date, month){
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (monthNames[month] + ' ' + date)
}

/**
 * Stolen from https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
 * @param {Object} obj
 */
export function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) // eslint-disable-line
      return false
  }
  return true
}
