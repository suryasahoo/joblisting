import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"
import { router } from './routes/auth.js'
import { jobRouter } from './routes/jobs.js'



// connect to server
const app = express()

app.use(express.json())

//Health api

app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date()
    })
})

app.use(router)
app.use("/api/v1/job", jobRouter)


// connect to db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Db connected"))
    .catch((error) => console.log("failed to connect", error))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})