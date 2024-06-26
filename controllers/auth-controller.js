const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require("../models");
const customError = require("../utils/customError");

module.exports.register = async (req, res, next) => {
  try {
    const { s_code, password, confirmPassword, firstname, email } = req.body;
    // validation
    if (!(s_code && firstname && password && confirmPassword)) {
      throw(customError("fill all blank inputs", 400));
    }
  
    if (password !== confirmPassword) {
      throw(customEror("password & confirm Password not match", 400));
    }
  
    // lab : ตรวจว่า s_code นี้มีแล้วหรือไม่ ถ้ามีก็แจ้ง error "Already have this code"

    const hashedPassword = await bcrypt.hash(password, 10)
  
    const newStudent = { s_code, password: hashedPassword, firstname, email}
  
    await prisma.student.create({data : newStudent})
  
    res.json({ msg: "Register Successfully" });

  }catch(err) {
    next(err)
  }

};

module.exports.login = async (req, res, next) => {
  try {
    const { t_code, password } = req.body
    // validation 
    if (!(t_code && password)) {
      throw(customEror("fill all blank inputs", 400));
    }

    const rs = await prisma.teacher.findUnique({ where : {t_code : t_code}})
    // console.log(rs)
    if(!rs) {
      throw(customEror('invalid login', 400))
    }
    let pwOk = await bcrypt.compare(password, rs.password )
    if(!pwOk) {
      throw(customEror('invalid login', 400))
    }
    const payload = {id : rs.id, t_code: t_code}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.json(token)
    // res.json({msg: 'Login...'})


  }catch(err) {
    next(err)
  }
};
