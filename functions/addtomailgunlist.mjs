import Mailgun from 'mailgun.js'
import FormData from 'form-data'

import { text } from 'node:stream/consumers'
import { Readable } from 'node:stream'

export default async (request, context) => {
  const apiKey = Netlify.env.get('MAILGUNAPIKEY')
  const domain = Netlify.env.get('MAILGUNDOMAIN')
  const mailinglist = Netlify.env.get('MAILINGLIST')
  const notificationemail = Netlify.env.get('NOTIFICATIONEMAIL')


  if (request.method === 'POST') {

    const mailgun = new Mailgun(FormData)
    const mg = mailgun.client({username: 'api', key: apiKey})

    let bodyString = await text(Readable.from(request.body))

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
      return new Response(e.details, { status: e.status, headers: new Headers({"content-type": "text/html;charset=UTF-8"}) })
    }

  } else {
    return new Response(JSON.stringify('Only POST method is allowed'), { status: 405 })
  }
}
