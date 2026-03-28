# Instalacion de componentes

Instalar nodejs
Instalar docker
Instalar angular cli version 17
EL IDE utilizado fue Visual studio code
Instalar NMP


## Instalacion de proyecto

Clonar repositorio

Parte Back api
Construir la imagen docker
docker build -t api-backend-dev 
ejecutar el contenedor en modo desarrollo
docker run -it -p 3000:3000 -v $(pwd):/app api-backend-dev
comprobar que api este corriendo
http://localhost:3000


Parte front
Construir la imagen docker
docker build -t angular17-frontend-dev .
Abrir en modo desarrollo
docker run -it -p 4200:4200 -v $(pwd):/app angular17-frontend-dev
abrir la aplicacion en navegador

Configuracion
En backend hay un archivo llamado generateToken.js
hay que ejecutarlo para generar el token a probar
node generateToken.js

Este token hay que colocarlo en el archivo main.ts de la aplicacion web angular
y hacer pruebas


