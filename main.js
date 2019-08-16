let isGmod = false;
let totalFiles = 50;

/**
 * Gmod Called functions
 */
const GameDetails = (
  servername,
  serverurl,
  mapname,
  maxplayers,
  steamid,
  gamemode
) => {
  isGmod = true;

  if (Config.title) {
    $("#title").html(Config.title);
  } else {
    $("#title").html(servername);
  }
  $("#title").fadeIn();

  if (Config.enableMap) {
    $("#map").html(mapname);
  }
  $("#map").fadeIn();

  if (Config.enableSteamID) {
    $("#steamid").html(steamid);
  }
  $("#steamid").fadeIn();
};

const SetFilesTotal = total => {
  totalFiles = total;
  console.log(total);
};

const SetFilesNeeded = needed => {
  let percentage = 100 - Math.round((needed / totalFiles) * 100);
  console.log(percentage);
  $(".overhaul").css("left", `${percentage}vw`);
};

const DownloadingFile = filename => {
  //   console.log(filename);
};

const SetStatusChanged = status => {
  console.log(status);
};

/**
 * Initial function
 */
$(document).ready(function() {
  // if it isn't loaded by gmod load manually
  setTimeout(() => {
    if (!isGmod) {
      GameDetails(
        "Servername",
        "Serverurl",
        "Mapname",
        "Maxplayers",
        "SteamID",
        "Gamemode"
      );

      let totalFiles = 100;
      SetFilesTotal(totalFiles);

      let needed = totalFiles;
      setInterval(() => {
        if (needed > 0) {
          needed = needed - 1;
          SetFilesNeeded(needed);
          DownloadingFile(`Filename${needed}`);
        }
      }, 500);

      SetStatusChanged("Testing..");
    }
  }, 2000);

  console.log(Config);
});
