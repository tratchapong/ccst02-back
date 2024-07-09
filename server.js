require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/auth-route')
const homeworkRoute = require('./routes/homework-route')
const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authenticate = require('./middlewares/authenticate')
const subjectRoute = require('./routes/subject-route')
const userRoute = require('./routes/user-route')


const app = express()

app.use(cors())
app.use(express.json()) 
app.use('/public',express.static('public'))


// service
app.use('/auth', authRoute)
app.use('/homework',authenticate, homeworkRoute)
app.use('/subject', subjectRoute)
app.use('/user',authenticate, userRoute)

// not found
app.use( notFound )

// error
app.use( errorMiddleware )

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on', port))

