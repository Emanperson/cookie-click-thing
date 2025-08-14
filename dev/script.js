// this code is VERY fucky so good luck :3
var version = "1.4.1";

// General game setup
var cookieamount = 0;
var clickamount = 1;
var errors = 0;

// var developer = "1";

// Buy amounts
var minibuyamount = "15";
var ovenbuyamount = 100;
var grandmotherbuyamount = 10000;
// debug
var devbuild = "1";

console.log("Please work :3");
console.log(version);
console.log("Feel free to yoink code from this if you want");
document.getElementById("grandmotherbuy").hidden = true;

// should be built in but whatever
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// sleep(ms).then(() => { });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const infobox = document.getElementById("info");
function info(infocommand) {
  if (infocommand === "clear") {
    infobox.innerHTML = ""; 
  } else {
    infobox.innerHTML = "<p>" + infocommand + "</p>";
  }
}

function notenuough() {
  infobox.innerHTML = "<p>Not enough Cookies!</p>";
}
function clear() {
  infobox.innerHTML = ""; 
}

//
// Core Functions
//

// THE BUTTON
function addcookie() {
  try {
    played = 1;
    cookieamount += clickamount;
    refresh_amounts();
    info("clear");


  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("COOKIE_CLICK_FAILED");
  }
}
// THE function
function refresh_amounts() {
  try {
    document.getElementById("amount").innerHTML =
      cookieamount + " Cookies" + "<br>" + clickamount + " per click"
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("AMOUNT_REFRESH_FAILED");
  }
}

//
// Purchases :3
//

function buyminiclick() {
  try {
    info("clear");
    if (cookieamount >= minibuyamount) {
      cookieamount = cookieamount - minibuyamount;
      clickamount += 1;
      refresh_amounts();
      minibuyamount = Number(minibuyamount) + 5;
      document.getElementById("miniclickbuy").innerHTML =
        "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    } else {
      info("Not enough Cookies!");
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("PURCHASE_FAULT");
  }
}

function buyoven() {
  try {
    info("clear");

    if (cookieamount >= ovenbuyamount) {
      cookieamount -= ovenbuyamount;
      clickamount += 20;
      refresh_amounts();
      ovenbuyamount = Number(ovenbuyamount) * 2;
      document.getElementById("ovenbuy").innerHTML =
        "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
      unlockgrandma();
    } else {
      info("Not enough Cookies!");
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("PURCHASE_FAULT");
  }
}
function unlockgrandma() {
  document.getElementById("grandmotherbuy").hidden = false;
}

function buygrandmother() {
  try {
    info("clear");

    if (cookieamount >= grandmotherbuyamount) {
      cookieamount = cookieamount - grandmotherbuyamount;
      clickamount += 100;
      refresh_amounts();
      grandmotherbuyamount = grandmotherbuyamount * 2;
      document.getElementById("grandmotherbuy").innerHTML =
        "Someone's grandmother (+100 per click) | " +
        grandmotherbuyamount +
        " Cookies";
    } else {
      info("Not enough Cookies!");
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("PURCHASE_FAULT");
  }
}

// cheats
function devmode() {
  console.log("chea- i mean dev mode activated");
  cheat();
}
function cheat() {
  try {
    if (devbuild == 1) {
      document.querySelector("#dev").innerHTML =
        "<input id='devcooks' type='number'></input>" +
        "<br>" +
        "<button onclick='devcook()'>Jesse, we need to cook</button>" +
        "<br>";
    } else {
      crash("CHEATS_DETECTED");
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("CHEATS_FAILED");
  }
}

function devcook() {
  
  if (deviscookin == "69198") {
    console.log("FISH");
    crash("FISH");
  }
    
  else if (isNaN(deviscookin)) {
    crash("BAD_CHEATS");
  } else {
    let deviscookin = parseInt(document.getElementById("devcooks").value, 10);
    cookieamount += deviscookin;
    refresh_amounts();
  }
}

//
//ERROR HANDLE :3
//
function crash(failreason) {
  
  document.getElementById("bsod").hidden = false;
  document.getElementById("game").remove();
  console.error("CRASHED!");
  console.error(failreason);
  if (failreason == undefined) {
  } else {
    document.getElementById("dbug").innerHTML = failreason;
  }
  document.querySelector("html").style.background = "#0074d0";
  if (devbuild == 1) {
    document.querySelector("html").style.background = "#41FF00";
  }
  sleep(10000).then(() => {
    window.location.reload();
  });
}
// Made by emanperson0 :3
