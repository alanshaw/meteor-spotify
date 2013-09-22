Playlist = new Meteor.Collection("playlist")
Track = new Meteor.Collection("track")
State = new Meteor.Collection("state")

Playlist.findByTimestampAsc = function () {
  return Playlist.find({}, {sort: [["timestamp", "asc"]]})
}

Playlist.peek = function () {
  var tracks = Playlist.findByTimestampAsc()
  if (!tracks.count()) return null
  return tracks.fetch()[0]
}

Playlist.pop = function () {
  var tracks = Playlist.findByTimestampAsc()
  if (!tracks.count()) return null
  var track = tracks.fetch()[0]
  Playlist.remove(track._id)
  return track
}