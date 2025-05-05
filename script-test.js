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
