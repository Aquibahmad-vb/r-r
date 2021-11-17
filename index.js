const express = require("express");
const mongoose = require("mongoose");
const rewardsRouter = require("./routes/rewardsroute");
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port=process.env.port || 3001
const db = mongoose.connection;
app.use(express.json());

app.get("/", (req, res) => res.send(`app listening on ${port} port`));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(rewardsRouter);



app.listen(port,() => {
    try {
        // connecting to mongodb database
        mongoose.connect("mongodb://127.0.0.1:27017/Rewards");
        db.on("error", () => console.log('Database connection error'));
        db.once("open", function () {
          console.log("Mongodb connected.");
        });
    }catch (error) {
        // if some error on database connection show error msg
        console.log(`someting went worng ${error}`);
    }

    console.log(`Example app listening on ${port} port!`);
});

module.exports= app;