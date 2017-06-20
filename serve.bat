set webpack="%cd%\node_modules\.bin\webpack -w"
set liteserver="%cd%\node_modules\.bin\lite-server -c %cd%\bs-config.json --baseDir=\"%cd%\dist\""
%cd%\node_modules\.bin\concurrently %webpack% %liteserver%
