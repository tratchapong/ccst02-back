const express = require('express')
const authenticate = require('../middlewares/authenticate')
const homeworkRoute = express.Router()

homeworkRoute.post('/', ()=>{})
homeworkRoute.get('/', ()=>{})
homeworkRoute.put('/:id', ()=>{})
homeworkRoute.delete('/:id', ()=>{})


module.exports = homeworkRoute