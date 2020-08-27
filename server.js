const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`Running in ${PORT} port.`))