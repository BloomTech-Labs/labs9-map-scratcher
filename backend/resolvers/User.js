const User = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    nickname: (parent) => parent.nickname,
    email: (parent) => parent.email,
    visits: (parent, args, context) => {
        return context.prisma.user({id: parent.id}).visits();
    }
}

module.exports = {
    User
}
