function addSong () {
  var url = $("#song").val()
  if (!url) return console.warn("Not adding empty URL")
  console.log("Adding song", url)
  Songs.insert({url: url})
}

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
  return Songs.find()
}

Template.status.info = function () {
  return Status.find()
}