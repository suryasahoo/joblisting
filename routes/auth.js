import express from "express"

import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const router = express.Router()


router.post("/register", async(req, res) => {
    try {

        const { name, email, mobile, password } = req.body
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
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
        const userResponse = await userDate.save()
        const token = await jwt.sign({ userId: userResponse._id }, process.env.JWT_SECRET)
        res.json({
            message: "User registered successfully ",
            name: name,
            token: token,


        })



    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }

    // login api 

    router.post("/login", async(req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    errorMessage: "Bad Request! invalid credentials",
                })
            }

            const userDetails = await User.findOne({ email })
                //Checking the user exists or not
            if (!userDetails) {
                return res.status(401).json({
                    errorMessage: "Invalid Credentials!"
                })
            }
            //checking the password is correct or not
            const validPass = await bcrypt.compare(password, userDetails.password);
            if (!validPass) {
                return res.status(401).json({
                    errorMessage: 'Invalid Password'
                })
            }
            const token = await jwt.sign({ userId: userDetails._id }, process.env.JWT_SECRET)
            res.json({
                message: "User logged in successfully ",
                name: userDetails.name,
                token: token,


            })



        } catch (error) {
            handleError(error, res)


        }
    })



    //valid check
    //error handling
    //check if already user exists
    //write into the database
    //create model/schema
})


export { router }