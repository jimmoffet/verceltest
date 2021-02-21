const util = require('util');
const multer = require('multer');
const addrs = require("email-addresses");
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

module.exports = async (req, res) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
    await util.promisify(multer().any())(req, res);

    const from = req.body.from;
    console.log('Email from is: \n' + `${from}`)
    const to = req.body.to;
    console.log('Email to is: \n' + `${to}`)
    const subject = req.body.subject;
    console.log('Email subject is: \n' + `${subject}`)
    // if subject contains 'Search 1', then parse and route to the correct phone, send log message somewhere
    const body = req.body.text;
    console.log('Email body is: \n' + `${body}`)


    //Using email-addresses library to extract email details.
    const toAddress = addrs.parseOneAddress(to);
    var toName = toAddress.local;
    const fromAddress = addrs.parseOneAddress(from);
    const fromName = fromAddress.local;

    toName = "17733541500"

    //Sending SMS with Twilio Client
    client.messages.create({
        to: `+${toName}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Message from:${fromName}\n${body}`
    }).then(msg => {
        console.log(msg)
        res.status(200).send(msg.sid);
    }).catch(err => {
        console.log(err);
        //If we get an error when sending the SMS email the error message back to the sender
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Create Email
        const email = {
            to: fromAddress.address,
            from: toAddress.address,
            subject: `Error Sending SMS to ${toAddress.local}`,
            text: `${err}\n For email from ${fromAddress.address}`,
        };
        //Send Email
        sgResp = sgMail.send(email)
            .then(response => {
                res.status(200).send("Sent Error Email");
            })
            .catch(error => {
                res.status(500);
            });
    });
};
