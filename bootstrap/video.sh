#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mount nas
sudo mkdir -p /mnt/nas
sudo mount -t glusterfs 10.1.3.21:/nas -o backup-volfile-servers=10.1.3.22:10.1.3.23 /mnt/nas
sudo chmod 777 /mnt/nas

# launch nodejs 
forever start -c "bash" ~/dev/run.sh nas
