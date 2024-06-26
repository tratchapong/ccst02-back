require('dotenv').config()
const express = require('express')
const authRoute = require('./routes/auth-route')
const homeworkRoute = require('./routes/homework-route')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')

const app = express()

app.use(express.json()) 

// service
app.use('/auth', authRoute)
app.use('/homework', homeworkRoute)

// not found
app.use( notFound )

// error
app.use( errorMiddleware )

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on', port))

