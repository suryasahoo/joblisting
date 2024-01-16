import express from "express"



const app = express()

//Health api

app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date()
    })
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})