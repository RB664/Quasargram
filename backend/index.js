const express = require('express')
const app = express()
const port = 3000

app.get('/posts', (req, res) => {
  let posts = [
    {
      caption: 'Mine :)',
      location: 'Japan :)'
    },
    {
      caption: 'Mine :)',
      location: 'Japan :)'
    }
  ]
  res.send(posts)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
