const _get = require("lodash.get")

const userLocationOnContext = "request.user"

const isLoggedIn = ctx => {
  const user = ctxUser(ctx, userLocationOnContext)
  if (!user) throw new Error(`Not logged in`)
  return user
}
const ctxUser = ctx => _get(ctx, userLocationOnContext)


const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx) => {
    isLoggedIn(ctx)
    return next()
  },
}

module.exports = { directiveResolvers }
