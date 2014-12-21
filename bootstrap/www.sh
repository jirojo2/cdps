#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mongodb
sudo /etc/init.d/mongodb start

# hosts
echo "10.1.1.1 videos.mitubo.es" | sudo tee -a /etc/hosts

# launch nodejs 
forever start -c "bash" ~/dev/run.sh www
