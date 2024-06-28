const express = require('express')
const homeworkController = require('../controllers/homework-controller')
const homeworkRoute = express.Router()

homeworkRoute.post('/', homeworkController.createNewHomework)
homeworkRoute.get('/', homeworkController.getHomeworkByTeacher)
homeworkRoute.put('/:id', ()=>{})
homeworkRoute.delete('/:id', ()=>{})


module.exports = homeworkRoute