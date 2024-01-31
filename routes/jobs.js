import express from "express"
import { Job } from "../models/job"
import { verifyToken } from "../middlewares/auth.middlware.js"





const router = express.Router()

router.post("/create", verifyToken, async(req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                message: "Bad Request",
            })
        }

    } catch (error) {

    }
})