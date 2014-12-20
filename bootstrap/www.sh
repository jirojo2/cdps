#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mongodb
sudo /etc/init.d/mongodb start

# launch nodejs (aún no funciona)
forever start -c "npm run-script start-www" ~/dev/