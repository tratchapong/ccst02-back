const prisma = require('../models')
const tryCatch = require('../utils/tryCatch')

module.exports.createNewHomework = tryCatch( async (req, res) => {
  const {question,startdate,duedate,published,subject_id } = req.body

  const rs = await prisma.homework.create({
    data : {
      subject_id: +subject_id,
      question,
      published,
      startdate,
      duedate,
      teacher_id: req.user.id
    }
  })
  res.json({result : rs})
})

module.exports.getHomeworkByTeacher = tryCatch( async (req, res) => {
  const homeworks = await prisma.homework.findMany( {
    where : { teacher_id : req.user.id},
    include : { subject : { select : { title : true }}}
  })
  res.json({ homeworks })
} )

module.exports.updateHomework = tryCatch( async (req,res) => {
  const {id} = req.params
  const {question,startdate,duedate,published,subject_id } = req.body
  // validation
  const rs = await prisma.homework.update( {
    where: { id: +id },
    data : {
      subject_id : +subject_id,
      question,
      startdate,
      duedate,
      published,
      teacher_id : req.user.id
    }
  })
  res.json({result: rs})
})

module.exports.deleteHomework = tryCatch( async (req,res) => {
  const {id} = req.params

  const rs = await prisma.homework.delete({
    where : { id: +id}
  })
  res.json({result: rs})
} )