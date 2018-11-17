// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Add a single space in front of numbers < 10
export function spacePad(i) {
  if (i < 10) {
    i = " " + i;
  }
  return i;
}
