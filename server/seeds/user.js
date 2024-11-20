const prisma = require("../config/prisma.config");
const bcrypt = require("bcryptjs");

const seedDemoUser = async () => {
    const demoUser = prisma.user.findUnique({
        where: {
            email: "demo@sonexaudio.app"
        }
    })
    if (!demoUser) {
        const salt = bcrypt.genSaltSync(10);
        await prisma.user.create({
            data: {
                firstName: "Demo",
                lastName: "User",
                username: "demo",
                email: "demo@sonexaudio.app",
                hashedPassword: bcrypt.hashSync("password", salt)
            }
        })
    }
}

module.exports = seedDemoUser