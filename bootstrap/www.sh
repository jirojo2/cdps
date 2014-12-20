#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mongodb
sudo /etc/init.d/mongodb start

# launch nodejs 
forever start -c "bash" ~/dev/run.sh www
