const express = require("express")
const path = require("path")
const weatherData = require("../source/weatherupdate")

const app = express();
// app.set("views",path.join(__dirname,"../"));
app.set("view engine","hbs")
app.use(express.static(path.join(__dirname,"../")))
const port = process.env.port || 3000;
app.get("/", (req,res) =>{
    res.render("../home",{title:"Weather Application"});
})

app.get("/weather", (req,res) =>{
    if(!req.query.address) return res.send("Address is required");
    weatherData(req.query.address,(error,result) => {
        if(error) return res.send(error);
        res.send(result);
    })
})

app.get("*",(req,res) =>{
    res.render("../404",{title:"Weather Application"})
})
app.listen(port, () => {
    console.log("listening.....");
});