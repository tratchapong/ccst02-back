const tryCatch = require("../utils/tryCatch");
const prisma = require("../models")

module.exports.getAllSubject = tryCatch( async (req, res) => {
  const rs = await prisma.subject.findMany({
    select : { id : true, title : true }
  })
  res.json({subject: rs})
})