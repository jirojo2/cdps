#!/bin/bash

SCENARIO=/home/cdps/p7

# 1. Crear keypair
if [ ! -f ~/.ssh/id_rsa ]; then
	ssh-keygen
fi

# 2. Modificar la imagen base?
# hacer un echo, esta parte es manual 100%
# ver doc

# 3. Crear el escenario, o cargarlo si ya existe
# de momento manual con vnx

sudo rm -rf "$SCENARIO/.nas1/brick"
sudo rm -rf "$SCENARIO/.nas2/brick"
sudo rm -rf "$SCENARIO/.nas3/brick"

# 4. Configurar cada una de las máquinas, si se crea el escenario
for script in bootstrap/hosts/*
do 
	echo "Preparing $script"
	"$script"
done
