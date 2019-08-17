"use sctrict";

var isGmod = false;
var isTest = false;
var totalFiles = 50;
var totalCalled = false;

/**
 * Gmod Called functions
 */
function GameDetails(
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) {
  debug("GameDetails called");
  isGmod = true;
  if (!isTest) {
    loadAll();
  }

  if (Config.title) {
    $("#title").html(Config.title);
  } else {
    $("#title").html(servername);
  }
  $("#title").fadeIn();

  if (Config.enableMap) {
    $("#map").append(mapname);
    $("#map").fadeIn();
  } else {
    $("#map").hide();
  }

  if (Config.enableSteamID) {
    $("#steamid").html(steamid);
  }
  $("#steamid").fadeIn();
}

function SetFilesTotal(total) {
  debug("SetFilesTotal called");
  totalCalled = true;
  totalFiles = total;
}

function SetFilesNeeded(needed) {
  debug("SetFilesNeeded called");
  if (totalCalled) {
    var percentage = 100 - Math.round((needed / totalFiles) * 100);
    $(".overhaul").css("left", percentage + "%");
  }
}

var fileCount = 0;
function DownloadingFile(filename) {
  debug("DownloadingFile called");
  $("#history").prepend('<div class="history-item">' + filename + "</div>");
  $(".history-item").each(function(i, el) {
    if (i > 10) {
      $(el).remove();
    }
    $(el).css("opacity", "" + 1 - i * 0.1);
  });
}

function SetStatusChanged(status) {
  debug("SetStatusChanged called");
}

/**
 * External Functions
 */
function loadAll() {
  $("nav").fadeIn();
  $("main").fadeIn();
}
function loadBackground() {
  if (Config.backgroundImage) {
    $(".background").css(
      "background-image",
      'url("images/' + Config.backgroundImage + '")'
    );
  }
}
function debug(message) {
  if (Config.debugEnabled) {
    console.log(message);
    $("#debug").append(message + "<br>");
  }
}

/**
 * Initial function
 */
$(document).ready(function() {
  loadBackground();
  // if it isn't loaded by gmod load manually
  setTimeout(function() {
    if (!isGmod) {
      debug("No Garry's mod testing..");
      isTest = true;
      loadAll();

      GameDetails(
        "Servername",
        "Serverurl",
        "Mapname",
        "Maxplayers",
        "SteamID",
        "Gamemode"
      );

      var totalTestFiles = 100;
      SetFilesTotal(totalTestFiles);

      var needed = totalTestFiles;
      setInterval(function() {
        if (needed > 0) {
          needed = needed - 1;
          SetFilesNeeded(needed);
          DownloadingFile("Filename " + needed);
        }
      }, 500);

      SetStatusChanged("Testing..");
    }
  }, 2000);
});
