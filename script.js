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
//var devbuild = "1";

console.log("1.4.1");

// Detect browser
function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserName;
  let osName;

  // Detect browser
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome/Chromium";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari/Apple Webkit";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera/Opera family";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else {
    browserName = "Unknown";
  }

  // Detect OS
  if (userAgent.match(/windows/i)) {
    osName = "Windows";
  } else if (userAgent.match(/macintosh|mac os x/i)) {
    osName = "macOS";
  } else if (userAgent.match(/linux/i)) {
    osName = "Linux";
  }
} else if (userAgent.match(/android/i)) {
  osName = "Android";
} else if (userAgent.match(/iphone|ipad|ipod/i)) {
  osName = "iOS";
} else {
  osName = "Unknown OS";
}

document.getElementById("browser-info").textContent = `${browserName} on ${osName}`;
}

detectBrowser();
info(navigator.userAgent)
document.getElementById("grandmotherbuy").hidden = true;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// should be built in but whatever
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// sleep(ms).then(() => { });
// sleep function is a lot easier than whatever js does normally

//
// info box management
// infoAPI lmao
function info(infocommand) {
  if (infocommand === "clear") {
    infobox.innerHTML = "";
  } else if (infocommand === "notenough") {
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
  // try {
  cookieamount += clickamount;
  refresh_amounts();
  info("");  // Clear the info box by passing empty string
  // } catch {
  //    crash("COOKIE_CLICK_FAILED");
  //  }
}
// THE function
function refresh_amounts(buy_refresh) {
  //try {
  document.getElementById("amount").innerHTML =
    cookieamount + " Cookies" + "<br>" + clickamount + " per click";
  if (buy_refresh == 1) {
    document.getElementById("miniclickbuy").innerHTML =
      "Mini Mouse™ (+1 per click) | " + minibuyamount + " Cookies";
    document.getElementById("ovenbuy").innerHTML =
      "Oven (+20 per click) | " + ovenbuyamount + " Cookies";
    document.getElementById("grandmotherbuy").innerHTML =
      "Someone's grandmother (+100 per click) | " +
      grandmotherbuyamount +
      " Cookies";
  } else { }
  // } catch {
  //  crash("AMOUNT_REFRESH_FAILED");
  //}
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
      info("notenough");
    }
  } catch {
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
      info("notenough");
    }
  } catch {
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
      info("notenough");
    }
  } catch {
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
  } catch {
    crash("CHEATS_FAILED");
  }
}
function devcook() {
  try {
    let deviscookin = parseInt(document.getElementById("devcooks").value, 10);
    if (isNaN(deviscookin)) {
      crash("BAD_CHEATS");
    } else {
      cookieamount += deviscookin;
      refresh_amounts();
    }
  } catch {
    crash("CHEATS_FAILED");
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
  if (devbuild == 1) {
    document.querySelector("html").style.background = "#41FF00";
  } else {
    document.querySelector("html").style.background = "#0074d0";
  }
}

// Made by emanperson0 :3

//this thing exists ig
function beta() {
  crash("beta.");
  sleep(8000).then(() => {
    save();
    document.querySelector("style").innerhtml = "";
    document.querySelector("body").innerHTML = "<h1>beta.<h1>";
    document.querySelector("title").innerHTML = "beta.";
    document.querySelector("html").backgroundImage = "";
    document.querySelector("head").innerHTML = "<title> beta. </title>";
    sleep(500).then(() => {
      window.location.reload();
    });
  });
}
// beta.

// Purchase API
function buy(type) {
  info("clear");
  try {
    // Handle each upgrade type
    if (type === 'miniclick') {
      if (cookieamount >= minibuyamount) {
        cookieamount -= minibuyamount;
        clickamount += 1;
        minibuyamount = Number(minibuyamount) + 5;
      } else {
        info("notenough");
        return;
      }
    } else if (type === 'oven') {
      if (cookieamount >= ovenbuyamount) {
        cookieamount -= ovenbuyamount;
        clickamount += 20;
        ovenbuyamount = Number(ovenbuyamount) * 2;
        unlockgrandma();
      } else {
        info("notenough");
        return;
      }
    } else if (type === 'grandmother') {
      if (cookieamount >= grandmotherbuyamount) {
        cookieamount -= grandmotherbuyamount;
        clickamount += 100;
        grandmotherbuyamount *= 2;
      } else {
        info("notenough");
        return;
      }
    }
    refresh_amounts(1);
  } catch {
    crash("PURCHASE_FAULT");
  }
}
