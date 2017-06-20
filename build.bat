rd dist /Q /S
set NODE_ENV=production
%cd%\node_modules\.bin\webpack -p --config %cd%\webpack.prod.config.js
