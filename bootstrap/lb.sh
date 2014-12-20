#!/bin/bash

rm /etc/nginx/sites-enabled/*
scp -i ~ubuntu/.ssh/id_rsa cdps@10.1.1.2:p7/dev/nginx/videos /etc/nginx/sites-available/
scp -i ~ubuntu/.ssh/id_rsa cdps@10.1.1.2:p7/dev/nginx/www /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/* /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
service nginx restart