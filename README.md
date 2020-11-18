# Invoice Manager Backend

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