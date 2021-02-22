const util = require('util');
const multer = require('multer');
const addrs = require("email-addresses");
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

module.exports = async (req, res) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
    await util.promisify(multer().any())(req, res);

    const from = req.body.from;
    console.error('Email from is: ' + `${from}`)
    const to = req.body.to;

    if ( to.includes("somerandomness") ){
      console.error('Email with somerandomness found and is: \n' + `${to}`)
    }

    //Using email-addresses library to extract email details.
    const toAddress = addrs.parseOneAddress(to);
    var toName = toAddress.local;
    const fromAddress = addrs.parseOneAddress(from);
    const fromName = fromAddress.local;

    const subject = req.body.subject;

    var botName = "FailBot"
    toName = "17733541500"

    // Here's where we route from search name to phone
    if ( subject.includes("curiousfuschiaoctopus") ){
      console.error('Email subject contains Search 1: ' + `${subject}`)
      toName = "17733541500"
      botName = "JimBot"
    } else if ( subject.includes("eagerbrownbear") ){
      console.error('Email subject contains Search 1: ' + `${subject}`)
      toName = "17733541500"
      botName = "MomBot"
    }

    // if subject contains 'Search 1', then parse and route to the correct phone, send log message somewhere
    const rawBody = req.body.text;
    const splits = rawBody.split("latest search results")
    const lines = rawBody.split("\n")

    lines.forEach((line, i) => {
      line.replace("<", "~!!~");
      line.replace(">", "~!!~");
      console.error(`${line}`)
    });

    const one = splits[0]
    const splits_two = one.split("<");
    const two = splits_two[splits_two.length - 1];
    const three = two.split(">");
    const link = three[0];
    console.error('link is: \n' + `${link}`)

    // const splitter = "This home has been listed for sale"
    // var newBody = rawBody.split(splitter)
    // // console.log(newBody[1])
    // var newBodyTwo = newBody[1].split("<")
    // // console.log(newBodyTwo[1])
    // var newBodyThree = newBodyTwo[1].split(">")
    // // console.log(newBodyThree[0])
    // var link = newBodyThree[0]
    // console.log('link is: \n' + `${link}`)

    const body = rawBody.substring(0,1500)

    const finalBody = botName+` here with a new house for you!\n${link}`

    //Sending SMS with Twilio Client
    client.messages.create({
        to: `+${toName}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: finalBody
    }).then(msg => {
        console.error(msg)
        res.status(200).send(msg.sid);
    }).catch(err => {
        console.error(err);
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

    // Create Email
    const email = {
        to: 'jimmoffet@gmail.com',
        from: fromAddress.address,
        subject: `Email copy to ${toAddress.local}`,
        text: `For email from ${fromAddress.address}`,
    };
    //Send Email
    sgResp = sgMail.send(email)
        .then(response => {
            res.status(200).send("Sent Copy Email");
        })
        .catch(error => {
            res.status(500);
        });
};
