const bodyParser = require('body-parser');
const router = require('./routes')
const express = require('express');
const app = express();
const chalk = require("chalk");
require('dotenv').config(); 

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

app.use(express.json());
app.use(router);
app.listen(port, ()=>{
    console.log(chalk.blue(`Server running at http://${host}:${port}/`));
});


module.exports = app, router;