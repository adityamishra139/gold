const express= require("express");
const cors = require("cors");
const app = express();
const PORT =5000;

app.use(cors());
app.use(express.json());

app.get("/" , (req ,res)=>{
    res.send("welcome");
});

app.get("/api/products" , (req,res)=>{
    const products = [
        {id:1 , name : "gold ring" , price : 2999},
        {id:2 , name : "gold neclace" , price:7999}
    ]
res.json(products);    
});
app.listen (PORT , ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})