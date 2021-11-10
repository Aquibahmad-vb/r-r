const express = require("express");
require('dotenv').config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send(`app listening on ${process.env.port} port`));

app.listen(process.env.port,() => {

    console.log(`Example app listening on ${process.env.port} port!`);
});