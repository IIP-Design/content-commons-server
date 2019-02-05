module.exports = {
        typeDefs: /* GraphQL */ `type AggregateLanguage {
  count: Int!
}

type AggregateTeam {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum ContentType {
  AUDIO
  VIDEO
  DOCUMENT
  IMAGE
  TEACHING_MATERIAL
}

type Language {
  id: ID!
  language_code: String!
  locale: String!
  text_direction: String!
  display_name: String!
  native_name: String!
}

type LanguageConnection {
  pageInfo: PageInfo!
  edges: [LanguageEdge]!
  aggregate: AggregateLanguage!
}

input LanguageCreateInput {
  language_code: String!
  locale: String!
  text_direction: String
  display_name: String!
  native_name: String!
}

type LanguageEdge {
  node: Language!
  cursor: String!
}

enum LanguageOrderByInput {
  id_ASC
  id_DESC
  language_code_ASC
  language_code_DESC
  locale_ASC
  locale_DESC
  text_direction_ASC
  text_direction_DESC
  display_name_ASC
  display_name_DESC
  native_name_ASC
  native_name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LanguagePreviousValues {
  id: ID!
  language_code: String!
  locale: String!
  text_direction: String!
  display_name: String!
  native_name: String!
}

type LanguageSubscriptionPayload {
  mutation: MutationType!
  node: Language
  updatedFields: [String!]
  previousValues: LanguagePreviousValues
}

input LanguageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LanguageWhereInput
  AND: [LanguageSubscriptionWhereInput!]
  OR: [LanguageSubscriptionWhereInput!]
  NOT: [LanguageSubscriptionWhereInput!]
}

input LanguageUpdateInput {
  language_code: String
  locale: String
  text_direction: String
  display_name: String
  native_name: String
}

input LanguageUpdateManyMutationInput {
  language_code: String
  locale: String
  text_direction: String
  display_name: String
  native_name: String
}

input LanguageWhereInput {
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
  language_code: String
  language_code_not: String
  language_code_in: [String!]
  language_code_not_in: [String!]
  language_code_lt: String
  language_code_lte: String
  language_code_gt: String
  language_code_gte: String
  language_code_contains: String
  language_code_not_contains: String
  language_code_starts_with: String
  language_code_not_starts_with: String
  language_code_ends_with: String
  language_code_not_ends_with: String
  locale: String
  locale_not: String
  locale_in: [String!]
  locale_not_in: [String!]
  locale_lt: String
  locale_lte: String
  locale_gt: String
  locale_gte: String
  locale_contains: String
  locale_not_contains: String
  locale_starts_with: String
  locale_not_starts_with: String
  locale_ends_with: String
  locale_not_ends_with: String
  text_direction: String
  text_direction_not: String
  text_direction_in: [String!]
  text_direction_not_in: [String!]
  text_direction_lt: String
  text_direction_lte: String
  text_direction_gt: String
  text_direction_gte: String
  text_direction_contains: String
  text_direction_not_contains: String
  text_direction_starts_with: String
  text_direction_not_starts_with: String
  text_direction_ends_with: String
  text_direction_not_ends_with: String
  display_name: String
  display_name_not: String
  display_name_in: [String!]
  display_name_not_in: [String!]
  display_name_lt: String
  display_name_lte: String
  display_name_gt: String
  display_name_gte: String
  display_name_contains: String
  display_name_not_contains: String
  display_name_starts_with: String
  display_name_not_starts_with: String
  display_name_ends_with: String
  display_name_not_ends_with: String
  native_name: String
  native_name_not: String
  native_name_in: [String!]
  native_name_not_in: [String!]
  native_name_lt: String
  native_name_lte: String
  native_name_gt: String
  native_name_gte: String
  native_name_contains: String
  native_name_not_contains: String
  native_name_starts_with: String
  native_name_not_starts_with: String
  native_name_ends_with: String
  native_name_not_ends_with: String
  AND: [LanguageWhereInput!]
  OR: [LanguageWhereInput!]
  NOT: [LanguageWhereInput!]
}

input LanguageWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createLanguage(data: LanguageCreateInput!): Language!
  updateLanguage(data: LanguageUpdateInput!, where: LanguageWhereUniqueInput!): Language
  updateManyLanguages(data: LanguageUpdateManyMutationInput!, where: LanguageWhereInput): BatchPayload!
  upsertLanguage(where: LanguageWhereUniqueInput!, create: LanguageCreateInput!, update: LanguageUpdateInput!): Language!
  deleteLanguage(where: LanguageWhereUniqueInput!): Language
  deleteManyLanguages(where: LanguageWhereInput): BatchPayload!
  createTeam(data: TeamCreateInput!): Team!
  updateTeam(data: TeamUpdateInput!, where: TeamWhereUniqueInput!): Team
  updateManyTeams(data: TeamUpdateManyMutationInput!, where: TeamWhereInput): BatchPayload!
  upsertTeam(where: TeamWhereUniqueInput!, create: TeamCreateInput!, update: TeamUpdateInput!): Team!
  deleteTeam(where: TeamWhereUniqueInput!): Team
  deleteManyTeams(where: TeamWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
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

enum Permission {
  SUBSCRIBER
  AUTHOR
  EDITOR
  TEAM_ADMIN
  ADMIN
}

type Query {
  language(where: LanguageWhereUniqueInput!): Language
  languages(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Language]!
  languagesConnection(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LanguageConnection!
  team(where: TeamWhereUniqueInput!): Team
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team]!
  teamsConnection(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

type Subscription {
  language(where: LanguageSubscriptionWhereInput): LanguageSubscriptionPayload
  team(where: TeamSubscriptionWhereInput): TeamSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type Team {
  id: ID!
  name: String!
  organization: String!
  members(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  contentTypes: [ContentType!]!
  isConfirmed: Boolean!
}

type TeamConnection {
  pageInfo: PageInfo!
  edges: [TeamEdge]!
  aggregate: AggregateTeam!
}

input TeamCreatecontentTypesInput {
  set: [ContentType!]
}

input TeamCreateInput {
  name: String!
  organization: String!
  members: UserCreateManyWithoutTeamInput
  contentTypes: TeamCreatecontentTypesInput
  isConfirmed: Boolean
}

input TeamCreateOneWithoutMembersInput {
  create: TeamCreateWithoutMembersInput
  connect: TeamWhereUniqueInput
}

input TeamCreateWithoutMembersInput {
  name: String!
  organization: String!
  contentTypes: TeamCreatecontentTypesInput
  isConfirmed: Boolean
}

type TeamEdge {
  node: Team!
  cursor: String!
}

enum TeamOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  organization_ASC
  organization_DESC
  isConfirmed_ASC
  isConfirmed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TeamPreviousValues {
  id: ID!
  name: String!
  organization: String!
  contentTypes: [ContentType!]!
  isConfirmed: Boolean!
}

type TeamSubscriptionPayload {
  mutation: MutationType!
  node: Team
  updatedFields: [String!]
  previousValues: TeamPreviousValues
}

input TeamSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TeamWhereInput
  AND: [TeamSubscriptionWhereInput!]
  OR: [TeamSubscriptionWhereInput!]
  NOT: [TeamSubscriptionWhereInput!]
}

input TeamUpdatecontentTypesInput {
  set: [ContentType!]
}

input TeamUpdateInput {
  name: String
  organization: String
  members: UserUpdateManyWithoutTeamInput
  contentTypes: TeamUpdatecontentTypesInput
  isConfirmed: Boolean
}

input TeamUpdateManyMutationInput {
  name: String
  organization: String
  contentTypes: TeamUpdatecontentTypesInput
  isConfirmed: Boolean
}

input TeamUpdateOneWithoutMembersInput {
  create: TeamCreateWithoutMembersInput
  update: TeamUpdateWithoutMembersDataInput
  upsert: TeamUpsertWithoutMembersInput
  delete: Boolean
  disconnect: Boolean
  connect: TeamWhereUniqueInput
}

input TeamUpdateWithoutMembersDataInput {
  name: String
  organization: String
  contentTypes: TeamUpdatecontentTypesInput
  isConfirmed: Boolean
}

input TeamUpsertWithoutMembersInput {
  update: TeamUpdateWithoutMembersDataInput!
  create: TeamCreateWithoutMembersInput!
}

input TeamWhereInput {
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
  organization: String
  organization_not: String
  organization_in: [String!]
  organization_not_in: [String!]
  organization_lt: String
  organization_lte: String
  organization_gt: String
  organization_gte: String
  organization_contains: String
  organization_not_contains: String
  organization_starts_with: String
  organization_not_starts_with: String
  organization_ends_with: String
  organization_not_ends_with: String
  members_every: UserWhereInput
  members_some: UserWhereInput
  members_none: UserWhereInput
  isConfirmed: Boolean
  isConfirmed_not: Boolean
  AND: [TeamWhereInput!]
  OR: [TeamWhereInput!]
  NOT: [TeamWhereInput!]
}

input TeamWhereUniqueInput {
  id: ID
  name: String
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: [Permission!]!
  team: Team
  isConfirmed: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserCreatepermissionsInput
  team: TeamCreateOneWithoutMembersInput
  isConfirmed: Boolean
}

input UserCreateManyWithoutTeamInput {
  create: [UserCreateWithoutTeamInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreateWithoutTeamInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserCreatepermissionsInput
  isConfirmed: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  tempToken_ASC
  tempToken_DESC
  tempTokenExpiry_ASC
  tempTokenExpiry_DESC
  jobTitle_ASC
  jobTitle_DESC
  country_ASC
  country_DESC
  city_ASC
  city_DESC
  howHeard_ASC
  howHeard_DESC
  isConfirmed_ASC
  isConfirmed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: [Permission!]!
  isConfirmed: Boolean!
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
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
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
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  tempToken: String
  tempToken_not: String
  tempToken_in: [String!]
  tempToken_not_in: [String!]
  tempToken_lt: String
  tempToken_lte: String
  tempToken_gt: String
  tempToken_gte: String
  tempToken_contains: String
  tempToken_not_contains: String
  tempToken_starts_with: String
  tempToken_not_starts_with: String
  tempToken_ends_with: String
  tempToken_not_ends_with: String
  tempTokenExpiry: Float
  tempTokenExpiry_not: Float
  tempTokenExpiry_in: [Float!]
  tempTokenExpiry_not_in: [Float!]
  tempTokenExpiry_lt: Float
  tempTokenExpiry_lte: Float
  tempTokenExpiry_gt: Float
  tempTokenExpiry_gte: Float
  jobTitle: String
  jobTitle_not: String
  jobTitle_in: [String!]
  jobTitle_not_in: [String!]
  jobTitle_lt: String
  jobTitle_lte: String
  jobTitle_gt: String
  jobTitle_gte: String
  jobTitle_contains: String
  jobTitle_not_contains: String
  jobTitle_starts_with: String
  jobTitle_not_starts_with: String
  jobTitle_ends_with: String
  jobTitle_not_ends_with: String
  country: String
  country_not: String
  country_in: [String!]
  country_not_in: [String!]
  country_lt: String
  country_lte: String
  country_gt: String
  country_gte: String
  country_contains: String
  country_not_contains: String
  country_starts_with: String
  country_not_starts_with: String
  country_ends_with: String
  country_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  howHeard: String
  howHeard_not: String
  howHeard_in: [String!]
  howHeard_not_in: [String!]
  howHeard_lt: String
  howHeard_lte: String
  howHeard_gt: String
  howHeard_gte: String
  howHeard_contains: String
  howHeard_not_contains: String
  howHeard_starts_with: String
  howHeard_not_starts_with: String
  howHeard_ends_with: String
  howHeard_not_ends_with: String
  isConfirmed: Boolean
  isConfirmed_not: Boolean
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

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserUpdatepermissionsInput
  team: TeamUpdateOneWithoutMembersInput
  isConfirmed: Boolean
}

input UserUpdateManyDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserUpdatepermissionsInput
  isConfirmed: Boolean
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  email: String
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserUpdatepermissionsInput
  isConfirmed: Boolean
}

input UserUpdateManyWithoutTeamInput {
  create: [UserCreateWithoutTeamInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutTeamInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutTeamInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdateWithoutTeamDataInput {
  firstName: String
  lastName: String
  email: String
  password: String
  tempToken: String
  tempTokenExpiry: Float
  jobTitle: String
  country: String
  city: String
  howHeard: String
  permissions: UserUpdatepermissionsInput
  isConfirmed: Boolean
}

input UserUpdateWithWhereUniqueWithoutTeamInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutTeamDataInput!
}

input UserUpsertWithWhereUniqueWithoutTeamInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutTeamDataInput!
  create: UserCreateWithoutTeamInput!
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
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
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
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  tempToken: String
  tempToken_not: String
  tempToken_in: [String!]
  tempToken_not_in: [String!]
  tempToken_lt: String
  tempToken_lte: String
  tempToken_gt: String
  tempToken_gte: String
  tempToken_contains: String
  tempToken_not_contains: String
  tempToken_starts_with: String
  tempToken_not_starts_with: String
  tempToken_ends_with: String
  tempToken_not_ends_with: String
  tempTokenExpiry: Float
  tempTokenExpiry_not: Float
  tempTokenExpiry_in: [Float!]
  tempTokenExpiry_not_in: [Float!]
  tempTokenExpiry_lt: Float
  tempTokenExpiry_lte: Float
  tempTokenExpiry_gt: Float
  tempTokenExpiry_gte: Float
  jobTitle: String
  jobTitle_not: String
  jobTitle_in: [String!]
  jobTitle_not_in: [String!]
  jobTitle_lt: String
  jobTitle_lte: String
  jobTitle_gt: String
  jobTitle_gte: String
  jobTitle_contains: String
  jobTitle_not_contains: String
  jobTitle_starts_with: String
  jobTitle_not_starts_with: String
  jobTitle_ends_with: String
  jobTitle_not_ends_with: String
  country: String
  country_not: String
  country_in: [String!]
  country_not_in: [String!]
  country_lt: String
  country_lte: String
  country_gt: String
  country_gte: String
  country_contains: String
  country_not_contains: String
  country_starts_with: String
  country_not_starts_with: String
  country_ends_with: String
  country_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  howHeard: String
  howHeard_not: String
  howHeard_in: [String!]
  howHeard_not_in: [String!]
  howHeard_lt: String
  howHeard_lte: String
  howHeard_gt: String
  howHeard_gte: String
  howHeard_contains: String
  howHeard_not_contains: String
  howHeard_starts_with: String
  howHeard_not_starts_with: String
  howHeard_ends_with: String
  howHeard_not_ends_with: String
  team: TeamWhereInput
  isConfirmed: Boolean
  isConfirmed_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Video {
  id: ID!
  title: String!
  owner: String
  author: String
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  title: String!
  owner: String
  author: String
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  owner_ASC
  owner_DESC
  author_ASC
  author_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  id: ID!
  title: String!
  owner: String
  author: String
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

input VideoUpdateInput {
  title: String
  owner: String
  author: String
}

input VideoUpdateManyMutationInput {
  title: String
  owner: String
  author: String
}

input VideoWhereInput {
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
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  owner: String
  owner_not: String
  owner_in: [String!]
  owner_not_in: [String!]
  owner_lt: String
  owner_lte: String
  owner_gt: String
  owner_gte: String
  owner_contains: String
  owner_not_contains: String
  owner_starts_with: String
  owner_not_starts_with: String
  owner_ends_with: String
  owner_not_ends_with: String
  author: String
  author_not: String
  author_in: [String!]
  author_not_in: [String!]
  author_lt: String
  author_lte: String
  author_gt: String
  author_gte: String
  author_contains: String
  author_not_contains: String
  author_starts_with: String
  author_not_starts_with: String
  author_ends_with: String
  author_not_ends_with: String
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
}
`
      }
    