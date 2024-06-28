const tryCatch = require("../utils/tryCatch");
const prisma = require('../models')

module.exports.getAll = tryCatch( async (req,res)=>{
  const subjects = await prisma.subject.findMany()
  res.json({subjects})
})