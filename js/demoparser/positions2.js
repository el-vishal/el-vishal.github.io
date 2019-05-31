const fs = require("fs");
const demofile = require("demofile");
let checkpointTick = 1;  
let ticksPerSec = 128; //frames per second
let interval = 0.1; //seconds

/*  
  demoFile.on('tickend', e => {
    const total_players = demoFile.entities.players;
    console.log(total_players.length);
    
    
  });
  demoFile.parse(buffer);
;*/
const demoFile = new demofile.DemoFile();
fs.readFile("test.dem", (err, buffer) => {
  //checkpointTick = (demoFile.currentTick + (5 * 128)) | 0;  
  demoFile.on('tickend', e => {
        
    
    let players = demoFile.entities.players;
    //console.log("1 =", demoFile.currentTick);
    //console.log("2 =", checkpointTick);

    if (demoFile.currentTick == checkpointTick) {
      checkpointTick = (demoFile.currentTick + (interval * ticksPerSec)) | 0;  
      //console.log(e, demoFile.currentTime, demoFile.currentTick);
      console.log("Tick =", demoFile.currentTick);
      console.log("Time =", demoFile.currentTick / ticksPerSec);


      console.log('NEW ROUND SEC MARK');
      for (var i = 3; i < 4 /*players.length*/; i++) {
        console.log("player #", i, players[i].position);
      }
    }
    
    
  });
  demoFile.gameEvents.on('round_start', e => {  


    // Calculate the tick that is 1 seconds in the future.
    // We do `| 0` to make the number whole (we only ever deal with ticks that are integers).
    ticksPerSec = demoFile.header.playbackTicks / demoFile.header.playbackTime;  
    checkpointTick = (demoFile.currentTick + (interval * ticksPerSec)) | 0;  
    console.log("Round Start");
  });
  demoFile.gameEvents.on('round_end', e => {  
      console.log("Round End");
  });

  demoFile.parse(buffer);
});