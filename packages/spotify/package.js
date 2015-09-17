Package.describe({summary: "Control Spotify on Mac OSX with NodeJS and AppleScript."})

// Can't use a semver range here!
Npm.depends({"spotify-node-applescript": "0.2.2"})

Package.on_use(function (api) {
  api.export("spotify")
  api.add_files("spotify.js", "server")
})