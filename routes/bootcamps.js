const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  response.status(200).json({ success: true, msg: 'Show all bootcamps' })
})
router.get('/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Get bootcamp ${request.params.id}` })
})
router.post('/', (request, response) => {
  response.status(200).json({ success: true, msg: 'Create new bootcamp' })
})
router.put('/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Display bootcamp ${request.params.id}` })
})
router.delete('/:id', (request, response) => {
  response
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${request.params.id}` })
})

module.exports = router
