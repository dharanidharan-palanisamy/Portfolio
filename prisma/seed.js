const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@dharanidharan.com'
  const plainPassword = 'password123'
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  })
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Dharani Dharan',
      }
    })
    console.log(`Admin user created: ${email} / ${plainPassword}`)
  } else {
    console.log(`Admin user already exists: ${email}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
