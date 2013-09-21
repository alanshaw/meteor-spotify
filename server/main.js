var childProc = Npm.require("child_process")
var Fiber = Npm.require("fibers")

Meteor.setInterval(function () {
  console.log("Polling for status")
  
  childProc.exec("spotify status", function (er, stdin, stder) {
    if (er) return console.error(er)
    
    console.log(stdin, stder)
    
    Fiber(function () {
      var info = Status.findOne()
      
      if (!info) {
        Status.insert({song: "Nothing", percent: 0})
      }
      
      if (stdin.indexOf("stopped") !== -1) {
        console.log("Stopped!")
        
        info.song = "Nothing"
        info.percent = 0
        
        return Status.update(info._id, info)
      }
      
      if (stder.indexOf("playing") !== -1 || stder.indexOf("paused") !== -1) {
        
        var percent = (/] (\d+)%/).exec(stdin)[1]
        var song = (/: (.+)/g).exec(stder.split("\n")[1])[1]
        
        console.log("Percent is now:", percent)
        console.log("Song is now:", song)
        
        info.song = song
        info.percent = percent
        
        return Status.update(info._id, info)
      }
      
    }).run()
  })
}, 5000)