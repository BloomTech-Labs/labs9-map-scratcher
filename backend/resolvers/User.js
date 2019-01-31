const User = {
  id: parent => parent.id,
  name: parent => parent.name,
  nickname: parent => parent.nickname,
  email: parent => parent.email,
  twitterHandle: parent => parent.twitterHandle,
  scratchingAutomated: parent => parent.scratchingAutomated,
  isPrivate: parent => parent.isPrivate,
  bio: parent => parent.bio,
  pictureUrl: parent => parent.pictureUrl,
  visits: (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).visits()
  },
  friends: (parent, args, context) => {
    return context.prisma.user({ id: parent.id }).friends(); 
  }
}

module.exports = {
  User
}
