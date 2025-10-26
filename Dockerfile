# Usamos una imagen ligera de Node
FROM node:20-alpine

# Creamos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto de archivos (ej. db.json)
COPY . .

# Exponemos el puerto estándar de json-server (3000)
EXPOSE 3001

# El comando para iniciar el servidor
CMD [ "npm", "run", "server" ]