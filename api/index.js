// Hit /api/index to confirm the deployment is working.
module.exports = (req, res) => {
    const { name = 'World' } = req.query
    // res.status(200).send(`Hello ${name}!`)

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    //javascript
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'james@getgreenlight.com', // Change to your recipient
      from: 'jimmoffet@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(200).send(`Hello ${name}, email sent!`)
      })
      .catch((error) => {
        console.error(error)
        res.status(200).send(`Hello ${name}, ${error}`)
      })
}
