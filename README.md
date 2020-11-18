<div align="center">

# Invoice Manager Backend

[![](https://img.shields.io/badge/Made_with-Nodejs-green?style=for-the-badge&logo=node.js)](https://nodejs.org/en/)
[![](https://img.shields.io/badge/Database-MongoDB-red?style=for-the-badge&logo=mongodb)](mongodb.com "MongoDB")
[![](https://img.shields.io/badge/IDE-Visual_Studio_Code-blue?style=for-the-badge&logo=visual-studio-code)](https://code.visualstudio.com/ "Visual Studio Code")
[![](https://img.shields.io/badge/Deployed_on-Heroku-purple?style=for-the-badge&logo=heroku)](https://www.heroku.com/ "Heroku")

</div>

Nodejs Backend server for <a href="https://github.com/shahshubh/Invoice-Manager">Invoice Manager</a> project.


## To run this locally

* clone this Repository by `git clone https://github.com/shahshubh/invoice-manager-backend.git`.
* create .env file inside project root directory and add these
    ```
    databaseUrl=[your-cloud-mongodb-database-url]
    jwtSecret=[any-random-string]
    frontendUrl=http://localhost:4200
    smtpUsername=[your-email-address]
    smtpPassword=[your-password]
    ```
* Run the following
    - `cd invoice-manager-backend`
    - `npm install`
    - `npm start`
* Open your browser and enter url `http://localhost:3000`


## Technologies used

* Nodejs
* MongoDB
* Express