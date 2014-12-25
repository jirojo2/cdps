#!/bin/bash

cd ~/dev/

if [ "$1" == "www" ]; then
	npm install > /dev/null
	bower install > /dev/null
	cd backend && forever start server.js
fi

if [ "$1" == "nas" ]; then
	npm install > /dev/null
	cd nas && forever start server.js
fi