// 1.5 (BETA - to be finalized by 26th to prep for release)
// 1.6 will probably just build apon this although some balance will occur in 1.5.x updates
// General game setup
var cookieamount = 0;
var clickamount = 1;
var errors = 0;

// Buy amounts
var minibuyamount = 15;
var ovenbuyamount = 1000;
var grandmotherbuyamount = 10000;
//var protoclickerbuyamount = 50000;
var AutoclickBuyAmount = 100000;


var devbuild = "1"; // 90% sure this is jus for the BSOD thing but oh well

document.getElementById("grandmotherbuy").hidden = true;

// saving stuff, at some point it'll be saved to localstorage automatically; prob tied into refesh_ammounts()
var savecode;
var saveVersion = 1;
function createSaveCode() {
  saveCode =
    "SAVE$" + cookieamount + "%" + clickamount + "%" + minibuyamount + "%" + ovenbuyamount + "%" + grandmotherbuyamount + "%" + protoclickerbuyamount + "%" + autoclickbuyamount +"%" + clickspersec + "%" + saveVersion + "$";
  prompt(
    "This is your save code; its easy to edit but it works.    " +
      saveCode
  );
}
function loadSaveCode() {
  let saveCode = prompt(
    "Please paste your save code. This will overwrite your current data."
  );

  // Check if the code starts with "SAVE$" and ends with "$"
  if (saveCode.startsWith("SAVE$") && saveCode.endsWith("$")) {
    // Strip the prefix and suffix
    let dataString = saveCode.slice(5, -1);

    // Split the string into individual values
    let dataParts = dataString.split("%");

    // Assign values back to variables
    cookieamount = parseInt(dataParts[0]);
    clickamount = parseInt(dataParts[1]);
    minibuyamount = parseInt(dataParts[2]);
    ovenbuyamount = parseInt(dataParts[3]);
    grandmotherbuyamount = parseInt(dataParts[4]);
    protoclickerbuyamount = parseInt(dataParts[5]);
    autoclickbuyamount = parseInt(dataParts[6]);
    clickspersec = parseInt(dataParts[7]);
    saveVersion = dataParts[8]; 
  } else {
    alert("Save code load failed. is it a valid code?");
  }
}
if (saveVersion != 1.5) {
  console.warn("For compatability, i will create a save updater tool when i make 1.6");
}
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
    document.getElementById("amount").innerHTML = cookieamount + " Cookies" + "<br>" + clickamount + "per click" + "<br>" + clickspersec + " Auto-clicks per second";
    document.getElementById("miniclickbuy").innerHTML =  "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    document.getElementById("ovenbuy").innerHTML = "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
    document.getElementById("grandmotherbuy").innerHTML = "Someone's grandmother (+100 per click) | " +  grandmotherbuyamount + " Cookies";
    document.getElementById("autoclickbuy").innerHTML = "Auto Clicker (+1 Click per second) | " + AutoclickBuyAmount + " Cookies";
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("AMOUNT_REFRESH_FAILED");
  }
}

let clickspersec = 0;
setInterval(autoClick, 1000);
function autoClick() {
  try {
    cookieamount += clickspersec;
    refresh_amounts();
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("AUTO_CLICK_FAILED");
  }
}
//
// Purchases :3
//

// new buy thing to clean up code
// 1 - mini click
// 2 - oven
// 3 - grandma
// 4 -
// 5 - autoclicker

function buy(purchaseID) {
  try {
     if (purchaseID == 1 && cookieamount >= minibuyamount) {
      cookieamount -= minibuyamount;
      clickamount += 1;
      minibuyamount = Number(minibuyamount) + 5;
        refresh_amounts();
    } else if (purchaseID == 2 && cookieamount >= ovenbuyamount) {
      cookieamount -= ovenbuyamount;
      clickamount += 20;
      ovenbuyamount = Number(ovenbuyamount) * 2;
    refresh_amounts();
      document.getElementById("grandmotherbuy").hidden = false;
    } else if (purchaseID == 3 && cookieamount >= grandmotherbuyamount) {
      cookieamount -= grandmotherbuyamount;
      clickamount += 100;
        grandmotherbuyamount = grandmotherbuyamount * 2;
          refresh_amounts();
    } else if (purchaseID == 5 && cookieamount >= AutoclickBuyAmount) {
      cookieamount -= AutoclickBuyAmount;
      clickspersec += 1;
      AutoclickBuyAmount *= 1.4;
          refresh_amounts();
    } else {
      info("Not enough Cookies!");
      console.warn("Not enough Cookies OR illegal purchase ID");
      console.log("I mostly jus assume not enough for a smoother experience")
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("PURCHASE_FAULT");
  }
}

function buyminiclick() {
  buy("1");
}
function buyoven() {
  buy("2");
}
function buygrandmother() {
  buy("3");
}
// shortcuts incase i forgot smething; the new code does the same thing but better

// cheats
// this is going to be replaced soon; this is some of the very early code and could be improved
function devmode() {
  document.getElementById("dev").hidden = false;
}

function devcook() {
cheatV2(deviscookin);
} // might work, might not- not actually needed anymore

// cheats 2.0
// console only for now
function cheatV2(cheatAmount) {
  try {
    if (isNaN(cheatAmount)) {
      console.warn("Cheat is NaN");
    } else {
      cookieamount += cheatAmount;
      refresh_amounts();
    } 
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("CHEAT_FAULT");
  }
}
console.log("if you wanna cheat use cheatV2(####));
//
//ERROR HANDLE :3
//
function crash(failreason) {
  document.getElementById("game").remove();
  document.getElementById("bsod").hidden = false;

  console.error("CRASHED - ", failreason);
  if (devbuild == 1) {
    document.querySelector("html").style.background = "#41FF00";
  } else {
    document.querySelector("html").style.background = "#0074d0";
  }
}

refresh_amounts();
// Made by emanperson0 :3
