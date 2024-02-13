import express from "express"
import { Job } from "../models/job.js"
import { verifyToken } from "../middlewares/auth.middleware.js"





const jobRouter = express.Router()

jobRouter.post("/create", verifyToken, async(req, res) => {
    // console.log("Request body:", req.body);
    try {
        const { companyName, logoUrl, title, description, } = req.body

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            })
        }

        const jobDetails = new Job({
                companyName,
                logoUrl,
                title,
                description,

            })
            // console.log("jobDetails", jobDetails);

        await jobDetails.save()

        res.json({ message: "New job created successfully" })

    } catch (error) {
        console.log("error")
            // console.error("Error saving job:", error);

        // if (error.name === 'ValidationError') {
        //     // Handle validation errors
        //     return res.status(400).json({ errorMessage: error.message });
        // }

        res.status(500).json({ errorMessage: "Internal Server Error" });



    }
})

jobRouter.put("/edit/:jobId", verifyToken, async(req, res) => {

    try {
        const { companyName, logoUrl, title, description, } = req.body
        const jobId = req.params.jobId

        if (!companyName || !logoUrl || !title || !description || !jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            })
        }

        await Job.updateOne({ _id: jobId }, {
            $set: {
                companyName,
                logoUrl,
                title,
                description,

            }
        })



        res.json({ message: "Job updated successfully" })

    } catch (error) {
        console.log("error")
        res.status(500).json({ errorMessage: "Internal Server Error" });



    }
})

jobRouter.get("/job-description/:jobId", async(req, res) => {

    try {

        const jobId = req.params.jobId

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            })
        }

        const jobDetails = await Job.findById(jobId, { companyName: 1, title: 1 })



        res.json({ data: jobDetails, message: "Data Loaded successfully on server" })

    } catch (error) {
        console.log("error")
        res.status(500).json({ errorMessage: "Internal Server Error" });



    }
})

jobRouter.get("/all", async(req, res) => {

    try {
        const title = req.query.title || ""
        const skills = req.query.skills
        let filterSkills = skills ? skills.split(",") : null

        // skills ? .split(",")



        let filter = {}

        if (filterSkills) {
            filter = { skills: { $in: [...filterSkills] } }
        }

        const jobList = await Job.find({
            title: { $regex: title, $options: "i" },
            ...filter
        }, {})



        res.json({ data: jobList, message: "Data Loaded successfully on server" })

    } catch (error) {
        console.log("error")
        res.status(500).json({ errorMessage: "Internal Server Error" });



    }
})


export { jobRouter }