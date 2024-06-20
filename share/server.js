require('dotenv').config(); 
const bodyParser = require('body-parser');
const chalk = require("chalk");
const swagger = require('../swagger');
const router = require('./routes')
const host = process.env.APP_HOST;
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions ={
  origin: `http://${host}`,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors({
//     origin: `http://${host}`
//  }));

const port = process.env.APP_PORT;

app.use(express.json());
app.use(router);
//app.use(cors());

app.listen(port, ()=>{
    console.log(chalk.blue(`Server running at http://${host}:${port}/`));
});

swagger(app);

module.exports = app, router;