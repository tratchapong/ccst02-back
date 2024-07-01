const express = require('express')
const subjectRoute = express.Router()
const subjectController = require('../controllers/subject-controller')

subjectRoute.get('/', subjectController.getAllSubject)

module.exports = subjectRoute