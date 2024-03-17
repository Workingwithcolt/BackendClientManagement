const express = require('express');
const router = express.Router();
const cors = require("cors")
const jwt = require('jsonwebtoken');

require('dotenv').config();
"use strict";
const nodemailer = require("nodemailer");

//node mailer
async function mailer(recieveremail, VerificationCode) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,

        secure: true, // true for 465, false for other ports
        ignoreTLS: true,
        requireTLS: false,
        auth: {
            user: "ketanmaheshdoshi@gmail.com", // generated ethereal user
            pass: "iytk vxgo ssbs vdez", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "ketanmaheshdoshi@gmail.com", // sender address
        to: "ketan@doshitechnologies.com", // list of receivers
        subject: "This mail has been purposfully sent to you Because", // Subject line
        text: `bara ahe na `, // plain text body
        html: `<b>Khatu Sham Jai shree ram If the user is authorised employee then please share this code to him ${VerificationCode}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


router.post('/signup', async (req, res) => {
    var usersController =
        req.locals.controllerFactory.getUserController(req.locals)
    try {
        await usersController.create(req.body); // Attempt to create a new user
        token = jwt.sign({ _id: usersController._id }, process.env.JWT_SECRET);
        res.status(200).send({ message: "User Registered Successfully", token });
    } catch (createError) {
        // Handle errors specific to user creation
        console.error("Error creating user:", createError);
        var errorMsg;
        errorMsg = 'Error creating user';
        res.status(500).send({ error: 'Internal server error' }, errorMsg);
    }

})

router.post('/signin', async (req, res) => {
    var usersController =
        req.locals.controllerFactory.getUserController(req.locals)
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }
    const savedUser = await usersController.getOne({ email: email })

    if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
    }
    try {
        const check = password.localeCompare(savedUser.password)
        if (check == 0) {
            console.log("password match");
            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
            res.send({ token });
        }
        else {
            console.log("password dosent match")
            return res.status(422).json({ error: "Invalid Credentials" });
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.post('/verify', async (req, res) => {//verify is called form signup frontend and not verification
    var usersController = req.locals.controllerFactory.getUserController(req.locals)

    const { name, email, password, dob, address } = req.body;


    if (!name || !email || !password || !dob || !address) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    usersController.getOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "email already exists" });
            }
            try {
                let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                let user = [
                    {
                        name,
                        email,
                        password,
                        dob,
                        address,
                        VerificationCode
                    }
                ]
                await mailer(email, VerificationCode);
                res.send({ message: "Verification Code Sent to your Email", udata: user });
            }
            catch (err) {
                console.log(err);
            }
        })

})

module.exports = router;