Meteor.setInterval(function () {
  var state = State.findOne()
    , s = spotify.getState()
    , track = Track.findOne()
    , t = spotify.getTrack()

  track ? Track.update(track._id, t) : Track.insert(t)

  s.percent = Math.round((s.position / t.duration) * 100)

  state ? State.update(state._id, s) : State.insert(s)

  if (s.percent > 98) {
    var next = Playlist.pop()
    if (next) {
      spotify.playTrack(next.url)
    }
  }

}, 500)

Meteor.methods({play: spotify.play, pause: spotify.pause})