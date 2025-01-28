const Mailgun = require('mailgun.js')
const formData = require('form-data')

const { text } = require('node:stream/consumers')
const { Readable } = require ('node:stream')

exports.handler = async function (event, context) {
  const apiKey = Netlify.env.get('MAILGUNAPIKEY')
  const domain = Netlify.env.get('MAILGUNDOMAIN')
  const mailinglist = Netlify.env.get('MAILINGLIST')
  const notificationemail = Netlify.env.get('NOTIFICATIONEMAIL')


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

      return new Response(JSON.stringify('Address added to mailing list'))

    } catch (e) {
      return {statusCode: e.status, body: e.details}
      //return new Response(JSON.stringify(e.details), { status: e.status, headers: new Headers({"content-type": "application/json"}) })
    }

  } else {
    return new Response(JSON.stringify('Only POST method is allowed'), { status: 405 })
  }
}
