
//-- Construct Mutation -----------------------------
const Mutation = {
  createUser: async (parent, { name, nickname, email }, context) => {
    return context.prisma.createUser({
      name,
      nickname,
      email
    })
  },
  updateUser: async (parent, { name, nickname, email, id }, context) => {
    return context.prisma.updateUser({
      where: { id },
      data: { name, nickname, email }
    })
  },
  deleteUser: async (parent, { id }, context) => {
    return context.prisma.deleteUser({
      id
    })
  },
  createCountry: async (parent, { name, code }, context) => {
    return context.prisma.createCountry({
      name,
      code
    })
  }
  // createVisit: async (parent, { user, country, note, level }, context) => {
  //   return context.prisma.createVisit({
  //     user,
  //     country,
  //     note,
  //     level
  //   })
  // }
};

module.exports = {
  Mutation
};
