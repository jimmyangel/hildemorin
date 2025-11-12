const { text } = require('node:stream/consumers')
const { Readable } = require ('node:stream')

const addContactUrl = 'https://api.sendune.com/add-contact'
const sendEmailUrl = 'https://api.sendune.com/send-email'
const senduneKey = process.env.SENDUNEKEY
const senduneTemplateKey = process.env.SENDUNETEMPLATEKEY
const notificationemail =  process.env.NOTIFICATIONEMAIL 

exports.handler = async function (event, context) {
    let bodyString = await text(Readable.from(event.body))
    let email = new URLSearchParams(bodyString).get('email')

    if (event.httpMethod === 'POST') {
        try {
            const resp = await fetch(addContactUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'template-key': senduneKey
                },
                body: JSON.stringify({email: email, status: 'Subscribed'})
            })
            const text = await resp.text()
            const response = JSON.parse(text)
            if (response.success) {
                try {
                    await fetch(sendEmailUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'template-key': senduneTemplateKey
                        },
                        body: JSON.stringify({email: notificationemail, 'member-address': email})
                    })
                } catch {
                    console.log('Could not send notification message')
                }
                return {statusCode: 200, body: 'Address added to mailing list'}
            } else {
                return {statusCode: 400, body: response.message}
            }
        } catch (e) {
            return {statusCode: 500, body: 'Failed to contact API endpoint, try again later'}
        } 

    } else {
        return {statusCode: 405, body: 'Only POST method is allowed'}
    }
}
