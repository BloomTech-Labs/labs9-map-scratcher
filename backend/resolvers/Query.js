//== Root Query ================================================================

//-- Construct Query -----------------------------
const Query = {
  hello: () => 'Hello',
  // country: (parent, args, context) => {
  //   return context.prisma.countries()
  // },
  user: (parent, args, context) => {
    return context.prisma.user({ id: args.id })
  },
  country: (parent, args, context) => {
    return context.prisma.country({ id: args.id })
  },
  visit: (parent, args, context) => {
    return context.prisma.visit({ id: args.id })
  },
  visits: (parent, args, context) => {
    return context.prisma.visits()
  }
}

//-- Export --------------------------------------
module.exports = {
  Query
}
