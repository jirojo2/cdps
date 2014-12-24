#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mongodb
sudo sed -e 's/^bind_ip/#bind_ip/' -i /etc/mongodb.conf 
echo "replSet=cdps" | sudo tee -a /etc/mongodb.conf
sudo /etc/init.d/mongodb start

# hosts
echo "10.1.1.1 videos.mitubo.es" | sudo tee -a /etc/hosts

# launch nodejs 
~/dev/run.sh www
