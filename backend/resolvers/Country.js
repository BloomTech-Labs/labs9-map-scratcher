const Country = {
  visits: (parent, args, context) => {
    return context.prisma.country({ id: parent.id}).visits();
  },
};

module.exports = {
  Country
};
