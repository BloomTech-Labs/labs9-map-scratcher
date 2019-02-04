const validateAndParseIdToken = require('../helpers/validateAndParseIdToken');

async function createPrismaUser(context, idToken) {
  const user = await context.prisma.createUser({
      identity: idToken.sub.split(`|`)[0],
      auth0id: idToken.sub.split(`|`)[1],
      name: idToken.name,
      email: idToken.email,
      pictureUrl: idToken.picture
  })
  return user;
};

//-- Construct Mutation -----------------------------
const Mutation = {
  authenticate: async (parent, { idToken }, context, info) => {
    let userToken = null;
    try {
      userToken = await validateAndParseIdToken(idToken);
    } catch (err) {
      throw new Error(err.message)
    }
    const auth0id = userToken.sub.split("|")[1];
    let user = await context.prisma.user({ auth0id }, info);
    if (!user) {
      user = createPrismaUser(context, userToken)
    }
    return user
  },
  // createUser: async (parent, { twitterHandle, name, nickname, email }, context) => {
  //   return await context.prisma.createUser({
  //     twitterHandle,
  //     name,
  //     nickname,
  //     email,
  //     scratchingAutomated: false,
  //     isPrivate: false
  //   })
  // },
  updateUser: async (parent, { name, nickname, email, scratchingAutomated, isPrivate, id, bio, pictureUrl }, context) => {
    return await context.prisma.updateUser({
      where: { id },
      data: {
        name,
        nickname,
        email,
        scratchingAutomated,
        isPrivate,
        bio,
        pictureUrl
      }
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
        connect: {
          id: userId
        }
      },
      country: {
        connect: {
          id: countryId
        }
      },
      note,
      level
    })
  },
  updateVisit: async (parent, { id, note, level }, context) => {
    return await context.prisma.updateVisit({
      where: { id },
      data: {
        note, level
      }
    })
  },
  deleteVisit: async (parent, { id }, context) => {
    return await context.prisma.deleteVisit({
      id
    })
  },
  addFriend: async (parent, { userId, friendId }, context) => {
    return await context.prisma.updateUser({
      where: {
        id: userId
      },
      data: {
        friends: {
          connect: {
            id: friendId
          }
        }
      }
    })
  },
  deleteFriend: async (parent, { userId, friendId }, context) => {
    return await context.prisma.updateUser({
      where: {
        id: userId
      },
      data: {
        friends: {
          disconnect: {
            id: friendId
          }
        }
      }
    })
  }
};

module.exports = {
  Mutation
};
