#!/bin/bash

mkdir -p /nas/brick
setfattr -x trusted.glusterfs.volume-id /nas/brick

gluster peer probe 10.1.3.22
gluster peer probe 10.1.3.23

gluster volume create nas replica 3 transport tcp 10.1.3.2{1,2,3}:/nas/brick