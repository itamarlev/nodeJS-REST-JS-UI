# nodeJS-REST-JS-UI

An exercise project exposing API for handling market instruments and handling a watchlist portfolio.
This project consist of nodeJs and JS code with mySql as the consistent layer.

## Installation

Make sure you have [nodeJs](https://nodejs.org/en/download/) and [mySql](https://dev.mysql.com/downloads/installer/) installed and running on your machine.
after cloning/downloading the project to your computer do the following:

run `config/setup-db-tables.sql` to have the basic tables created and populated.<br>
set up the connection properties in `config/db.config.js`
```db
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Aa123456!",
    DB: "production"
  };
```

run `npm install` on the root folder which contains `package.json`

## Starting the server 

There are two options to start the server:<br>
`npm start` - basic start <br>
`npm run devstart` - will start the server in a debug mode

## Solution and explanation 
Go to `website/index.html`<br>
The top input labeled <b>User Id</b> is for choosing the user which is using the app.
at first the <b>Watchlist Portfolio</b> of every User is empty.<br>
To add instruments to the watchlist click the <b>+</b> sign at the end of the desired row.</br>
To remove an instrument from the watchlist click the <b>garbadge</b> sign at the end of the desired row.</br>
The data is automatically being saved to the DB.</br></br>
Searching an instrument is made at the top of each table.</br>
Just start typing the name of the Instrument. The search is not case sensitive.

