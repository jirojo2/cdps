CDPS Vídeos: Práctica 7  
========================  

# Preparar escenario

```bash
cd ~/p7
sudo vnx -f p7.xml -v --create
cd dev
./bootstrap.sh
```

# Notas
1. Modifico la imagen base, añadiendo los paquetes:  
	* nginx (loadbalancer, reverse proxy) (http://nginx.org/en/docs/http/load_balancing.html) 
	* git (code deployment)  
	* bower (npm)  
	* forever (npm)  
	* También hago cambios de configuración:  
		* sudo sin contraseña para el usuario ubuntu  
		* borro la carpeta tmp del usuario ubuntu (…)  
		* creo un alias para el comando nodejs → node  
		* arreglada la instalación de mongodb:  
			* mkdir /data/db  
			* permisos para el usuario mongodb:  
				* /data/db  
				* /var/log/mongodb  
				* /var/lib/mongodb  
		* host reconocido para 10.1.1.2 (host) – ~/.ssh/known_hosts  
2. Creo una keypair en el host, y la añado a la imagen base, también se la añado (privada) al usuario ubuntu de la imagen base, para que pueda acceder al repositorio git en el host  
3. Preparo un sistema de scripts en bash para configurar las diferentes máquinas  
4. Para los servidores web, clono / actualizo el repositorio git a partir del host (origin) y actualizo el repositorio npm (npm_modules)  
5. A partir de los script bash preparados en (3), lanzo todos los servicios necesarios, incluyendo la preparación del glusterfs en los nas  
6. En los servidores web lanzo las instancias de node necesarias  

# ToDo  
* Montar /mnt/nas con las opciones de backup (nas2, nas3, ...) actualmente falla, ignoro por qué  
* Replicar mongodb en los servidores www (http://docs.mongodb.org/manual/tutorial/deploy-replica-set/)  
