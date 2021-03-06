const cli = require('commander')
const PushBullet = require('pushbullet')

cli
  .arguments('<accessToken>')
  .action(accessToken => {
    const title = 'Testnotification from urcli'
    const message = 'This is a test!'
    const open = 'https://example.com'
    // Use PushBullet to notify all of the users active devices.
    pusher = new PushBullet(accessToken)
    // Check for active devices.
    pusher.devices((err, res) => {
      if (err) return new Error('PushBullet error: ', err)
      if (!res.devices.length) return new Error('Found no active devices to push to.')
      console.log(res)
      // Save active devices.
      res.devices.forEach(device => {
        pusher.note(device.iden, title, `${message}\n\n${open}`, (err, res) => {
          if (err) throw new Error('Failed to push to any active devices.', err)
        })
      })
    })
  })
  .parse(process.argv)



