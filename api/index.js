// Hit /api/index to confirm the deployment is working.
module.exports = (req, res) => {
    const { name = 'World' } = req.query
    // res.status(200).send(`Hello ${name}!`)

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    //javascript

    const body = "<https://click.mail.zillow.com/f/a/geL7nurLgn538XCb4RpMLA~~/AAAAAQA~/RgRiE0rUP0UnZW1vLWhlYWRlcnppbGxvd2xvZ28taW5zdGFudHNhdmVkc2VhcmNoBFcGemlsbG93QgpgLdTFMGBX8hHAUhNqaW1tb2ZmZXRAZ21haWwuY29tWAQAAAAA?target=https%3A%2F%2Fwww.zillow.com%2F%3Futm_source%3Demail%26utm_medium%3Demail%26utm_campaign%3Demo-headerzillowlogo-instantsavedsearch>\n This home has been listed for sale at $179,900.\n New\n <https://click.mail.zillow.com/f/a/XCfSVh7Ka3vSL1Jrx89ZIg~~/AAAAAQA~/RgRiE0rUP0UjZW1vLWluc3RhbnRzYXZlZHNlYXJjaC1mb3JzYWxlaW1hZ2UEVwZ6aWxsb3dCCmAt1MUwYFfyEcBSE2ppbW1vZmZldEBnbWFpbC5jb21YBAAAAAA~?target=https%3A%2F%2Fwww.zillow.com%2Frouting%2Femail%2Fproperty-notifications%2Fzpid_target%2F40443890_zpid%2FX1-SSw1j6ypfa5rmt0000000000_2rqct_sse%2F%3Fz%26utm_source%3Demail%26utm_medium%3Demail%26utm_campaign%3Demo-instantsavedsearch%26rtoken%3Dd785f398-3c24-4fd5-97a6-094d5b274a34~X1-ZUyti3bvq98g7d_2avjk%26utm_term%3Durn%3Amsg%3A20210220081808f5f430fb17762397%26utm_content%3D20210220-forsaleimage-PSS>\n $179,900 3 bd | 1 ba | 1,484 sqft\n <https://click.mail.zillow.com/f/a/oK6V3ZnOiA9grbIt-bXATw~~/AAAAAQA~/RgRiE0rUP0UlZW1vLWluc3RhbnRzYXZlZHNlYXJjaC1mb3JzYWxlYWRkcmVzcwRXBnppbGxvd0IKYC3UxTBgV_IRwFITamltbW9mZmV0QGdtYWlsLmNvbVgEAAAAAA~~?target=https%3A%2F%2Fwww.zillow.com%2Frouting%2Femail%2Fproperty-notifications%2Fzpid_target%2F40443890_zpid%2FX1-SSw1j6ypfa5rmt0000000000_2rqct_sse%2F%3Fz%26utm_source%3Demail%26utm_medium%3Demail%26utm_campaign%3Demo-instantsavedsearch%26rtoken%3Dd785f398-3"

    const splitter = "This home has been listed for sale"
    var newBody = body.split(splitter)
    console.log(newBody[1])
    var newBodyTwo = newBody[1].split("<")
    console.log(newBodyTwo[1])
    var newBodyThree = newBodyTwo[1].split(">")
    console.log(newBodyThree[0])
    var link = newBodyThree[0]

    res.status(200).send(`${link}`)

    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // const msg = {
    //   to: 'james@getgreenlight.com', // Change to your recipient
    //   from: 'jimmoffet@gmail.com', // Change to your verified sender
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent')
    //     res.status(200).send(`Hello ${name}, email sent!`)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //     res.status(200).send(`Hello ${name}, ${error}`)
    //   })
}
