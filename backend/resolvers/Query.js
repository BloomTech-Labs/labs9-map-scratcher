

//== Root Query =================================================l............................................===============

//-- Construct Query -----------------------------
const Query = {
  //--Sanity Check -------
    hello: () => 'Hello',
    user: (parent, args, context) => {
        return context.prisma.user({id: args.id});
    },
    users: (parent, args, context) => {
      return context.prisma.users();
    },
    countries: (parent, args, context) => {
      return context.prisma.countries();
    },
};

//-- Export --------------------------------------
module.exports = {
    Query
};
