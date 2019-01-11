const Country = {
  visits: (parent, args, context) => {
    return context.prisma.visits({country: parent.id })
  },
};

module.exports = {
  Country
};
