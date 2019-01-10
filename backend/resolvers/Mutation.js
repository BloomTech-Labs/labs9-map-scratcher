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
  // createVisit: async (parent, )
}; 

module.exports = {
  Mutation
};
