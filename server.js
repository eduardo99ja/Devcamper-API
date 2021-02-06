const express = require('express')
const dotenv = require('dotenv')
const { response } = require('express')

//Load env vars

dotenv.config({ path: './config/config.env' })

const app = express()

app.get('/api/v1/bootcamps', (request, response) => {
  response.status(200).json({ success: true, msg: 'Show all bootcamps' })
})
app.get('/api/v1/bootcamps/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Get bootcamp ${request.params.id}` })
})
app.post('/api/v1/bootcamps', (request, response) => {
  response.status(200).json({ success: true, msg: 'Create new bootcamp' })
})
app.put('/api/v1/bootcamps/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Display bootcamp ${request.params.id}` })
})
app.delete('/api/v1/bootcamps/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${request.params.id}` })
})
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
)
