document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Game Fully Loaded.");
    gameloaded = 1;
    });

    // Hide the grandmother button initially
    document.getElementById("grandmotherbuy").hidden = true;

    // Call the initial info function to confirm the game has loaded
    info("Game Fully Loaded.");
  } catch (error) {
    console.error("Error during game initialization:", error);
    crash("LOAD_ERROR");
  }
});

// General game setup
var cookieamount = 0;
var clickamount = 1;

// var developer = "1";
const infobox = document.getElementById("info");

// Buy amounts
var minibuyamount = "15";
var ovenbuyamount = 100;
var grandmotherbuyamount = 10000;
// debug
var devbuild = "0";

console.log("1.4.0 release");
document.getElementById("grandmotherbuy").hidden = true;



// should be built in but whatever
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// sleep(ms).then(() => { });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// info box management
// infoAPI lmao
function info(infocommand) {
  if (infocommand == "clear") {
    infobox.innerHTML = "";
  } else if (infocommand == "notenuough") {
    infobox.innerHTML = "<p>Not enough Cookies!</p>";
  } else {
    infobox.innerHTML = "<p>" + infocommand + "</p>";
  }
}
// To Be Phased out in favor of infoAPI
function notenuough() {
  infobox.innerHTML = "<p>Not enough Cookies!</p>";
}
function clear() {
  infobox.innerHTML = ""; // Clear the info box
}

//
// Core FUnctions
//

// THE BUTTON
function addcookie() {
try{
    played = 1;
    cookieamount += clickamount;
    refresh_amounts();
    clear();
    
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("COOKIE_CLICK_FAILED");
  }
}
// THE function
function refresh_amounts() {
  try {
    if (gameloaded === 1) {
    document.getElementById("amount").innerHTML = cookieamount + " Cookies" + "<br>" + clickamount + " per click";
    } else {
      info("Game Loading, please wait")
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("AMOUNT_REFRESH_FAILED");
  }
}

//
// Purchases :3
//

function buyminiclick() {
  try {
    clear();
    if (cookieamount >= minibuyamount) {
      cookieamount = cookieamount - minibuyamount;
      clickamount += 1;
      refresh_amounts();
      minibuyamount = Number(minibuyamount) + 5;
      document.getElementById("miniclickbuy").innerHTML =
        "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    } else {
      notenuough();
    }
  } catch (error) {   console.error(error);document.getElementById("errorlog").innerHTML= error;
    crash("PURCHASE_FAULT");
  }
}

function buyoven() {
  try {
    clear();

    if (cookieamount >= ovenbuyamount) {
      cookieamount -= ovenbuyamount;
      clickamount += 20;
      refresh_amounts();
      ovenbuyamount = Number(ovenbuyamount) * 2;
      document.getElementById("ovenbuy").innerHTML =
        "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
      unlockgrandma();
    } else {
      notenuough();
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
    clear();

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
      notenuough();
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
  let deviscookin = parseInt(document.getElementById("devcooks").value, 10);
  if (isNaN(deviscookin)) {
    crash("BAD_CHEATS");
  } else {
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
  
}

// Made by emanperson0 :3
    

