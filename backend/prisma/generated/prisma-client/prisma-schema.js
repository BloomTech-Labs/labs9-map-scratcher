module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCountry {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVisit {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Country {
  id: ID!
  name: String!
  code: String!
  visits(where: VisitWhereInput, orderBy: VisitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Visit!]
}

type CountryConnection {
  pageInfo: PageInfo!
  edges: [CountryEdge]!
  aggregate: AggregateCountry!
}

input CountryCreateInput {
  name: String!
  code: String!
  visits: VisitCreateManyWithoutCountryInput
}

input CountryCreateOneWithoutVisitsInput {
  create: CountryCreateWithoutVisitsInput
  connect: CountryWhereUniqueInput
}

input CountryCreateWithoutVisitsInput {
  name: String!
  code: String!
}

type CountryEdge {
  node: Country!
  cursor: String!
}

enum CountryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  code_ASC
  code_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CountryPreviousValues {
  id: ID!
  name: String!
  code: String!
}

type CountrySubscriptionPayload {
  mutation: MutationType!
  node: Country
  updatedFields: [String!]
  previousValues: CountryPreviousValues
}

input CountrySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CountryWhereInput
  AND: [CountrySubscriptionWhereInput!]
  OR: [CountrySubscriptionWhereInput!]
  NOT: [CountrySubscriptionWhereInput!]
}

input CountryUpdateInput {
  name: String
  code: String
  visits: VisitUpdateManyWithoutCountryInput
}

input CountryUpdateManyMutationInput {
  name: String
  code: String
}

input CountryUpdateOneRequiredWithoutVisitsInput {
  create: CountryCreateWithoutVisitsInput
  update: CountryUpdateWithoutVisitsDataInput
  upsert: CountryUpsertWithoutVisitsInput
  connect: CountryWhereUniqueInput
}

input CountryUpdateWithoutVisitsDataInput {
  name: String
  code: String
}

input CountryUpsertWithoutVisitsInput {
  update: CountryUpdateWithoutVisitsDataInput!
  create: CountryCreateWithoutVisitsInput!
}

input CountryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  visits_every: VisitWhereInput
  visits_some: VisitWhereInput
  visits_none: VisitWhereInput
  AND: [CountryWhereInput!]
  OR: [CountryWhereInput!]
  NOT: [CountryWhereInput!]
}

input CountryWhereUniqueInput {
  id: ID
  name: String
}

scalar Long

