const Bootcamp = require('../models/Bootcamp')
//? @desc        Get all bootcamps
//? @route       GET /api/v1/bootcamps
//? @accesss     Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({ success: true, data: bootcamps })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
//? @desc        Get single bootcamp
//? @route       GET /api/v1/bootcamps/:id
//? @accesss     Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

//? @desc        Create new bootcamp
//? @route       POST /api/v1/bootcamps
//? @accesss     Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

//? @desc        Update  bootcamp
//? @route       PUT /api/v1/bootcamps/:id
//? @accesss     Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Display bootcamp ${req.params.id}` })
}
//? @desc        Delete  bootcamp
//? @route       DELETE /api/v1/bootcamps/:id
//? @accesss     Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}
