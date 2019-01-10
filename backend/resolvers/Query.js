

//== Root Query ================================================================

//-- Construct Query -----------------------------
const Query = {
    hello: () => 'Hello',
    // country: (parent, args, context) => {
    //   return context.prisma.countries()
    // },
    user: (parent, args, context) => {
        return context.prisma.user({id: args.id});
    }
};

//-- Export --------------------------------------
module.exports = {
    Query
};
