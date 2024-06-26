const express = require('express')
const homeworkRoute = express.Router()

homeworkRoute.post('/', ()=>{})
homeworkRoute.get('/', ()=>{})
homeworkRoute.put('/:id', ()=>{})
homeworkRoute.delete('/:id', ()=>{})


module.exports = homeworkRoute