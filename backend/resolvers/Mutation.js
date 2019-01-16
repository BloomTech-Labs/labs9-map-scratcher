
//-- Construct Mutation -----------------------------
const Mutation = {
  createUser: async (parent, { twitterHandle, name, nickname, email }, context) => {
    return await context.prisma.createUser({
      twitterHandle,
      name,
      nickname,
      email
    })
  },
  updateUser: async (parent, { name, nickname, email, id }, context) => {
    return await context.prisma.updateUser({
      where: { id },
      data: { name, nickname, email }
    })
  },
  deleteUser: async (parent, { id }, context) => {
    return await context.prisma.deleteUser({
      id
    })
  },
  createCountry: async (parent, { name, code }, context) => {
    return await context.prisma.createCountry({
      name,
      code
    })
  },
  createVisit: async (parent, { userId, countryId, note, level }, context) => {
    return await context.prisma.createVisit({
      user: {
        connect: { id: userId }
      },
      countryId: {
        connect: { id: countryId }
      },
      note,
      level
    })
  },
  // friend mutation is a work-in-progress
  friend: async (parent, { userId, friendId }, context) => {
    return await context.prisma.updateUser({
      where: { id: userId },
      data: { friends: { connect: { id: friendId } } }
    })
  },
};

module.exports = {
  Mutation
};
