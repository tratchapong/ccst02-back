const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require('../utils/tryCatch')

module.exports.register = tryCatch(async (req, res, next) => {

  const { s_code, password, confirmPassword, firstname, email } = req.body;
  // validation
  if (!(s_code && firstname && password && confirmPassword)) {
    throw(customError("fill all blank inputs", 400));
  }

  if (password !== confirmPassword) {
    throw(customError("password & confirm Password not match", 400));
  }
  // ตรวจว่า s_code นี้มีแล้วหรือไม่ ถ้ามีก็แจ้ง error "Already have this code"

  const findCode = await prisma.student.findUnique({where : { s_code : s_code}})
  if(findCode) {
    throw(customError(`Already have code: ${s_code}`, 409))
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newStudent = { s_code, password: hashedPassword, firstname, email}

  await prisma.student.create({data : newStudent})

  res.status(201).json({ msg: "Register Successfully" });
})

module.exports.login = tryCatch(async (req, res, next) => {

  const { t_code, s_code,  password } = req.body
  // console.log("s_code =",s_code)
  // validation 
  if( (t_code) && (s_code) || ( !t_code && !s_code )) {
    throw customError('use teacher or student code',400)
  }

  if (!password) {
    throw(customError("fill all blank inputs", 400));
  }
  // Lab 15min: ให้ทั้ง teacher & student สามารถ login ได้ (10:00)

  // find user (teacher & student)
  // const rs = await prisma.teacher.findUniqueOrThrow({ where : {t_code : t_code}})

  const rs = t_code 
    ? await prisma.teacher.findUnique({ where : {t_code : t_code}})
    : await prisma.student.findUnique({ where : {s_code : s_code}})

  if(!rs) {
    throw(customError('invalid login', 401))
  }
  // check password
  let pwOk = await bcrypt.compare(password, rs.password )
  if(!pwOk) {
    throw(customError('invalid login', 401))
  }
  const payload = t_code 
  ? {id : rs.id, t_code: t_code}
  : {id : rs.id, s_code: s_code}
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'})

  res.json(token)
})

module.exports.getMe = (req,res,next) => {
  res.json({user : req.user})
}