# nd004-neighborhood-map

This project requires the following packages to be globally installed with npm/yarn:

- typescript
- webpack
- lite-server
- concurrently

Install them using npm:

```
npm i -g typescript webpack lite-server concurrently
```

OR using yarn

```
yarn global add typescript webpack lite-server concurrently
```

Ensure that the executables for these packages are in your PATH.

## Info

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

If you're using windows, you'll have to update the `scripts` in `package.json` to work correctly:
- The `clean` script to delete and create the `dist` directory
- The `build` script to ensure that the environment variable `NODE_ENV` is set to `production`.

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
