const Query = {
  me: (parent, args, context) => {
    return context.prisma.user({ id: args.id })
  },
  country: (parent, args, context) => {
    return context.prisma.countries()
  }
};

module.exports = {
  Query
}; 
