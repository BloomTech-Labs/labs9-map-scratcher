const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { User } = require('./User')
const { Country } = require('./Country')
const { Visit } = require('./Visit')

const resolvers = {
  Query,
  Mutation,
  User,
  Country,
  Visit
}

module.exports = {
  resolvers
}
