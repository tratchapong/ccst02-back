const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456', 10)

const teacherData = [
    { firstname: 'Andy',t_code:'t001',  password: hashedPassword, email: 'andy@ggg.mail'},
    { firstname: 'Bobby',t_code:'t002', password: hashedPassword, email: 'bobby@ggg.mail'},
    { firstname: 'Candy',t_code:'t003', password: hashedPassword, email: 'candy@ggg.mail'},
    { firstname: 'Danny',t_code:'t004', password: hashedPassword, email: 'danny@ggg.mail'}
]

const subjectData = [
    { title: 'HTML', description:'HTML5 : Writing a web page'},
    { title: 'CSS', description:'CSS : Styling a web page'},
    { title: 'JS', description:'JS : Interactive web page'},
]

console.log('Seed...')

async function run() {
    await prisma.teacher.createMany({data: teacherData})
    await prisma.subject.createMany({data: subjectData})
}

run()
