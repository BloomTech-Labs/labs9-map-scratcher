
async function createUser(ctx, token) {
  const user = await ctx.prisma.mutation.createUser({
    data: {
      identity: token.sub.split(`|`)[0],
      auth0id: token.sub.split(`|`)[1],
      name: token.name,
      email: token.email,
      picture: token.picture
    }
  })
  return user;
}

const ctxUser = ctx => ctx.request.user;


module.exports = {
  createUser,
  ctxUser,
}
