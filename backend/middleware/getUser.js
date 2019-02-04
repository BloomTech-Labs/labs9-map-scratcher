

//== getUser ======================================================
/*
    Middleware to add the user information to the request before it passes through the graphQL endpoint. Allows us to pull the user information from here for queries and mutations instead of needing to pass in an id variable from the client or importing another function into each resolver.
*/

//-- getUser --------------------------------
const getUser = async (req, res, next, prisma) => {
  //if no user on the request, continue on.
  if (!req.user) { return next() }
  //otherwise, split the user sub on the request.user to obtain the auth0id and query the prisma database to return the full user for easy access in resolvers
  const user = await prisma.user({ auth0id: req.user.sub.split(`|`)[1] });
  req.user = { token: req.user, ...user }
  next()
}

module.exports = { getUser }
