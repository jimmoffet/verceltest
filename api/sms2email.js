const sgMail = require('@sendgrid/mail');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports = (req, res) => {
    //Specify API Key for Sendgrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Set from address as <number>@EMAIL_DOMAIN
    const fromAddress = req.body.From.replace("+", "") + `@${process.env.EMAIL_DOMAIN}`;

    //Create Email
    const email = {
        to: process.env.TO_EMAIL_ADDRESS,
        from: fromAddress,
        subject: `New SMS message from: ${req.body.From}`,
        text: req.body.Body,
    };

    console.error('Sending email from' + `${fromAddress}` +', to '+ `${process.env.TO_EMAIL_ADDRESS}`)

    // Send the email
    sgMail.send(email)
        .then(response => {
            console.log('Email sent from' + `${fromAddress}` +', to '+ `${process.env.TO_EMAIL_ADDRESS}`)
            res.setHeader('Content-Type', 'text/xml');
            res.status(200).send(`${fromAddress}` +', to '+ `${process.env.TO_EMAIL_ADDRESS}` + "<Response></Response >"); //Make sure we return correctly.
        })
        .catch((error) => {
          console.error('Email sent from' + `${fromAddress}` +', to '+ `${process.env.TO_EMAIL_ADDRESS}`)
          console.error(error)
          res.status(200).send(`Error is ${error}`)
        })
};
