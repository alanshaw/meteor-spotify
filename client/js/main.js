function addSong () {
  var song = $("#song")
    , url = song.val()

  if (!url) return console.warn("Not adding empty URL")

  Playlist.insert({url: url})
  song.val("")
}

Template.playPause.events({
  "click .play": function (e) {
    e.preventDefault()
    Meteor.call("play")
  },
  "click .pause": function (e) {
    e.preventDefault()
    Meteor.call("pause")
  }
})

Template.songSel.events({
  "click button": addSong,
  "keypress input": function (e) {
    if (e.which == 13) {
      e.preventDefault()
     addSong()
    }
  }
})

Template.playlist.songs = function () {
  return Playlist.findByTimestampAsc()
}

Template.current.track = function () {
  return Track.findOne()
}

Template.current.state = function () {
  return State.findOne()
}