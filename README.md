# nd004-neighborhood-map

In addition to Google maps, this project uses APIs from Foursquare to obtain social media details for the selected places.

## Setup

Clone the repository and `cd` into the directory:

```
git clone https://github.com/kulshekhar/nd004-neighborhood-map
cd nd004-neighborhood-map
```

Install the dependencies:

```
npm install
```

OR

```
yarn
```

The project's source code lives in the `src` directory.

## Running the app

Enter the `dist` directory:

```
cd dist
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

## Production

To build for production, execute:

```
npm build
```

OR

```
yarn build
```

This will create `index.html`, `app.js` and `style.css` in the `dist` folder.

**Note:** On Windows, ensure that your path has no spaces.

## Development

This project uses webpack and lite-server to enable live reload during development. To use it, execute:

```
npm run serve
```

OR 

```
yarn run serve
```

The app will be accessible at http://localhost:3000

The app in the browser will auto-refresh if there's any change in any of the project's files.

**Note:** On Windows, ensure that your path has no spaces.
