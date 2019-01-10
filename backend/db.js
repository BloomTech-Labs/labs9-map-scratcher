const { Prisma } = require('./prisma/generated/prisma-client');

const db = new Prisma({
  typeDefs: './prisma/generated/prisma-client/prisma-schema.js',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: true,
});

module.exports = db;
