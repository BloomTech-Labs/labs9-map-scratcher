const Visit = {
  user: (parent, args, context) => {
    return context.prisma.visit({ id: parent.id }).user()
  },
  country: (parent, args, context) => {
    return context.prisma.visit({ id: parent.id }).country()
  }
}

module.exports = {
  Visit
}
