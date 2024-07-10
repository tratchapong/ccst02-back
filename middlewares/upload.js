const path = require('path')
const multer = require("multer");

const targetFolder = path.join(process.cwd(), 'public')

const storage = multer.diskStorage( {
  destination: (req, file, cb) => { 
    cb(null, targetFolder)
  },
  filename: (req, file, cb) => {
    const newFilename = req.user.s_code + path.extname(file.originalname)
    cb(null, newFilename)
  }
})

module.exports = multer({storage})