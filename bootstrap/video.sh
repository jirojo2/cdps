#!/bin/bash

# clone git
git clone cdps@10.1.1.2:p7/dev/.git

# mount nas
mkdir -p /mnt/nas
mount -t glusterfs 10.1.3.21:/nas -o backup-volfile-servers=10.1.3.22:10.1.3.23 /mnt/nas
chmod 777 /mnt/nas

# launch nodejs (aún no funciona)
forever start -c "npm run-script start-nas" ~/dev/