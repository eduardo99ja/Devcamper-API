const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Load env vars

dotenv.config({ path: './config/config.env' })

//Connect to database

connectDB()

//Route files

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

const app = express()

//body parser
app.use(express.json())

//Cookie parser
app.use(cookieParser())

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//file uploading
app.use(fileupload())

// Sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet({ contentSecurityPolicy: false }))

// Prevent XSS atacks
app.use(xss())

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100,
})

app.use(limiter)

// prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
)

//Handle inhandled promises rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //close server and exit process
  server.close(() => process.exit(1))
})
