// NODE MODULES, DEPENDENCIES
// ==============================================
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const keys = require('../../config/keys')

// TWITTER PASSPORT STRATEGY
// ==============================================
module.exports = prisma => {
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user({ id })
    done(null, user)
  })

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitterConsumerKey,
        consumerSecret: keys.twitterConsumerSecret,
        callbackURL: '/auth/twitter/callback',
        proxy: true
      },
      async (token, tokenSecret, profile, done) => {
        const existingUser = await prisma.user({
          twitterHandle: profile.displayName
        })
        if (existingUser) {
          done(null, existingUser)
        } else {
          const user = await prisma
            .user({
              twitterHandle: profile.displayName
            })
            .save()
          done(null, user)
        }
      }
    )
  )
}
