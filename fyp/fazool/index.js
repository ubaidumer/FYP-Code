const express = require("express");
const route   = express.Router(); 
const bp      = require("body-parser");

const app = express();

app.use(bp.json());

route.post('/register',(req,res) => {


console.log(req.body);



});
const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Activating project on port ${port}...`));