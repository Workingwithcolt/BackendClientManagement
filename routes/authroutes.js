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
        to: "mayoorg@gmail.com", // list of receivers
        subject: "To verify yourself as a member of MGA please enter the code below", // Subject line
        text: `Enter under 10 mins  `, // plain text body
        html: `<b>Code :  ${VerificationCode}</b>`, // html body
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
// Route handler to check if an email exists
router.post('/check-email', async (req, res) => {
    console.log("check-mail clicked")
    
    
    const { email } = req.body;

    console.log(req.body)
  
    try {
      const user = await Users.findOne({ email });
      if (user) {
        // Email exists in the database
        let VerificationCode = Math.floor(100000 + Math.random() * 900000);

        await mailer("email",VerificationCode);
        const vs = "Valid email"
        res.send({message:vs,variable:VerificationCode})
        
        console.log("inside")
        
      } else {
        // Email does not exist in the database
        res.send("not a valid user");
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.post('/setPassword', async (req, res) => {
    console.log("outside Try")
    try {
        // var usersController =
        // req.locals.controllerFactory.getUserController(req.locals)
        console.log("inside Try")
        //const { password ,email} = req.body;
        const { password: newPassword, email: newEmail } = req.body;
      console.log("Printing req body",req.body)

      // Assuming you have a way to identify the user, e.g., by username
      const username = await Users.findOne({ newEmail });
      console.log("findOne working ");
      // Find user by username and update password
      const user = await Users.findOneAndUpdate(
        { email: newEmail },
        { password: newPassword },
        { new: true }
      );
      console.log("findOneAndUpdate working ");
  
      if (!user) {
        return res.status(404).json({ error: 'User ketan not found' });
      }
  
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
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
