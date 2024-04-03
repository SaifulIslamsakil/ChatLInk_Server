const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

app.use(express.json())
app.use(cors())

app.get("/", async (req, res)=>{
    req.send("hello world")
})
app.listen(PORT, ()=>{
    console.log(`my server in runung on post ${PORT}`)
})