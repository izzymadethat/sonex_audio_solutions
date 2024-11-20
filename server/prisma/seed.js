const prisma = require("../config/prisma.config");
const seedDemoUser = require("../seeds/user");

async function main() {
    await seedDemoUser()
}

main()
.then(() => {
    console.log("Database seeded successfully");
})
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});