const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send("email route");
})

app.post('/send', (req, res) => {
    const server = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }

    });

    async function sendEmail() {
        try {
            const send = await server.sendMail(
                {
                    from: process.env.USER,
                    to: req.body.recieveremail,
                    subject: req.body.subject,
                    text: req.body.content

                }
            );
         
            console.log("message sent " + send.messageId);
        } catch (error) {
            console.log(error);

        }
    }
    sendEmail()
        res.redirect('/')
})

module.exports = app;