var Future = Npm.require("fibers/future")
  , spotifyApi = Npm.require("spotify-node-applescript")

spotify = {}

Object.keys(spotifyApi).forEach(function (fnName) {
  spotify[fnName] = function () {
    var wrapped = Future.wrap(spotifyApi[fnName])
    return wrapped.apply(this, arguments).wait()
  }
})