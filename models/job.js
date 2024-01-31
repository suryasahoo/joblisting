import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    refUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, { timestamps: true })


export const Job = mongoose.model("Job", jobSchema)