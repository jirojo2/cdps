#!/bin/bash

ssh ubuntu@s4 'bash -s' < bootstrap/www.sh
ssh ubuntu@s4 'mongo ~/dev/mongo-replicaset-cdps.js'