type Mutation {
  createCountry(data: CountryCreateInput!): Country!
  updateCountry(data: CountryUpdateInput!, where: CountryWhereUniqueInput!): Country
  updateManyCountries(data: CountryUpdateManyMutationInput!, where: CountryWhereInput): BatchPayload!
  upsertCountry(where: CountryWhereUniqueInput!, create: CountryCreateInput!, update: CountryUpdateInput!): Country!
  deleteCountry(where: CountryWhereUniqueInput!): Country
  deleteManyCountries(where: CountryWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVisit(data: VisitCreateInput!): Visit!
  updateVisit(data: VisitUpdateInput!, where: VisitWhereUniqueInput!): Visit
  updateManyVisits(data: VisitUpdateManyMutationInput!, where: VisitWhereInput): BatchPayload!
  upsertVisit(where: VisitWhereUniqueInput!, create: VisitCreateInput!, update: VisitUpdateInput!): Visit!
  deleteVisit(where: VisitWhereUniqueInput!): Visit
  deleteManyVisits(where: VisitWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  country(where: CountryWhereUniqueInput!): Country
  countries(where: CountryWhereInput, orderBy: CountryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Country]!
  countriesConnection(where: CountryWhereInput, orderBy: CountryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CountryConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  visit(where: VisitWhereUniqueInput!): Visit
  visits(where: VisitWhereInput, orderBy: VisitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Visit]!
  visitsConnection(where: VisitWhereInput, orderBy: VisitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VisitConnection!
  node(id: ID!): Node
}

type Subscription {
  country(where: CountrySubscriptionWhereInput): CountrySubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  visit(where: VisitSubscriptionWhereInput): VisitSubscriptionPayload
}

type User {
  id: ID!
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  visits(where: VisitWhereInput, orderBy: VisitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Visit!]
  friends(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  visits: VisitCreateManyWithoutUserInput
  friends: UserCreateManyInput
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutVisitsInput {
  create: UserCreateWithoutVisitsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutVisitsInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  friends: UserCreateManyInput
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  auth0id_ASC
  auth0id_DESC
  identity_ASC
  identity_DESC
  name_ASC
  name_DESC
  nickname_ASC
  nickname_DESC
  email_ASC
  email_DESC
  twitterHandle_ASC
  twitterHandle_DESC
  scratchingAutomated_ASC
  scratchingAutomated_DESC
  isPrivate_ASC
  isPrivate_DESC
  isPremium_ASC
  isPremium_DESC
  bio_ASC
  bio_DESC
  pictureUrl_ASC
  pictureUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  auth0id: String
  auth0id_not: String
  auth0id_in: [String!]
  auth0id_not_in: [String!]
  auth0id_lt: String
  auth0id_lte: String
  auth0id_gt: String
  auth0id_gte: String
  auth0id_contains: String
  auth0id_not_contains: String
  auth0id_starts_with: String
  auth0id_not_starts_with: String
  auth0id_ends_with: String
  auth0id_not_ends_with: String
  identity: String
  identity_not: String
  identity_in: [String!]
  identity_not_in: [String!]
  identity_lt: String
  identity_lte: String
  identity_gt: String
  identity_gte: String
  identity_contains: String
  identity_not_contains: String
  identity_starts_with: String
  identity_not_starts_with: String
  identity_ends_with: String
  identity_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  nickname: String
  nickname_not: String
  nickname_in: [String!]
  nickname_not_in: [String!]
  nickname_lt: String
  nickname_lte: String
  nickname_gt: String
  nickname_gte: String
  nickname_contains: String
  nickname_not_contains: String
  nickname_starts_with: String
  nickname_not_starts_with: String
  nickname_ends_with: String
  nickname_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  twitterHandle: String
  twitterHandle_not: String
  twitterHandle_in: [String!]
  twitterHandle_not_in: [String!]
  twitterHandle_lt: String
  twitterHandle_lte: String
  twitterHandle_gt: String
  twitterHandle_gte: String
  twitterHandle_contains: String
  twitterHandle_not_contains: String
  twitterHandle_starts_with: String
  twitterHandle_not_starts_with: String
  twitterHandle_ends_with: String
  twitterHandle_not_ends_with: String
  scratchingAutomated: Boolean
  scratchingAutomated_not: Boolean
  isPrivate: Boolean
  isPrivate_not: Boolean
  isPremium: Boolean
  isPremium_not: Boolean
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  pictureUrl: String
  pictureUrl_not: String
  pictureUrl_in: [String!]
  pictureUrl_not_in: [String!]
  pictureUrl_lt: String
  pictureUrl_lte: String
  pictureUrl_gt: String
  pictureUrl_gte: String
  pictureUrl_contains: String
  pictureUrl_not_contains: String
  pictureUrl_starts_with: String
  pictureUrl_not_starts_with: String
  pictureUrl_ends_with: String
  pictureUrl_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  visits: VisitUpdateManyWithoutUserInput
  friends: UserUpdateManyInput
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserUpdateInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  visits: VisitUpdateManyWithoutUserInput
  friends: UserUpdateManyInput
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserUpdateManyDataInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutVisitsInput {
  create: UserCreateWithoutVisitsInput
  update: UserUpdateWithoutVisitsDataInput
  upsert: UserUpsertWithoutVisitsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutVisitsDataInput {
  auth0id: String
  identity: String
  name: String
  nickname: String
  email: String
  twitterHandle: String
  scratchingAutomated: Boolean
  isPrivate: Boolean
  friends: UserUpdateManyInput
  isPremium: Boolean
  bio: String
  pictureUrl: String
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertWithoutVisitsInput {
  update: UserUpdateWithoutVisitsDataInput!
  create: UserCreateWithoutVisitsInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  auth0id: String
  auth0id_not: String
  auth0id_in: [String!]
  auth0id_not_in: [String!]
  auth0id_lt: String
  auth0id_lte: String
  auth0id_gt: String
  auth0id_gte: String
  auth0id_contains: String
  auth0id_not_contains: String
  auth0id_starts_with: String
  auth0id_not_starts_with: String
  auth0id_ends_with: String
  auth0id_not_ends_with: String
  identity: String
  identity_not: String
  identity_in: [String!]
  identity_not_in: [String!]
  identity_lt: String
  identity_lte: String
  identity_gt: String
  identity_gte: String
  identity_contains: String
  identity_not_contains: String
  identity_starts_with: String
  identity_not_starts_with: String
  identity_ends_with: String
  identity_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  nickname: String
  nickname_not: String
  nickname_in: [String!]
  nickname_not_in: [String!]
  nickname_lt: String
  nickname_lte: String
  nickname_gt: String
  nickname_gte: String
  nickname_contains: String
  nickname_not_contains: String
  nickname_starts_with: String
  nickname_not_starts_with: String
  nickname_ends_with: String
  nickname_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  twitterHandle: String
  twitterHandle_not: String
  twitterHandle_in: [String!]
  twitterHandle_not_in: [String!]
  twitterHandle_lt: String
  twitterHandle_lte: String
  twitterHandle_gt: String
  twitterHandle_gte: String
  twitterHandle_contains: String
  twitterHandle_not_contains: String
  twitterHandle_starts_with: String
  twitterHandle_not_starts_with: String
  twitterHandle_ends_with: String
  twitterHandle_not_ends_with: String
  scratchingAutomated: Boolean
  scratchingAutomated_not: Boolean
  isPrivate: Boolean
  isPrivate_not: Boolean
  visits_every: VisitWhereInput
  visits_some: VisitWhereInput
  visits_none: VisitWhereInput
  friends_every: UserWhereInput
  friends_some: UserWhereInput
  friends_none: UserWhereInput
  isPremium: Boolean
  isPremium_not: Boolean
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  pictureUrl: String
  pictureUrl_not: String
  pictureUrl_in: [String!]
  pictureUrl_not_in: [String!]
  pictureUrl_lt: String
  pictureUrl_lte: String
  pictureUrl_gt: String
  pictureUrl_gte: String
  pictureUrl_contains: String
  pictureUrl_not_contains: String
  pictureUrl_starts_with: String
  pictureUrl_not_starts_with: String
  pictureUrl_ends_with: String
  pictureUrl_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  auth0id: String
  twitterHandle: String
}

type Visit {
  id: ID!
  user: User!
  country: Country!
  note: String
  level: Int
}

type VisitConnection {
  pageInfo: PageInfo!
  edges: [VisitEdge]!
  aggregate: AggregateVisit!
}

input VisitCreateInput {
  user: UserCreateOneWithoutVisitsInput!
  country: CountryCreateOneWithoutVisitsInput!
  note: String
  level: Int
}

input VisitCreateManyWithoutCountryInput {
  create: [VisitCreateWithoutCountryInput!]
  connect: [VisitWhereUniqueInput!]
}

input VisitCreateManyWithoutUserInput {
  create: [VisitCreateWithoutUserInput!]
  connect: [VisitWhereUniqueInput!]
}

input VisitCreateWithoutCountryInput {
  user: UserCreateOneWithoutVisitsInput!
  note: String
  level: Int
}

input VisitCreateWithoutUserInput {
  country: CountryCreateOneWithoutVisitsInput!
  note: String
  level: Int
}

type VisitEdge {
  node: Visit!
  cursor: String!
}

enum VisitOrderByInput {
  id_ASC
  id_DESC
  note_ASC
  note_DESC
  level_ASC
  level_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VisitPreviousValues {
  id: ID!
  note: String
  level: Int
}

input VisitScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  note: String
  note_not: String
  note_in: [String!]
  note_not_in: [String!]
  note_lt: String
  note_lte: String
  note_gt: String
  note_gte: String
  note_contains: String
  note_not_contains: String
  note_starts_with: String
  note_not_starts_with: String
  note_ends_with: String
  note_not_ends_with: String
  level: Int
  level_not: Int
  level_in: [Int!]
  level_not_in: [Int!]
  level_lt: Int
  level_lte: Int
  level_gt: Int
  level_gte: Int
  AND: [VisitScalarWhereInput!]
  OR: [VisitScalarWhereInput!]
  NOT: [VisitScalarWhereInput!]
}

type VisitSubscriptionPayload {
  mutation: MutationType!
  node: Visit
  updatedFields: [String!]
  previousValues: VisitPreviousValues
}

input VisitSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VisitWhereInput
  AND: [VisitSubscriptionWhereInput!]
  OR: [VisitSubscriptionWhereInput!]
  NOT: [VisitSubscriptionWhereInput!]
}

input VisitUpdateInput {
  user: UserUpdateOneRequiredWithoutVisitsInput
  country: CountryUpdateOneRequiredWithoutVisitsInput
  note: String
  level: Int
}

input VisitUpdateManyDataInput {
  note: String
  level: Int
}

input VisitUpdateManyMutationInput {
  note: String
  level: Int
}

input VisitUpdateManyWithoutCountryInput {
  create: [VisitCreateWithoutCountryInput!]
  delete: [VisitWhereUniqueInput!]
  connect: [VisitWhereUniqueInput!]
  disconnect: [VisitWhereUniqueInput!]
  update: [VisitUpdateWithWhereUniqueWithoutCountryInput!]
  upsert: [VisitUpsertWithWhereUniqueWithoutCountryInput!]
  deleteMany: [VisitScalarWhereInput!]
  updateMany: [VisitUpdateManyWithWhereNestedInput!]
}

input VisitUpdateManyWithoutUserInput {
  create: [VisitCreateWithoutUserInput!]
  delete: [VisitWhereUniqueInput!]
  connect: [VisitWhereUniqueInput!]
  disconnect: [VisitWhereUniqueInput!]
  update: [VisitUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [VisitUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [VisitScalarWhereInput!]
  updateMany: [VisitUpdateManyWithWhereNestedInput!]
}

input VisitUpdateManyWithWhereNestedInput {
  where: VisitScalarWhereInput!
  data: VisitUpdateManyDataInput!
}

input VisitUpdateWithoutCountryDataInput {
  user: UserUpdateOneRequiredWithoutVisitsInput
  note: String
  level: Int
}

input VisitUpdateWithoutUserDataInput {
  country: CountryUpdateOneRequiredWithoutVisitsInput
  note: String
  level: Int
}

input VisitUpdateWithWhereUniqueWithoutCountryInput {
  where: VisitWhereUniqueInput!
  data: VisitUpdateWithoutCountryDataInput!
}

input VisitUpdateWithWhereUniqueWithoutUserInput {
  where: VisitWhereUniqueInput!
  data: VisitUpdateWithoutUserDataInput!
}

input VisitUpsertWithWhereUniqueWithoutCountryInput {
  where: VisitWhereUniqueInput!
  update: VisitUpdateWithoutCountryDataInput!
  create: VisitCreateWithoutCountryInput!
}

input VisitUpsertWithWhereUniqueWithoutUserInput {
  where: VisitWhereUniqueInput!
  update: VisitUpdateWithoutUserDataInput!
  create: VisitCreateWithoutUserInput!
}

input VisitWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  country: CountryWhereInput
  note: String
  note_not: String
  note_in: [String!]
  note_not_in: [String!]
  note_lt: String
  note_lte: String
  note_gt: String
  note_gte: String
  note_contains: String
  note_not_contains: String
  note_starts_with: String
  note_not_starts_with: String
  note_ends_with: String
  note_not_ends_with: String
  level: Int
  level_not: Int
  level_in: [Int!]
  level_not_in: [Int!]
  level_lt: Int
  level_lte: Int
  level_gt: Int
  level_gte: Int
  AND: [VisitWhereInput!]
  OR: [VisitWhereInput!]
  NOT: [VisitWhereInput!]
}

input VisitWhereUniqueInput {
  id: ID
}
`
      }
    