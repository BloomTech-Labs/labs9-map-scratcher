//== Root Query ================================================================

//-- Construct Query -----------------------------
const Query = {
  //-- Sanity Check Query returns 'Hello'
  hello: () => 'Hello',
  //-- Begin Project Queries
  user: (parent, args, context) => {
    return context.prisma.user({ id: args.id });
  },
  users: (parent, args, context) => {
    return context.prisma.users();
  },
  countries: (parent, args, context) => {
    return context.prisma.countries();
  },
  country: (parent, args, context) => {
    return context.prisma.country({ id: args.id });
  },
  visits: (parent, args, context) => {
    return context.prisma.visits();
  },
  visit: (parent, args, context) => {
    return context.prisma.visit({ id: args.id });
  },
  friends: (parent, args, context) => {
    return context.prisma.user({ id: args.id }).friends()
  }
};

//-- Export --------------------------------------
module.exports = {
  Query
}
