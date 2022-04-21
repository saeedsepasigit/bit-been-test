const express = require("express")
const path = require("path")
const app = express()
const port = 8000
const host = "localhost"

app.use(express.static(path.join(__dirname,"build")))

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"build","index.html"))
})

app.listen(port,host,()=>{
    console.log(`React server runing at http://${host}:${port}`)
})

