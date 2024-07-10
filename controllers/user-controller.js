const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const prisma = require('../models')

module.exports.updateProfile = tryCatch( async (req, res) => {
  const {firstname, email} = req.body
  let imgUrl = req.file 
  ? `/public/${req.file.filename}`
  : req.user.imgUrl

  const replaceData = { firstname, email, imgUrl}
  
  const rs = await prisma.student.update({
    where : { id : req.user.id },
    data : replaceData
  })

  res.json({result : rs})
})
