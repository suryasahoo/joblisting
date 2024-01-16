import express from "express"



const app = express()
console.log("Hi my name is surya")

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})