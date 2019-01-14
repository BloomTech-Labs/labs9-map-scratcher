// NODE MODULES, DEPENDENCIES
// ==============================================
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

// TWITTER PASSPORT STRATEGY
// ==============================================
module.exports = async prisma => {
  const user = await prisma.user({
    $where: { id: 'cjqpxk83t000o0829p7mr6qto' }
  })
  console.log('user', user)
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    // User.findById(id).then(user => {
    //   done(null, user);
    // });
    // const user = prisma.user({ where: { id: id } });
  })
  // passport.use(
  //   new TwitterStrategy(
  //     {
  //       consumerKey: keys.twitterConsumerKey,
  //       consumerSecret: keys.twitterConsumerSecret,
  //       callbackURL: '/auth/twitter/callback',
  //       proxy: true
  //     },
  //     async (token, tokenSecret, profile, done) => {
  //       const existingUser = await User.findOne({ twitterId: profile.id });
  //       if (existingUser) {
  //         done(null, existingUser);
  //       } else {
  //         const user = await new User({
  //           username: profile.displayName,
  //           twitterId: profile.id,
  //           avatar: profile._json.profile_image_url
  //         }).save();
  //         done(null, user);
  //       }
  //     }
  //   )
  // );
}
