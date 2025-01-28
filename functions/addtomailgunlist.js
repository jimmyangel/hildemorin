const Mailgun = require('mailgun.js')
const formData = require('form-data')

const { text } = require('node:stream/consumers')
const { Readable } = require ('node:stream')

exports.handler = async function (event, context) {
  const apiKey = process.env.MAILGUNAPIKEY
  const domain = process.env.MAILGUNDOMAIN
  const mailinglist = process.env.MAILINGLIST
  const notificationemail = process.env.NOTIFICATIONEMAIL


  if (event.httpMethod === 'POST') {

    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({username: 'api', key: apiKey})

    let bodyString = await text(Readable.from(event.body))

    let member = {
      subscribed: true,
      address: new URLSearchParams(bodyString).get('email')
    }

    try {
      let data = await mg.lists.members.createMember(mailinglist, member)

      mg.messages.create(domain, {
        from: 'Mailing list request<' + 'postmaster@' + domain + '>',
        to: notificationemail,
        subject: 'FYI: new address added to mailing list',
        text: member.address + ' has been added to the mailing list ' + mailinglist
      })

      return {statusCode: 200, body: 'Address added to mailing list'}

    } catch (e) {
      return {statusCode: e.status, body: e.details}
    }

  } else {
    return {statusCode: 405, body: 'Only POST method is allowed'}
  }
}
