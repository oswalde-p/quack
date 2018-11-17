import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { preferences } from "user-settings";
import { battery } from "power";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

let hrm = new HeartRateSensor();

// Get a handle on the <text> element
const timeText = document.getElementById("time");
const background = document.getElementById("background");
const message = document.getElementById("message");
const dateText = document.getElementById("date");

const stat1 = document.getElementById("stat1");
const stat2 = document.getElementById("stat2");

let messageOn = false;
message.style.display = "none";


//hrm.start();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let month = today.getMonth();
  let date = today.getDate();
  let hours = today.getHours();
  
  dateText.text = formatDate(date, month);
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = util.spacePad(hours % 12 || 12);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  timeText.text = `${hours}:${mins}`;
  
  updateBattery();
}

background.onclick = (e) => {
  toggleMessage();
}

function toggleMessage(){
  if(messageOn){
    message.style.display = "none";
    messageOn = false;
  }else{
    message.style.display = "inline";
    messageOn = true;
  }
}



hrm.onreading = () => {
  stat1.text = hrm.heartRate + " bpm";
}

function updateBattery(){
  stat2.text = Math.floor(battery.chargeLevel) + "%"
} 

function formatDate(date, month){
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
                     "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  //const lastDigit = date % 10;
  return (monthNames[month] + " " + date);
}
