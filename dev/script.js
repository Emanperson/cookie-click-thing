// 1.5 
// NO MORE NEW FEATURES, just improvements
// first major update in ~4  M O N T H S


// General game setup
var cookieamount = 0;
var clickamount = 1;
var errors = 0;
// Buy amounts
var minibuyamount = 15;
var ovenbuyamount = 1000;
var grandmotherbuyamount = 10000;
var protoclickerbuyamount = 50000;
var protoAutoclickBuyAmount = 100000;
var autoclickbuyamount = 1; 
// debug
var devbuild = "1"; // 90% sure this is jus for the BSOD thing but oh well

document.getElementById("grandmotherbuy").hidden = true;





// saving stuff, at some point it'll be saved to localstorage automatically; prob tied into refesh_ammounts()
var savecode;
var saveVersion = 1;
function createSaveCode(){
  saveCode = "SAVE$"+cookieamount + "%" + clickamount + "%" + minibuyamount + "%" + ovenbuyamount + "%" + grandmotherbuyamount + "%" + protoclickerbuyamount + "%" + autoclickbuyamount + "%" + clickspersec + "%" + saveVersion + "$"
  prompt("This is your save code; its very basic but it will probably work" + saveCode)
}
function loadSaveCode() {
  let saveCode = prompt("Please paste your save code. If you dont't know what that looks like; it should start with SAVE$");
  
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
    saveVersion = dataParts[8]; // keep as string if versioning

  } else {
    alert("Save code load failed. is it a valid code?");
  }
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
      info("Not enough Cookies!");
      console.warn("Not enough Cookies OR illegal purchase ID")
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("PURCHASE_FAULT");
  }
}


function buyminiclick() {
  buy('1');
}
function buyoven() {
 buy('2');
}
function buygrandmother() {
 buy('3')
}
// shortcuts incase i forgot smething; the new code does the same thing but better

// cheats
// this is going to be replaced soon; this is some of the very early code and could be improved
function devmode() {
  document.getElementById("dev").hidden = false;
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

// cheats 2.0
// console only for now 
function cheatV2(cheatAmount){
  try { 
    if (isNaN(cheatAmount)) {
      console.warn("Cheat is NaN");
    } else {
      cookieamount += cheatAmount;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorlog").innerHTML = error;
    crash("CHEAT_FAULT");
  }
}



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
