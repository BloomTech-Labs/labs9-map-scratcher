const User = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    nickname: (parent) => parent.nickname,
    email: (parent) => parent.email,
    visits: (parent, args, context) => {
        return context.prisma.visit({user: parent.name})
    }
}

module.exports = {
    User
}