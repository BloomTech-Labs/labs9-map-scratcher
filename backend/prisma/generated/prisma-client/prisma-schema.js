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
}

type CountryConnection {
  pageInfo: PageInfo!
  edges: [CountryEdge]!
  aggregate: AggregateCountry!
}

input CountryCreateInput {
  name: String!
  code: String!
}

input CountryCreateOneInput {
  create: CountryCreateInput
  connect: CountryWhereUniqueInput
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

input CountryUpdateDataInput {
  name: String
  code: String
}

input CountryUpdateInput {
  name: String
  code: String
}

input CountryUpdateManyMutationInput {
  name: String
  code: String
}

input CountryUpdateOneRequiredInput {
  create: CountryCreateInput
  update: CountryUpdateDataInput
  upsert: CountryUpsertNestedInput
  connect: CountryWhereUniqueInput
}

input CountryUpsertNestedInput {
  update: CountryUpdateDataInput!
  create: CountryCreateInput!
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
  AND: [CountryWhereInput!]
  OR: [CountryWhereInput!]
  NOT: [CountryWhereInput!]
}

input CountryWhereUniqueInput {
  id: ID
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
  name: String!
  nickname: String!
  email: String!
  visits(where: VisitWhereInput, orderBy: VisitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Visit!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  nickname: String!
  email: String!
  visits: VisitCreateManyWithoutUserInput
}

input UserCreateOneWithoutVisitsInput {
  create: UserCreateWithoutVisitsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutVisitsInput {
  name: String!
  nickname: String!
  email: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  nickname_ASC
  nickname_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  nickname: String!
  email: String!
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

input UserUpdateInput {
  name: String
  nickname: String
  email: String
  visits: VisitUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  name: String
  nickname: String
  email: String
}

input UserUpdateOneRequiredWithoutVisitsInput {
  create: UserCreateWithoutVisitsInput
  update: UserUpdateWithoutVisitsDataInput
  upsert: UserUpsertWithoutVisitsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutVisitsDataInput {
  name: String
  nickname: String
  email: String
}

input UserUpsertWithoutVisitsInput {
  update: UserUpdateWithoutVisitsDataInput!
  create: UserCreateWithoutVisitsInput!
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
  visits_every: VisitWhereInput
  visits_some: VisitWhereInput
  visits_none: VisitWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
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
  country: CountryCreateOneInput!
  note: String
  level: Int
}

input VisitCreateManyWithoutUserInput {
  create: [VisitCreateWithoutUserInput!]
  connect: [VisitWhereUniqueInput!]
}

input VisitCreateWithoutUserInput {
  country: CountryCreateOneInput!
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
  country: CountryUpdateOneRequiredInput
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

input VisitUpdateWithoutUserDataInput {
  country: CountryUpdateOneRequiredInput
  note: String
  level: Int
}

input VisitUpdateWithWhereUniqueWithoutUserInput {
  where: VisitWhereUniqueInput!
  data: VisitUpdateWithoutUserDataInput!
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
    