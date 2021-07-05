# Setup

1. Clone this project
2. Add .env file with next parameters
- ```JWT_SECRET``` - secret to sign JWT
- ```MYSQL_ROOT_PASSWORD``` - MySQL root user password
- ```MYSQL_USERNAME``` - MySQL user name
- ```MYSQL_EXTERNAL_PORT``` - MySQL port on your local machine
- ```APP_PORT``` - Application port. Default is 3000
- ```API_KEY``` - Key to fetch data from [http://www.omdbapi.com/](http://www.omdbapi.com/)

3. Download and install docker [https://store.docker.com/editions/community/docker-ce-desktop-windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
4. Run
```bash
docker compose up
```
in the root folder

# Documentation

Application includes Swagger UI. Add ```/api/docs``` to your application URL (e.g., [http://localhost:3000/api/docs](http://localhost:3000/api/docs)) to see available routes.


# Build

Use ```dist``` folder for output files. Source maps generated as separate file near it's dist source.

Scripts:
- ```build``` - build project
- ```create-migration``` - create typeorm migration file
