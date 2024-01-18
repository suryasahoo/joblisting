import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"


// connect to server
const app = express()

//Health api

app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date()
    })
})


// connect to db
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Db connected"))
    .catch((error) => console.log("failed to connect", error))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})