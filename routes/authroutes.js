const express = require('express');
const router = express.Router();
const cors = require("cors")
const ModalDataSchema = require('../models/ModalDataSchema');
const jwt = require('jsonwebtoken');

require('dotenv').config();
"use strict";
const nodemailer = require("nodemailer");
const path = require('path')


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

    console.log("signup clicked")
    //console.log('data sent by clinet ' ,req.body);  
    var usersController =
        req.locals.controllerFactory.getUserController(req.locals)
    try {
        await usersController.create(req.body)
        token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //res.send("send working?")
        //res.send({ message: "User Registered Successfully", token });
        res.send({ message: "User Registered Successfully", token });


    }
    catch (err) {
        console.log(err);
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

router.post('/clientData', async (req, res) => {
    console.log("print data");
    const { title, clientName, projectType, projectHead, rccDesignerName, model3D, buildingApproval, plinth, buildingCompletion, pan, aadhar, pin, email } = req.body;
    console.log(req.body);

    const modalDataSchema = new ModalDataSchema({
        title,
        clientName,
        projectType,
        projectHead,
        rccDesignerName,
        model3D,
        buildingApproval,
        plinth,
        buildingCompletion,
        pan,
        aadhar,
        pin,
        email
    })
    try {
        await modalDataSchema.save();

        //token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //res.send("send working?")
        //res.send({ message: "User Registered Successfully", token });
        res.send({ message: "Data sent  Registered Successfully" });


    }
    catch (err) {
        console.log(err);
    }

    //res.send("data bhetla");
})

router.post('/verify', async (req, res) => {
    var usersController = req.locals.controllerFactory.getUserController(req.locals)

    const { name, email, password, dob, address } = req.body;


    if (!name || !email || !password || !dob || !address) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    usersController.getOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" });
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