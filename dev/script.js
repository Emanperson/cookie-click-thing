var version = "1.5.0 - AUTOCLICKER V2.0 ALPHA";

// General game setup
var cookieamount = 0;
var clickamount = 1;
var errors = 0;

// var developer = "1";

// Buy amounts
var minibuyamount = "15";
var ovenbuyamount = 1000;
var grandmotherbuyamount = 10000;
var protoclickerbuyamount = 50000;
var autoclickbuyamount = 1; // probably going to be 100,000 once fully implamented
// debug
var devbuild = "1";

// 2nd attempt of autoclicker stuff (first one was HOT garbage)
// this time with p5.js
let clickspersec = 0;
function setup() {
  frameRate(1);
  // 1x per sec
}
function draw() {
  cookieamount += clickspersec;
  refresh_amounts();
  // why didn't i do this earlier that took 5 minutes max (at leas for inital stuff)
  //might just have it call addcookie(); but idk yet
  // i mean its potrayed as clickinng the cookie so it'd make sense
  //imma write it incase i wanna do it
  // frameRate(clickspersec);
  // addcookie();
}

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
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("COOKIE_CLICK_FAILED");
  }
}
// THE function
function refresh_amounts() {
  try {
    document.getElementById("amount").innerHTML =
      cookieamount + " Cookies" + "<br>" + clickamount + " per click";
    document.getElementById("miniclickbuy").innerHTML =
      "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    document.getElementById("ovenbuy").innerHTML =
      "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
    document.getElementById("grandmotherbuy").innerHTML =
      "Someone's grandmother (+100 per click) | " +
      grandmotherbuyamount +
      " Cookies";
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("AMOUNT_REFRESH_FAILED");
  }
}

//
// Purchases :3
//

// new buy thing to clean up code
function buy(purchaseID) {
  try {
    if (purchaseID == 0) {
      console.warn("A Valid purchase ID is required.");
    } else if (purchaseID == 1 && cookieamount >= minibuyamount) {
      cookieamount -= minibuyamount;
      clickamount += 1;
      refresh_amounts();
      minibuyamount = Number(minibuyamount) + 5;
      document.getElementById("miniclickbuy").innerHTML =
        "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    } else if (purchaseID == 1 && cookieamount < minibuyamount) {
      info("Not enough Cookies!");
    } else if (purchaseID == 2 && cookieamount >= ovenbuyamount) {
      cookieamount -= ovenbuyamount;
      clickamount += 20;
      refresh_amounts();
      ovenbuyamount = Number(ovenbuyamount) * 2;
      document.getElementById("ovenbuy").innerHTML =
        "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
      document.getElementById("grandmotherbuy").hidden = false;
    } else if (purchaseID == 2 && cookieamount < ovenbuyamount) {
      info("Not enough Cookies!");
    } else if (purchaseID == 3 && cookieamount >= grandmotherbuyamount) {
      cookieamount -= grandmotherbuyamount;
      clickamount += 100;
      refresh_amounts();
      grandmotherbuyamount = grandmotherbuyamount * 2;
      document.getElementById("grandmotherbuy").innerHTML =
        "Someone's grandmother (+100 per click) | " +
        grandmotherbuyamount +
        " Cookies";
    } else if (purchaseID == 5 && cookieamount >= autoclickbuyamount) {
      // ID 5 bc i plan to make a shittier version of it thats cheaper but this is really jus a test
      cookieamount -= autoclickbuyamount;
      clickspersec += 1;
    } else {
      console.error("illegal purchase ID");
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("PURCHASE_FAULT");
  }
}

//
// TODO: migrate to the buy() function
//
// this is going to be in the code for a while but its probably going to go unused
// i think the term is depricateed
//it works but shouldnt really be used anymore
// note how the autoclicker uses buy() only
// imma put a cheat sheet in here eventually
function buyminiclick() {
  try {
    info("clear");
    if (cookieamount >= minibuyamount) {
      cookieamount -= minibuyamount;
      clickamount += 1;
      refresh_amounts();
      minibuyamount = Number(minibuyamount) + 5;
      document.getElementById("miniclickbuy").innerHTML =
        "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    } else {
      info("Not enough Cookies!");
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
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
      document.getElementById("grandmotherbuy").hidden = false;
    } else {
      info("Not enough Cookies!");
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("PURCHASE_FAULT");
  }
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
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("PURCHASE_FAULT");
  }
}
//
// End leagacy buy system
//

// cheats
function devmode() {
  console.log("chea- i mean dev mode activated");
  cheat();
}
function cheat() {
  try {
    document.getElementById("dev").hidden = false;
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("CHEATS_FAILED");
  }
}

function devcook() {
  if (deviscookin == "FISH") {
    console.log("FISH");
    crash("FISH");
  } else if (isNaN(deviscookin)) {
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
