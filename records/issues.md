# Issues

1. `npm install pg` failed.

   Environment: When using postgres docker image, install node-postgres failed.

   Solution: `sudo apt-get install libpq-dev`

2. Create database

   Input `su - postgres` _postgres_ is username which you created when install postgres.

   then input `createdb databasename`

3. postgres docker command:

   ```bash
   docker run --name ts-server -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres
   ```

4. pgadmin4 docker command:

   ```bash
   docker pull dpage/pgadmin4

   docker run -p 8081:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=szouc@domain.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=123456' \
    -d dpage/pgadmin4
   ```

5. docker-compose

   ```yaml
   version: '3.8'

   services:
     redis:
       image: redis:6
       ports:
         - 6379:6379

     postgres:
       image: postgres:13
       restart: always
       environment:
         POSTGRES_USER: test
         POSTGRES_PASSWORD: 123456
         POSTGRES_DB: testdb
       ports:
         - 5432:5432
       volumes:
         - /home/szouc/office-node/data:/var/lib/postgresql/data

     adminer:
       image: adminer:4
       restart: always
       ports:
         - 8080:8080
   ```
