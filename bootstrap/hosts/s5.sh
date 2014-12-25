#!/bin/bash

ssh ubuntu@s5 'bash -s' < bootstrap/www.sh

# Añadir la réplica en s5, una vez mongod está arrancado
ssh ubuntu@s4 'mongo ~/dev/mongo-replicaset-cdps.js'