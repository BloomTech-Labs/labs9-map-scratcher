const Country = {
  name: (parent, { id }, context) => {
    return context.prisma.country({ id })
  },
};

module.exports = {
  Country
};
