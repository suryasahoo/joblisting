import express from "express"
import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()


router.post("/register", async(req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        if (!name || !email || !mobile || !password) {
            return res.status(4000).json({
                errorMessage: "Bad Request",
            })
        }
        const isExistingUser = await User.findOne({ email: email })
        if (isExistingUser) {
            return res.status(409).json({ message: "User already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userDate = new User({
            name,
            email,
            mobile,
            password: hashedPassword
        })
        const userResponse = userDate.save()
        const token = await jwt.sign({ userId: userResponse._id }, process.env.JWT_SECRET)
        res.json({ message: "User registered successfully ", token: token })



    } catch (error) {

    }





    //valid check
    //error handling
    //check if already user exists
    //write into the database
    //create model/schema
})


export { router }

// module.export = router