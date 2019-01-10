const Country = {
  name: ({ id }, args, context) => {
    return context.prisma.country({ id })
  }
}; 

module.exports = {
  Country
};
