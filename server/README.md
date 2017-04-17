# flitter-server

# Requirements
* Node.js v6.10.2 LTS or greater
* Docker
  * postgres image
    * `docker pull postgres`

# To create the database
`npm run db:create`

# To start the database
`npm run db:start`

# To start the server
`npm start`

# To fill the database with accounts and tweets
1. Visit http://localhost:8080/create
2. Visit http://localhost:8080/insert

# To stop the server
`Ctrl+C`

# To stop the database
`npm run db:stop`

# To remove the database
`npm run db:rm`
