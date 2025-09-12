const prisma = require('@prisma/client');
const { PrismaClient } = prisma;

const prismaClient = new PrismaClient({
    //log:['query']
})


module.exports = prismaClient;