"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Country",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Visit",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://backpaca-ed6c7c4fde.herokuapp.com/backpaca/prod`
});
exports.prisma = new exports.Prisma();
