# nd004-neighborhood-map Javascript version

This is a pure Javascript version of the original project which was written in Typescript (available in the [typescript branch](https://github.com/kulshekhar/nd004-neighborhood-map/tree/typescript));

The setup doesn't use any build system and just loads javascript files sequentially in `index.html`. This was done to prevent unnecessary hassles for the reviewer. (The typescript version is complete with a build system).

In addition to Google maps, this project uses APIs from Foursquare to obtain social media details for the selected places.

## Usage

Clone the repository and `cd` into the directory:

```
git clone https://github.com/kulshekhar/nd004-neighborhood-map
cd nd004-neighborhood-map
```

Start a local server in this directory (using python or anything else you prefer).

With python2

```
python -m SimpleHTTPServer
```

With python3

```
python -m http.server
```

This will start the server on port 8000 and you can access the app at http://localhost:8000
