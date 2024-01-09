# Levantar el contenedor

docker-compose up -d postgres

# Ver la actividad que se ejecuta en el contenedor

docker-compose logs -f postgres

# Para ver los detalles de todos los contenedores

docker ps

# Para crear servicios Nest

nest g s "path" --flat

# Para crear controladores

nest g co "path" --flat

# Para crear módulos

nest g mo "file-name"

# Para crear guardianes

nest g gu "path" --flat
