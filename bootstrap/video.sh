#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mount nas
sudo mkdir -p /mnt/nas
sudo glusterfs --volfile-server=10.1.3.21 --volfile-server=10.1.3.22 --volfile-server=10.1.3.23 --volfile-id=/nas /mnt/nas
sudo chmod 777 /mnt/nas

# launch nodejs 
~/dev/run.sh nas
