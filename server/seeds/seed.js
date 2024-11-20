const prisma = require("../config/prisma.config");
const seedDemoUser = require("./user");

async function main() {
    await seedDemoUser()
}

main()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});