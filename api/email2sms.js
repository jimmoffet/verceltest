const util = require('util');
const multer = require('multer');
const addrs = require("email-addresses");
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    var priceDrop = ""

    // Here's where we route from search name to phone
    if ( subject.includes("curiousfuschiaoctopus") ){
      console.error('Email subject contains curiousfuschiaoctopus: ' + `${subject}`)
      toName = "17733541500"
      botName = "JimBot"
      if (subject.includes("Price Drop")) {priceDrop = "Price Drop: "}
    } else if ( subject.includes("eagerbrownbear") ){
      console.error('Email subject contains eagerbrownbear: ' + `${subject}`)
      toName = "12627979725"
      botName = "MomBot"
      if (subject.includes("Price Drop")) {
        priceDrop = "Price Drop: "
      }
    } else {
      // Create Email
      const email = {
          to: 'jimmoffet@gmail.com',
          from: toAddress.address,
          subject: `Failed email copy to ${toAddress.local}`,
          text: `For failed email (no matched search) from ${fromAddress.address}.\n${subject}\n${req.body.text}`,
      };
      //Send Email
      sgResp = sgMail.send(email)
          .then(response => {
              res.status(200).send("Sent Copy Email");
          })
          .catch(error => {
              res.status(500);
          });
    }

    if (botName != 'FailBot') {

      // we should split on https:// and then split each on >, take [0] and check if item includes "property-notifications"

      const rawBody = req.body.text;

      // const splits = rawBody.split("latest search results")
      // const one = splits[0]
      // const splits_two = one.split("<");
      // const two = splits_two[splits_two.length - 1];
      // const three = two.split(">");
      // const link = three[0];

      var link = "Sorry, we seem to be experiencing a technical issue"
      var address = ""

      const splits = rawBody.split("https://")
      splits.forEach((item, i) => {
        if ( item.includes("zpid_target") ) {
          const target = item.split("\n")
          link = "https://"+target[0] // should validate that the link works
          address = target[1]
        }
      });

      // const one = splits[0]
      // const splits_two = one.split("<");
      // const two = splits_two[splits_two.length - 1];
      // const three = two.split(">");
      // const link = three[0];

      console.error('link is: \n' + `${link}`)
      const body = link.substring(0,1500)
      const finalBody = botName+` here with a new house for you!\n${priceDrop}${address}\n${body}`
      //Sending SMS with Twilio Client
      client.messages.create({
          to: `+${toName}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          body: finalBody
      }).then(msg => {
          console.error(msg)
          // Create Email
          const email = {
              to: 'jimmoffet@gmail.com',
              from: 'vercelbot@parse.jamesdavidmoffet.com',
              subject: `Email copy to ${toAddress.local}`,
              text: `For email from ${fromAddress.address}.\n${priceDrop}\n${req.body.text}`,
          };
          //Send Email
          sgResp = sgMail.send(email)
              .then(response => {
                  res.status(200).send(`Sent Success Email with sid: ${msg.sid}`);
              })
              .catch(error => {
                  res.status(500).send(`Failed sending Email with sid: ${msg.sid}`);
              });
          // res.status(200).send(msg.sid);
      }).catch(err => {
          console.error(err);
          //If we get an error when sending the SMS email the error message back to the sender


          // Create Email
          const email = {
              to: 'jimmoffet@gmail.com',
              from: 'vercelbot@parse.jamesdavidmoffet.com',
              subject: `Error Sending SMS to ${toAddress.local}`,
              text: `${err}\n For email from ${fromAddress.address}.\n${priceDrop}\n${req.body.text}`,
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
  }


};
