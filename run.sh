#!/bin/bash

cd ~/dev/

if [ "$1" == "www" ]; then
	npm install
	bower install
	cd backend && forever start server.js
fi

if [ "$1" == "nas" ]; then
	npm install
	cd nas && forever start server.js
fi