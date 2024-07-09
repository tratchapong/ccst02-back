const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const prisma = require('../models')

module.exports.updateProfile = tryCatch( async (req, res) => {
  const {firstname, email} = req.body
  let imgUrl = req.file 
    ? `/public/${req.file.filename}`
    : req.user.imgUrl
  replaceData = { firstname, email, imgUrl}
  
  await prisma.student.update({
    where : { id : req.user.id },
    data : replaceData
  })
    
  // console.log(imgUrl)
  // console.log('file',req.file)
  // console.log('body :',req.body)

  res.json({msg:'update profile..'})
} )