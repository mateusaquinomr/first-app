const express = require("express");
const app = express();
const routes = require("./routes");

const port = 3000;
const address = "localhost";

app.use('/',routes);

const server =  app.listen(port, address, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log(`servidor executado no endereço ${host} e ${port}`);
});

