module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCategory {
  count: Int!
}

type AggregateDimensions {
  count: Int!
}

type AggregateImageFile {
  count: Int!
}

type AggregateImageUse {
  count: Int!
}

type AggregateLanguage {
  count: Int!
}

type AggregateSupportFile {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateTeam {
  count: Int!
}

type AggregateThumbnail {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideoFile {
  count: Int!
}

type AggregateVideoProject {
  count: Int!
}

type AggregateVideoStream {
  count: Int!
}

type AggregateVideoUnit {
  count: Int!
}

type AggregateVideoUse {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Category {
  id: ID!
  name: String!
  language: Language!
}

type CategoryConnection {
  pageInfo: PageInfo!
  edges: [CategoryEdge]!
  aggregate: AggregateCategory!
}

input CategoryCreateInput {
  name: String!
  language: LanguageCreateOneInput!
}

input CategoryCreateManyInput {
  create: [CategoryCreateInput!]
  connect: [CategoryWhereUniqueInput!]
}

type CategoryEdge {
  node: Category!
  cursor: String!
}

enum CategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CategoryPreviousValues {
  id: ID!
  name: String!
}

input CategoryScalarWhereInput {
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
  AND: [CategoryScalarWhereInput!]
  OR: [CategoryScalarWhereInput!]
  NOT: [CategoryScalarWhereInput!]
}

type CategorySubscriptionPayload {
  mutation: MutationType!
  node: Category
  updatedFields: [String!]
  previousValues: CategoryPreviousValues
}

input CategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CategoryWhereInput
  AND: [CategorySubscriptionWhereInput!]
  OR: [CategorySubscriptionWhereInput!]
  NOT: [CategorySubscriptionWhereInput!]
}

input CategoryUpdateDataInput {
  name: String
  language: LanguageUpdateOneRequiredInput
}

input CategoryUpdateInput {
  name: String
  language: LanguageUpdateOneRequiredInput
}

input CategoryUpdateManyDataInput {
  name: String
}

input CategoryUpdateManyInput {
  create: [CategoryCreateInput!]
  update: [CategoryUpdateWithWhereUniqueNestedInput!]
  upsert: [CategoryUpsertWithWhereUniqueNestedInput!]
  delete: [CategoryWhereUniqueInput!]
  connect: [CategoryWhereUniqueInput!]
  disconnect: [CategoryWhereUniqueInput!]
  deleteMany: [CategoryScalarWhereInput!]
  updateMany: [CategoryUpdateManyWithWhereNestedInput!]
}

input CategoryUpdateManyMutationInput {
  name: String
}

input CategoryUpdateManyWithWhereNestedInput {
  where: CategoryScalarWhereInput!
  data: CategoryUpdateManyDataInput!
}

input CategoryUpdateWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput!
  data: CategoryUpdateDataInput!
}

input CategoryUpsertWithWhereUniqueNestedInput {
  where: CategoryWhereUniqueInput!
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryWhereInput {
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
  language: LanguageWhereInput
  AND: [CategoryWhereInput!]
  OR: [CategoryWhereInput!]
  NOT: [CategoryWhereInput!]
}

input CategoryWhereUniqueInput {
  id: ID
}

enum ContentType {
  AUDIO
  VIDEO
  DOCUMENT
  IMAGE
  TEACHING_MATERIAL
}

type Dimensions {
  id: ID!
  width: Int
  height: Int
}

type DimensionsConnection {
  pageInfo: PageInfo!
  edges: [DimensionsEdge]!
  aggregate: AggregateDimensions!
}

input DimensionsCreateInput {
  width: Int
  height: Int
}

input DimensionsCreateOneInput {
  create: DimensionsCreateInput
  connect: DimensionsWhereUniqueInput
}

type DimensionsEdge {
  node: Dimensions!
  cursor: String!
}

enum DimensionsOrderByInput {
  id_ASC
  id_DESC
  width_ASC
  width_DESC
  height_ASC
  height_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DimensionsPreviousValues {
  id: ID!
  width: Int
  height: Int
}

type DimensionsSubscriptionPayload {
  mutation: MutationType!
  node: Dimensions
  updatedFields: [String!]
  previousValues: DimensionsPreviousValues
}

input DimensionsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DimensionsWhereInput
  AND: [DimensionsSubscriptionWhereInput!]
  OR: [DimensionsSubscriptionWhereInput!]
  NOT: [DimensionsSubscriptionWhereInput!]
}

input DimensionsUpdateDataInput {
  width: Int
  height: Int
}

input DimensionsUpdateInput {
  width: Int
  height: Int
}

input DimensionsUpdateManyMutationInput {
  width: Int
  height: Int
}

input DimensionsUpdateOneInput {
  create: DimensionsCreateInput
  update: DimensionsUpdateDataInput
  upsert: DimensionsUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: DimensionsWhereUniqueInput
}

input DimensionsUpsertNestedInput {
  update: DimensionsUpdateDataInput!
  create: DimensionsCreateInput!
}

input DimensionsWhereInput {
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
  width: Int
  width_not: Int
  width_in: [Int!]
  width_not_in: [Int!]
  width_lt: Int
  width_lte: Int
  width_gt: Int
  width_gte: Int
  height: Int
  height_not: Int
  height_in: [Int!]
  height_not_in: [Int!]
  height_lt: Int
  height_lte: Int
  height_gt: Int
  height_gte: Int
  AND: [DimensionsWhereInput!]
  OR: [DimensionsWhereInput!]
  NOT: [DimensionsWhereInput!]
}

input DimensionsWhereUniqueInput {
  id: ID
}

type ImageFile {
  id: ID!
  language: Language
  dimensions: Dimensions
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

type ImageFileConnection {
  pageInfo: PageInfo!
  edges: [ImageFileEdge]!
  aggregate: AggregateImageFile!
}

input ImageFileCreateInput {
  language: LanguageCreateOneInput
  dimensions: DimensionsCreateOneInput
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileCreateManyInput {
  create: [ImageFileCreateInput!]
  connect: [ImageFileWhereUniqueInput!]
}

input ImageFileCreateOneInput {
  create: ImageFileCreateInput
  connect: ImageFileWhereUniqueInput
}

type ImageFileEdge {
  node: ImageFile!
  cursor: String!
}

enum ImageFileOrderByInput {
  id_ASC
  id_DESC
  alt_ASC
  alt_DESC
  longdesc_ASC
  longdesc_DESC
  caption_ASC
  caption_DESC
  filename_ASC
  filename_DESC
  filetype_ASC
  filetype_DESC
  md5_ASC
  md5_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ImageFilePreviousValues {
  id: ID!
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileScalarWhereInput {
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
  alt: String
  alt_not: String
  alt_in: [String!]
  alt_not_in: [String!]
  alt_lt: String
  alt_lte: String
  alt_gt: String
  alt_gte: String
  alt_contains: String
  alt_not_contains: String
  alt_starts_with: String
  alt_not_starts_with: String
  alt_ends_with: String
  alt_not_ends_with: String
  longdesc: String
  longdesc_not: String
  longdesc_in: [String!]
  longdesc_not_in: [String!]
  longdesc_lt: String
  longdesc_lte: String
  longdesc_gt: String
  longdesc_gte: String
  longdesc_contains: String
  longdesc_not_contains: String
  longdesc_starts_with: String
  longdesc_not_starts_with: String
  longdesc_ends_with: String
  longdesc_not_ends_with: String
  caption: String
  caption_not: String
  caption_in: [String!]
  caption_not_in: [String!]
  caption_lt: String
  caption_lte: String
  caption_gt: String
  caption_gte: String
  caption_contains: String
  caption_not_contains: String
  caption_starts_with: String
  caption_not_starts_with: String
  caption_ends_with: String
  caption_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [ImageFileScalarWhereInput!]
  OR: [ImageFileScalarWhereInput!]
  NOT: [ImageFileScalarWhereInput!]
}

type ImageFileSubscriptionPayload {
  mutation: MutationType!
  node: ImageFile
  updatedFields: [String!]
  previousValues: ImageFilePreviousValues
}

input ImageFileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ImageFileWhereInput
  AND: [ImageFileSubscriptionWhereInput!]
  OR: [ImageFileSubscriptionWhereInput!]
  NOT: [ImageFileSubscriptionWhereInput!]
}

input ImageFileUpdateDataInput {
  language: LanguageUpdateOneInput
  dimensions: DimensionsUpdateOneInput
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileUpdateInput {
  language: LanguageUpdateOneInput
  dimensions: DimensionsUpdateOneInput
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileUpdateManyDataInput {
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileUpdateManyInput {
  create: [ImageFileCreateInput!]
  update: [ImageFileUpdateWithWhereUniqueNestedInput!]
  upsert: [ImageFileUpsertWithWhereUniqueNestedInput!]
  delete: [ImageFileWhereUniqueInput!]
  connect: [ImageFileWhereUniqueInput!]
  disconnect: [ImageFileWhereUniqueInput!]
  deleteMany: [ImageFileScalarWhereInput!]
  updateMany: [ImageFileUpdateManyWithWhereNestedInput!]
}

input ImageFileUpdateManyMutationInput {
  alt: String
  longdesc: String
  caption: String
  filename: String
  filetype: String
  md5: String
  url: String
}

input ImageFileUpdateManyWithWhereNestedInput {
  where: ImageFileScalarWhereInput!
  data: ImageFileUpdateManyDataInput!
}

input ImageFileUpdateOneInput {
  create: ImageFileCreateInput
  update: ImageFileUpdateDataInput
  upsert: ImageFileUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ImageFileWhereUniqueInput
}

input ImageFileUpdateWithWhereUniqueNestedInput {
  where: ImageFileWhereUniqueInput!
  data: ImageFileUpdateDataInput!
}

input ImageFileUpsertNestedInput {
  update: ImageFileUpdateDataInput!
  create: ImageFileCreateInput!
}

input ImageFileUpsertWithWhereUniqueNestedInput {
  where: ImageFileWhereUniqueInput!
  update: ImageFileUpdateDataInput!
  create: ImageFileCreateInput!
}

input ImageFileWhereInput {
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
  language: LanguageWhereInput
  dimensions: DimensionsWhereInput
  alt: String
  alt_not: String
  alt_in: [String!]
  alt_not_in: [String!]
  alt_lt: String
  alt_lte: String
  alt_gt: String
  alt_gte: String
  alt_contains: String
  alt_not_contains: String
  alt_starts_with: String
  alt_not_starts_with: String
  alt_ends_with: String
  alt_not_ends_with: String
  longdesc: String
  longdesc_not: String
  longdesc_in: [String!]
  longdesc_not_in: [String!]
  longdesc_lt: String
  longdesc_lte: String
  longdesc_gt: String
  longdesc_gte: String
  longdesc_contains: String
  longdesc_not_contains: String
  longdesc_starts_with: String
  longdesc_not_starts_with: String
  longdesc_ends_with: String
  longdesc_not_ends_with: String
  caption: String
  caption_not: String
  caption_in: [String!]
  caption_not_in: [String!]
  caption_lt: String
  caption_lte: String
  caption_gt: String
  caption_gte: String
  caption_contains: String
  caption_not_contains: String
  caption_starts_with: String
  caption_not_starts_with: String
  caption_ends_with: String
  caption_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [ImageFileWhereInput!]
  OR: [ImageFileWhereInput!]
  NOT: [ImageFileWhereInput!]
}

input ImageFileWhereUniqueInput {
  id: ID
}

type ImageUse {
  id: ID!
  name: String!
}

type ImageUseConnection {
  pageInfo: PageInfo!
  edges: [ImageUseEdge]!
  aggregate: AggregateImageUse!
}

input ImageUseCreateInput {
  name: String!
}

type ImageUseEdge {
  node: ImageUse!
  cursor: String!
}

enum ImageUseOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ImageUsePreviousValues {
  id: ID!
  name: String!
}

type ImageUseSubscriptionPayload {
  mutation: MutationType!
  node: ImageUse
  updatedFields: [String!]
  previousValues: ImageUsePreviousValues
}

input ImageUseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ImageUseWhereInput
  AND: [ImageUseSubscriptionWhereInput!]
  OR: [ImageUseSubscriptionWhereInput!]
  NOT: [ImageUseSubscriptionWhereInput!]
}

input ImageUseUpdateInput {
  name: String
}

input ImageUseUpdateManyMutationInput {
  name: String
}

input ImageUseWhereInput {
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
  AND: [ImageUseWhereInput!]
  OR: [ImageUseWhereInput!]
  NOT: [ImageUseWhereInput!]
}

input ImageUseWhereUniqueInput {
  id: ID
}

type Language {
  id: ID!
  languageCode: String!
  locale: String!
  textDirection: String!
  displayName: String!
  nativeName: String!
}

type LanguageConnection {
  pageInfo: PageInfo!
  edges: [LanguageEdge]!
  aggregate: AggregateLanguage!
}

input LanguageCreateInput {
  languageCode: String!
  locale: String!
  textDirection: String
  displayName: String!
  nativeName: String!
}

input LanguageCreateOneInput {
  create: LanguageCreateInput
  connect: LanguageWhereUniqueInput
}

type LanguageEdge {
  node: Language!
  cursor: String!
}

enum LanguageOrderByInput {
  id_ASC
  id_DESC
  languageCode_ASC
  languageCode_DESC
  locale_ASC
  locale_DESC
  textDirection_ASC
  textDirection_DESC
  displayName_ASC
  displayName_DESC
  nativeName_ASC
  nativeName_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LanguagePreviousValues {
  id: ID!
  languageCode: String!
  locale: String!
  textDirection: String!
  displayName: String!
  nativeName: String!
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

input LanguageUpdateDataInput {
  languageCode: String
  locale: String
  textDirection: String
  displayName: String
  nativeName: String
}

input LanguageUpdateInput {
  languageCode: String
  locale: String
  textDirection: String
  displayName: String
  nativeName: String
}

input LanguageUpdateManyMutationInput {
  languageCode: String
  locale: String
  textDirection: String
  displayName: String
  nativeName: String
}

input LanguageUpdateOneInput {
  create: LanguageCreateInput
  update: LanguageUpdateDataInput
  upsert: LanguageUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: LanguageWhereUniqueInput
}

input LanguageUpdateOneRequiredInput {
  create: LanguageCreateInput
  update: LanguageUpdateDataInput
  upsert: LanguageUpsertNestedInput
  connect: LanguageWhereUniqueInput
}

input LanguageUpsertNestedInput {
  update: LanguageUpdateDataInput!
  create: LanguageCreateInput!
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
  languageCode: String
  languageCode_not: String
  languageCode_in: [String!]
  languageCode_not_in: [String!]
  languageCode_lt: String
  languageCode_lte: String
  languageCode_gt: String
  languageCode_gte: String
  languageCode_contains: String
  languageCode_not_contains: String
  languageCode_starts_with: String
  languageCode_not_starts_with: String
  languageCode_ends_with: String
  languageCode_not_ends_with: String
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
  textDirection: String
  textDirection_not: String
  textDirection_in: [String!]
  textDirection_not_in: [String!]
  textDirection_lt: String
  textDirection_lte: String
  textDirection_gt: String
  textDirection_gte: String
  textDirection_contains: String
  textDirection_not_contains: String
  textDirection_starts_with: String
  textDirection_not_starts_with: String
  textDirection_ends_with: String
  textDirection_not_ends_with: String
  displayName: String
  displayName_not: String
  displayName_in: [String!]
  displayName_not_in: [String!]
  displayName_lt: String
  displayName_lte: String
  displayName_gt: String
  displayName_gte: String
  displayName_contains: String
  displayName_not_contains: String
  displayName_starts_with: String
  displayName_not_starts_with: String
  displayName_ends_with: String
  displayName_not_ends_with: String
  nativeName: String
  nativeName_not: String
  nativeName_in: [String!]
  nativeName_not_in: [String!]
  nativeName_lt: String
  nativeName_lte: String
  nativeName_gt: String
  nativeName_gte: String
  nativeName_contains: String
  nativeName_not_contains: String
  nativeName_starts_with: String
  nativeName_not_starts_with: String
  nativeName_ends_with: String
  nativeName_not_ends_with: String
  AND: [LanguageWhereInput!]
  OR: [LanguageWhereInput!]
  NOT: [LanguageWhereInput!]
}

input LanguageWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createCategory(data: CategoryCreateInput!): Category!
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  updateManyCategories(data: CategoryUpdateManyMutationInput!, where: CategoryWhereInput): BatchPayload!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
  createDimensions(data: DimensionsCreateInput!): Dimensions!
  updateDimensions(data: DimensionsUpdateInput!, where: DimensionsWhereUniqueInput!): Dimensions
  updateManyDimensionses(data: DimensionsUpdateManyMutationInput!, where: DimensionsWhereInput): BatchPayload!
  upsertDimensions(where: DimensionsWhereUniqueInput!, create: DimensionsCreateInput!, update: DimensionsUpdateInput!): Dimensions!
  deleteDimensions(where: DimensionsWhereUniqueInput!): Dimensions
  deleteManyDimensionses(where: DimensionsWhereInput): BatchPayload!
  createImageFile(data: ImageFileCreateInput!): ImageFile!
  updateImageFile(data: ImageFileUpdateInput!, where: ImageFileWhereUniqueInput!): ImageFile
  updateManyImageFiles(data: ImageFileUpdateManyMutationInput!, where: ImageFileWhereInput): BatchPayload!
  upsertImageFile(where: ImageFileWhereUniqueInput!, create: ImageFileCreateInput!, update: ImageFileUpdateInput!): ImageFile!
  deleteImageFile(where: ImageFileWhereUniqueInput!): ImageFile
  deleteManyImageFiles(where: ImageFileWhereInput): BatchPayload!
  createImageUse(data: ImageUseCreateInput!): ImageUse!
  updateImageUse(data: ImageUseUpdateInput!, where: ImageUseWhereUniqueInput!): ImageUse
  updateManyImageUses(data: ImageUseUpdateManyMutationInput!, where: ImageUseWhereInput): BatchPayload!
  upsertImageUse(where: ImageUseWhereUniqueInput!, create: ImageUseCreateInput!, update: ImageUseUpdateInput!): ImageUse!
  deleteImageUse(where: ImageUseWhereUniqueInput!): ImageUse
  deleteManyImageUses(where: ImageUseWhereInput): BatchPayload!
  createLanguage(data: LanguageCreateInput!): Language!
  updateLanguage(data: LanguageUpdateInput!, where: LanguageWhereUniqueInput!): Language
  updateManyLanguages(data: LanguageUpdateManyMutationInput!, where: LanguageWhereInput): BatchPayload!
  upsertLanguage(where: LanguageWhereUniqueInput!, create: LanguageCreateInput!, update: LanguageUpdateInput!): Language!
  deleteLanguage(where: LanguageWhereUniqueInput!): Language
  deleteManyLanguages(where: LanguageWhereInput): BatchPayload!
  createSupportFile(data: SupportFileCreateInput!): SupportFile!
  updateSupportFile(data: SupportFileUpdateInput!, where: SupportFileWhereUniqueInput!): SupportFile
  updateManySupportFiles(data: SupportFileUpdateManyMutationInput!, where: SupportFileWhereInput): BatchPayload!
  upsertSupportFile(where: SupportFileWhereUniqueInput!, create: SupportFileCreateInput!, update: SupportFileUpdateInput!): SupportFile!
  deleteSupportFile(where: SupportFileWhereUniqueInput!): SupportFile
  deleteManySupportFiles(where: SupportFileWhereInput): BatchPayload!
  createTag(data: TagCreateInput!): Tag!
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateManyTags(data: TagUpdateManyMutationInput!, where: TagWhereInput): BatchPayload!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteManyTags(where: TagWhereInput): BatchPayload!
  createTeam(data: TeamCreateInput!): Team!
  updateTeam(data: TeamUpdateInput!, where: TeamWhereUniqueInput!): Team
  updateManyTeams(data: TeamUpdateManyMutationInput!, where: TeamWhereInput): BatchPayload!
  upsertTeam(where: TeamWhereUniqueInput!, create: TeamCreateInput!, update: TeamUpdateInput!): Team!
  deleteTeam(where: TeamWhereUniqueInput!): Team
  deleteManyTeams(where: TeamWhereInput): BatchPayload!
  createThumbnail(data: ThumbnailCreateInput!): Thumbnail!
  updateThumbnail(data: ThumbnailUpdateInput!, where: ThumbnailWhereUniqueInput!): Thumbnail
  updateManyThumbnails(data: ThumbnailUpdateManyMutationInput!, where: ThumbnailWhereInput): BatchPayload!
  upsertThumbnail(where: ThumbnailWhereUniqueInput!, create: ThumbnailCreateInput!, update: ThumbnailUpdateInput!): Thumbnail!
  deleteThumbnail(where: ThumbnailWhereUniqueInput!): Thumbnail
  deleteManyThumbnails(where: ThumbnailWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideoFile(data: VideoFileCreateInput!): VideoFile!
  updateVideoFile(data: VideoFileUpdateInput!, where: VideoFileWhereUniqueInput!): VideoFile
  updateManyVideoFiles(data: VideoFileUpdateManyMutationInput!, where: VideoFileWhereInput): BatchPayload!
  upsertVideoFile(where: VideoFileWhereUniqueInput!, create: VideoFileCreateInput!, update: VideoFileUpdateInput!): VideoFile!
  deleteVideoFile(where: VideoFileWhereUniqueInput!): VideoFile
  deleteManyVideoFiles(where: VideoFileWhereInput): BatchPayload!
  createVideoProject(data: VideoProjectCreateInput!): VideoProject!
  updateVideoProject(data: VideoProjectUpdateInput!, where: VideoProjectWhereUniqueInput!): VideoProject
  updateManyVideoProjects(data: VideoProjectUpdateManyMutationInput!, where: VideoProjectWhereInput): BatchPayload!
  upsertVideoProject(where: VideoProjectWhereUniqueInput!, create: VideoProjectCreateInput!, update: VideoProjectUpdateInput!): VideoProject!
  deleteVideoProject(where: VideoProjectWhereUniqueInput!): VideoProject
  deleteManyVideoProjects(where: VideoProjectWhereInput): BatchPayload!
  createVideoStream(data: VideoStreamCreateInput!): VideoStream!
  updateVideoStream(data: VideoStreamUpdateInput!, where: VideoStreamWhereUniqueInput!): VideoStream
  updateManyVideoStreams(data: VideoStreamUpdateManyMutationInput!, where: VideoStreamWhereInput): BatchPayload!
  upsertVideoStream(where: VideoStreamWhereUniqueInput!, create: VideoStreamCreateInput!, update: VideoStreamUpdateInput!): VideoStream!
  deleteVideoStream(where: VideoStreamWhereUniqueInput!): VideoStream
  deleteManyVideoStreams(where: VideoStreamWhereInput): BatchPayload!
  createVideoUnit(data: VideoUnitCreateInput!): VideoUnit!
  updateVideoUnit(data: VideoUnitUpdateInput!, where: VideoUnitWhereUniqueInput!): VideoUnit
  updateManyVideoUnits(data: VideoUnitUpdateManyMutationInput!, where: VideoUnitWhereInput): BatchPayload!
  upsertVideoUnit(where: VideoUnitWhereUniqueInput!, create: VideoUnitCreateInput!, update: VideoUnitUpdateInput!): VideoUnit!
  deleteVideoUnit(where: VideoUnitWhereUniqueInput!): VideoUnit
  deleteManyVideoUnits(where: VideoUnitWhereInput): BatchPayload!
  createVideoUse(data: VideoUseCreateInput!): VideoUse!
  updateVideoUse(data: VideoUseUpdateInput!, where: VideoUseWhereUniqueInput!): VideoUse
  updateManyVideoUses(data: VideoUseUpdateManyMutationInput!, where: VideoUseWhereInput): BatchPayload!
  upsertVideoUse(where: VideoUseWhereUniqueInput!, create: VideoUseCreateInput!, update: VideoUseUpdateInput!): VideoUse!
  deleteVideoUse(where: VideoUseWhereUniqueInput!): VideoUse
  deleteManyVideoUses(where: VideoUseWhereInput): BatchPayload!
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

enum ProjectPublishStatus {
  DRAFT
  PUBLISHED
  EMBARGOED
}

enum ProjectVisibility {
  INTERNAL
  PUBLIC
}

type Query {
  category(where: CategoryWhereUniqueInput!): Category
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!
  dimensions(where: DimensionsWhereUniqueInput!): Dimensions
  dimensionses(where: DimensionsWhereInput, orderBy: DimensionsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dimensions]!
  dimensionsesConnection(where: DimensionsWhereInput, orderBy: DimensionsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DimensionsConnection!
  imageFile(where: ImageFileWhereUniqueInput!): ImageFile
  imageFiles(where: ImageFileWhereInput, orderBy: ImageFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ImageFile]!
  imageFilesConnection(where: ImageFileWhereInput, orderBy: ImageFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageFileConnection!
  imageUse(where: ImageUseWhereUniqueInput!): ImageUse
  imageUses(where: ImageUseWhereInput, orderBy: ImageUseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ImageUse]!
  imageUsesConnection(where: ImageUseWhereInput, orderBy: ImageUseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageUseConnection!
  language(where: LanguageWhereUniqueInput!): Language
  languages(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Language]!
  languagesConnection(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LanguageConnection!
  supportFile(where: SupportFileWhereUniqueInput!): SupportFile
  supportFiles(where: SupportFileWhereInput, orderBy: SupportFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SupportFile]!
  supportFilesConnection(where: SupportFileWhereInput, orderBy: SupportFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SupportFileConnection!
  tag(where: TagWhereUniqueInput!): Tag
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  team(where: TeamWhereUniqueInput!): Team
  teams(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Team]!
  teamsConnection(where: TeamWhereInput, orderBy: TeamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TeamConnection!
  thumbnail(where: ThumbnailWhereUniqueInput!): Thumbnail
  thumbnails(where: ThumbnailWhereInput, orderBy: ThumbnailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thumbnail]!
  thumbnailsConnection(where: ThumbnailWhereInput, orderBy: ThumbnailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThumbnailConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  videoFile(where: VideoFileWhereUniqueInput!): VideoFile
  videoFiles(where: VideoFileWhereInput, orderBy: VideoFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoFile]!
  videoFilesConnection(where: VideoFileWhereInput, orderBy: VideoFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoFileConnection!
  videoProject(where: VideoProjectWhereUniqueInput!): VideoProject
  videoProjects(where: VideoProjectWhereInput, orderBy: VideoProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoProject]!
  videoProjectsConnection(where: VideoProjectWhereInput, orderBy: VideoProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoProjectConnection!
  videoStream(where: VideoStreamWhereUniqueInput!): VideoStream
  videoStreams(where: VideoStreamWhereInput, orderBy: VideoStreamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoStream]!
  videoStreamsConnection(where: VideoStreamWhereInput, orderBy: VideoStreamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoStreamConnection!
  videoUnit(where: VideoUnitWhereUniqueInput!): VideoUnit
  videoUnits(where: VideoUnitWhereInput, orderBy: VideoUnitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUnit]!
  videoUnitsConnection(where: VideoUnitWhereInput, orderBy: VideoUnitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUnitConnection!
  videoUse(where: VideoUseWhereUniqueInput!): VideoUse
  videoUses(where: VideoUseWhereInput, orderBy: VideoUseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUse]!
  videoUsesConnection(where: VideoUseWhereInput, orderBy: VideoUseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUseConnection!
  node(id: ID!): Node
}

type Subscription {
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
  dimensions(where: DimensionsSubscriptionWhereInput): DimensionsSubscriptionPayload
  imageFile(where: ImageFileSubscriptionWhereInput): ImageFileSubscriptionPayload
  imageUse(where: ImageUseSubscriptionWhereInput): ImageUseSubscriptionPayload
  language(where: LanguageSubscriptionWhereInput): LanguageSubscriptionPayload
  supportFile(where: SupportFileSubscriptionWhereInput): SupportFileSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  team(where: TeamSubscriptionWhereInput): TeamSubscriptionPayload
  thumbnail(where: ThumbnailSubscriptionWhereInput): ThumbnailSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  videoFile(where: VideoFileSubscriptionWhereInput): VideoFileSubscriptionPayload
  videoProject(where: VideoProjectSubscriptionWhereInput): VideoProjectSubscriptionPayload
  videoStream(where: VideoStreamSubscriptionWhereInput): VideoStreamSubscriptionPayload
  videoUnit(where: VideoUnitSubscriptionWhereInput): VideoUnitSubscriptionPayload
  videoUse(where: VideoUseSubscriptionWhereInput): VideoUseSubscriptionPayload
}

type SupportFile {
  id: ID!
  language: Language!
  url: String
  md5: String
  filename: String
  filetype: String
}

type SupportFileConnection {
  pageInfo: PageInfo!
  edges: [SupportFileEdge]!
  aggregate: AggregateSupportFile!
}

input SupportFileCreateInput {
  language: LanguageCreateOneInput!
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileCreateManyInput {
  create: [SupportFileCreateInput!]
  connect: [SupportFileWhereUniqueInput!]
}

type SupportFileEdge {
  node: SupportFile!
  cursor: String!
}

enum SupportFileOrderByInput {
  id_ASC
  id_DESC
  url_ASC
  url_DESC
  md5_ASC
  md5_DESC
  filename_ASC
  filename_DESC
  filetype_ASC
  filetype_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SupportFilePreviousValues {
  id: ID!
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileScalarWhereInput {
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
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  AND: [SupportFileScalarWhereInput!]
  OR: [SupportFileScalarWhereInput!]
  NOT: [SupportFileScalarWhereInput!]
}

type SupportFileSubscriptionPayload {
  mutation: MutationType!
  node: SupportFile
  updatedFields: [String!]
  previousValues: SupportFilePreviousValues
}

input SupportFileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SupportFileWhereInput
  AND: [SupportFileSubscriptionWhereInput!]
  OR: [SupportFileSubscriptionWhereInput!]
  NOT: [SupportFileSubscriptionWhereInput!]
}

input SupportFileUpdateDataInput {
  language: LanguageUpdateOneRequiredInput
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileUpdateInput {
  language: LanguageUpdateOneRequiredInput
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileUpdateManyDataInput {
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileUpdateManyInput {
  create: [SupportFileCreateInput!]
  update: [SupportFileUpdateWithWhereUniqueNestedInput!]
  upsert: [SupportFileUpsertWithWhereUniqueNestedInput!]
  delete: [SupportFileWhereUniqueInput!]
  connect: [SupportFileWhereUniqueInput!]
  disconnect: [SupportFileWhereUniqueInput!]
  deleteMany: [SupportFileScalarWhereInput!]
  updateMany: [SupportFileUpdateManyWithWhereNestedInput!]
}

input SupportFileUpdateManyMutationInput {
  url: String
  md5: String
  filename: String
  filetype: String
}

input SupportFileUpdateManyWithWhereNestedInput {
  where: SupportFileScalarWhereInput!
  data: SupportFileUpdateManyDataInput!
}

input SupportFileUpdateWithWhereUniqueNestedInput {
  where: SupportFileWhereUniqueInput!
  data: SupportFileUpdateDataInput!
}

input SupportFileUpsertWithWhereUniqueNestedInput {
  where: SupportFileWhereUniqueInput!
  update: SupportFileUpdateDataInput!
  create: SupportFileCreateInput!
}

input SupportFileWhereInput {
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
  language: LanguageWhereInput
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  AND: [SupportFileWhereInput!]
  OR: [SupportFileWhereInput!]
  NOT: [SupportFileWhereInput!]
}

input SupportFileWhereUniqueInput {
  id: ID
}

type Tag {
  id: ID!
  name: String!
  language: Language!
}

type TagConnection {
  pageInfo: PageInfo!
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  name: String!
  language: LanguageCreateOneInput!
}

input TagCreateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
}

type TagEdge {
  node: Tag!
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TagPreviousValues {
  id: ID!
  name: String!
}

input TagScalarWhereInput {
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
  AND: [TagScalarWhereInput!]
  OR: [TagScalarWhereInput!]
  NOT: [TagScalarWhereInput!]
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TagWhereInput
  AND: [TagSubscriptionWhereInput!]
  OR: [TagSubscriptionWhereInput!]
  NOT: [TagSubscriptionWhereInput!]
}

input TagUpdateDataInput {
  name: String
  language: LanguageUpdateOneRequiredInput
}

input TagUpdateInput {
  name: String
  language: LanguageUpdateOneRequiredInput
}

input TagUpdateManyDataInput {
  name: String
}

input TagUpdateManyInput {
  create: [TagCreateInput!]
  update: [TagUpdateWithWhereUniqueNestedInput!]
  upsert: [TagUpsertWithWhereUniqueNestedInput!]
  delete: [TagWhereUniqueInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  deleteMany: [TagScalarWhereInput!]
  updateMany: [TagUpdateManyWithWhereNestedInput!]
}

input TagUpdateManyMutationInput {
  name: String
}

input TagUpdateManyWithWhereNestedInput {
  where: TagScalarWhereInput!
  data: TagUpdateManyDataInput!
}

input TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  data: TagUpdateDataInput!
}

input TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
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
  language: LanguageWhereInput
  AND: [TagWhereInput!]
  OR: [TagWhereInput!]
  NOT: [TagWhereInput!]
}

input TagWhereUniqueInput {
  id: ID
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

input TeamCreateOneInput {
  create: TeamCreateInput
  connect: TeamWhereUniqueInput
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

input TeamUpdateDataInput {
  name: String
  organization: String
  members: UserUpdateManyWithoutTeamInput
  contentTypes: TeamUpdatecontentTypesInput
  isConfirmed: Boolean
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

input TeamUpdateOneInput {
  create: TeamCreateInput
  update: TeamUpdateDataInput
  upsert: TeamUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: TeamWhereUniqueInput
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

input TeamUpsertNestedInput {
  update: TeamUpdateDataInput!
  create: TeamCreateInput!
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

type Thumbnail {
  id: ID!
  size: ThumbnailSize
  image: ImageFile
}

type ThumbnailConnection {
  pageInfo: PageInfo!
  edges: [ThumbnailEdge]!
  aggregate: AggregateThumbnail!
}

input ThumbnailCreateInput {
  size: ThumbnailSize
  image: ImageFileCreateOneInput
}

input ThumbnailCreateManyInput {
  create: [ThumbnailCreateInput!]
  connect: [ThumbnailWhereUniqueInput!]
}

type ThumbnailEdge {
  node: Thumbnail!
  cursor: String!
}

enum ThumbnailOrderByInput {
  id_ASC
  id_DESC
  size_ASC
  size_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ThumbnailPreviousValues {
  id: ID!
  size: ThumbnailSize
}

input ThumbnailScalarWhereInput {
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
  size: ThumbnailSize
  size_not: ThumbnailSize
  size_in: [ThumbnailSize!]
  size_not_in: [ThumbnailSize!]
  AND: [ThumbnailScalarWhereInput!]
  OR: [ThumbnailScalarWhereInput!]
  NOT: [ThumbnailScalarWhereInput!]
}

enum ThumbnailSize {
  SMALL
  MEDIUM
  LARGE
  FULL
}

type ThumbnailSubscriptionPayload {
  mutation: MutationType!
  node: Thumbnail
  updatedFields: [String!]
  previousValues: ThumbnailPreviousValues
}

input ThumbnailSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThumbnailWhereInput
  AND: [ThumbnailSubscriptionWhereInput!]
  OR: [ThumbnailSubscriptionWhereInput!]
  NOT: [ThumbnailSubscriptionWhereInput!]
}

input ThumbnailUpdateDataInput {
  size: ThumbnailSize
  image: ImageFileUpdateOneInput
}

input ThumbnailUpdateInput {
  size: ThumbnailSize
  image: ImageFileUpdateOneInput
}

input ThumbnailUpdateManyDataInput {
  size: ThumbnailSize
}

input ThumbnailUpdateManyInput {
  create: [ThumbnailCreateInput!]
  update: [ThumbnailUpdateWithWhereUniqueNestedInput!]
  upsert: [ThumbnailUpsertWithWhereUniqueNestedInput!]
  delete: [ThumbnailWhereUniqueInput!]
  connect: [ThumbnailWhereUniqueInput!]
  disconnect: [ThumbnailWhereUniqueInput!]
  deleteMany: [ThumbnailScalarWhereInput!]
  updateMany: [ThumbnailUpdateManyWithWhereNestedInput!]
}

input ThumbnailUpdateManyMutationInput {
  size: ThumbnailSize
}

input ThumbnailUpdateManyWithWhereNestedInput {
  where: ThumbnailScalarWhereInput!
  data: ThumbnailUpdateManyDataInput!
}

input ThumbnailUpdateWithWhereUniqueNestedInput {
  where: ThumbnailWhereUniqueInput!
  data: ThumbnailUpdateDataInput!
}

input ThumbnailUpsertWithWhereUniqueNestedInput {
  where: ThumbnailWhereUniqueInput!
  update: ThumbnailUpdateDataInput!
  create: ThumbnailCreateInput!
}

input ThumbnailWhereInput {
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
  size: ThumbnailSize
  size_not: ThumbnailSize
  size_in: [ThumbnailSize!]
  size_not_in: [ThumbnailSize!]
  image: ImageFileWhereInput
  AND: [ThumbnailWhereInput!]
  OR: [ThumbnailWhereInput!]
  NOT: [ThumbnailWhereInput!]
}

input ThumbnailWhereUniqueInput {
  id: ID
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

enum VideoBurnedInStatus {
  SUBTITLED
  CAPTIONED
  CLEAN
}

type VideoFile {
  id: ID!
  language: Language
  filetype: String
  filename: String
  use: VideoUse
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
  dimensions: Dimensions
  stream: VideoStream
}

type VideoFileConnection {
  pageInfo: PageInfo!
  edges: [VideoFileEdge]!
  aggregate: AggregateVideoFile!
}

input VideoFileCreateInput {
  language: LanguageCreateOneInput
  filetype: String
  filename: String
  use: VideoUseCreateOneInput
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
  dimensions: DimensionsCreateOneInput
  stream: VideoStreamCreateOneInput
}

input VideoFileCreateManyInput {
  create: [VideoFileCreateInput!]
  connect: [VideoFileWhereUniqueInput!]
}

type VideoFileEdge {
  node: VideoFile!
  cursor: String!
}

enum VideoFileOrderByInput {
  id_ASC
  id_DESC
  filetype_ASC
  filetype_DESC
  filename_ASC
  filename_DESC
  quality_ASC
  quality_DESC
  videoBurnedInStatus_ASC
  videoBurnedInStatus_DESC
  url_ASC
  url_DESC
  md5_ASC
  md5_DESC
  duration_ASC
  duration_DESC
  bitrate_ASC
  bitrate_DESC
  filesize_ASC
  filesize_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoFilePreviousValues {
  id: ID!
  filetype: String
  filename: String
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
}

input VideoFileScalarWhereInput {
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
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  quality: VideoQuality
  quality_not: VideoQuality
  quality_in: [VideoQuality!]
  quality_not_in: [VideoQuality!]
  videoBurnedInStatus: VideoBurnedInStatus
  videoBurnedInStatus_not: VideoBurnedInStatus
  videoBurnedInStatus_in: [VideoBurnedInStatus!]
  videoBurnedInStatus_not_in: [VideoBurnedInStatus!]
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  duration: Float
  duration_not: Float
  duration_in: [Float!]
  duration_not_in: [Float!]
  duration_lt: Float
  duration_lte: Float
  duration_gt: Float
  duration_gte: Float
  bitrate: Float
  bitrate_not: Float
  bitrate_in: [Float!]
  bitrate_not_in: [Float!]
  bitrate_lt: Float
  bitrate_lte: Float
  bitrate_gt: Float
  bitrate_gte: Float
  filesize: Float
  filesize_not: Float
  filesize_in: [Float!]
  filesize_not_in: [Float!]
  filesize_lt: Float
  filesize_lte: Float
  filesize_gt: Float
  filesize_gte: Float
  AND: [VideoFileScalarWhereInput!]
  OR: [VideoFileScalarWhereInput!]
  NOT: [VideoFileScalarWhereInput!]
}

type VideoFileSubscriptionPayload {
  mutation: MutationType!
  node: VideoFile
  updatedFields: [String!]
  previousValues: VideoFilePreviousValues
}

input VideoFileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoFileWhereInput
  AND: [VideoFileSubscriptionWhereInput!]
  OR: [VideoFileSubscriptionWhereInput!]
  NOT: [VideoFileSubscriptionWhereInput!]
}

input VideoFileUpdateDataInput {
  language: LanguageUpdateOneInput
  filetype: String
  filename: String
  use: VideoUseUpdateOneInput
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
  dimensions: DimensionsUpdateOneInput
  stream: VideoStreamUpdateOneInput
}

input VideoFileUpdateInput {
  language: LanguageUpdateOneInput
  filetype: String
  filename: String
  use: VideoUseUpdateOneInput
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
  dimensions: DimensionsUpdateOneInput
  stream: VideoStreamUpdateOneInput
}

input VideoFileUpdateManyDataInput {
  filetype: String
  filename: String
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
}

input VideoFileUpdateManyInput {
  create: [VideoFileCreateInput!]
  update: [VideoFileUpdateWithWhereUniqueNestedInput!]
  upsert: [VideoFileUpsertWithWhereUniqueNestedInput!]
  delete: [VideoFileWhereUniqueInput!]
  connect: [VideoFileWhereUniqueInput!]
  disconnect: [VideoFileWhereUniqueInput!]
  deleteMany: [VideoFileScalarWhereInput!]
  updateMany: [VideoFileUpdateManyWithWhereNestedInput!]
}

input VideoFileUpdateManyMutationInput {
  filetype: String
  filename: String
  quality: VideoQuality
  videoBurnedInStatus: VideoBurnedInStatus
  url: String
  md5: String
  duration: Float
  bitrate: Float
  filesize: Float
}

input VideoFileUpdateManyWithWhereNestedInput {
  where: VideoFileScalarWhereInput!
  data: VideoFileUpdateManyDataInput!
}

input VideoFileUpdateWithWhereUniqueNestedInput {
  where: VideoFileWhereUniqueInput!
  data: VideoFileUpdateDataInput!
}

input VideoFileUpsertWithWhereUniqueNestedInput {
  where: VideoFileWhereUniqueInput!
  update: VideoFileUpdateDataInput!
  create: VideoFileCreateInput!
}

input VideoFileWhereInput {
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
  language: LanguageWhereInput
  filetype: String
  filetype_not: String
  filetype_in: [String!]
  filetype_not_in: [String!]
  filetype_lt: String
  filetype_lte: String
  filetype_gt: String
  filetype_gte: String
  filetype_contains: String
  filetype_not_contains: String
  filetype_starts_with: String
  filetype_not_starts_with: String
  filetype_ends_with: String
  filetype_not_ends_with: String
  filename: String
  filename_not: String
  filename_in: [String!]
  filename_not_in: [String!]
  filename_lt: String
  filename_lte: String
  filename_gt: String
  filename_gte: String
  filename_contains: String
  filename_not_contains: String
  filename_starts_with: String
  filename_not_starts_with: String
  filename_ends_with: String
  filename_not_ends_with: String
  use: VideoUseWhereInput
  quality: VideoQuality
  quality_not: VideoQuality
  quality_in: [VideoQuality!]
  quality_not_in: [VideoQuality!]
  videoBurnedInStatus: VideoBurnedInStatus
  videoBurnedInStatus_not: VideoBurnedInStatus
  videoBurnedInStatus_in: [VideoBurnedInStatus!]
  videoBurnedInStatus_not_in: [VideoBurnedInStatus!]
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  md5: String
  md5_not: String
  md5_in: [String!]
  md5_not_in: [String!]
  md5_lt: String
  md5_lte: String
  md5_gt: String
  md5_gte: String
  md5_contains: String
  md5_not_contains: String
  md5_starts_with: String
  md5_not_starts_with: String
  md5_ends_with: String
  md5_not_ends_with: String
  duration: Float
  duration_not: Float
  duration_in: [Float!]
  duration_not_in: [Float!]
  duration_lt: Float
  duration_lte: Float
  duration_gt: Float
  duration_gte: Float
  bitrate: Float
  bitrate_not: Float
  bitrate_in: [Float!]
  bitrate_not_in: [Float!]
  bitrate_lt: Float
  bitrate_lte: Float
  bitrate_gt: Float
  bitrate_gte: Float
  filesize: Float
  filesize_not: Float
  filesize_in: [Float!]
  filesize_not_in: [Float!]
  filesize_lt: Float
  filesize_lte: Float
  filesize_gt: Float
  filesize_gte: Float
  dimensions: DimensionsWhereInput
  stream: VideoStreamWhereInput
  AND: [VideoFileWhereInput!]
  OR: [VideoFileWhereInput!]
  NOT: [VideoFileWhereInput!]
}

input VideoFileWhereUniqueInput {
  id: ID
}

type VideoProject {
  id: ID!
  projectType: String!
  projectTitle: String!
  descPublic: String
  descInternal: String
  author: String
  team: Team
  status: ProjectPublishStatus
  visibility: ProjectVisibility
  units(where: VideoUnitWhereInput, orderBy: VideoUnitOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUnit!]
  supportFiles(where: SupportFileWhereInput, orderBy: SupportFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SupportFile!]
  thumbnails(where: ImageFileWhereInput, orderBy: ImageFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ImageFile!]
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category!]
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
}

type VideoProjectConnection {
  pageInfo: PageInfo!
  edges: [VideoProjectEdge]!
  aggregate: AggregateVideoProject!
}

input VideoProjectCreateInput {
  projectType: String!
  projectTitle: String!
  descPublic: String
  descInternal: String
  author: String
  team: TeamCreateOneInput
  status: ProjectPublishStatus
  visibility: ProjectVisibility
  units: VideoUnitCreateManyInput
  supportFiles: SupportFileCreateManyInput
  thumbnails: ImageFileCreateManyInput
  categories: CategoryCreateManyInput
  tags: TagCreateManyInput
}

type VideoProjectEdge {
  node: VideoProject!
  cursor: String!
}

enum VideoProjectOrderByInput {
  id_ASC
  id_DESC
  projectType_ASC
  projectType_DESC
  projectTitle_ASC
  projectTitle_DESC
  descPublic_ASC
  descPublic_DESC
  descInternal_ASC
  descInternal_DESC
  author_ASC
  author_DESC
  status_ASC
  status_DESC
  visibility_ASC
  visibility_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoProjectPreviousValues {
  id: ID!
  projectType: String!
  projectTitle: String!
  descPublic: String
  descInternal: String
  author: String
  status: ProjectPublishStatus
  visibility: ProjectVisibility
}

type VideoProjectSubscriptionPayload {
  mutation: MutationType!
  node: VideoProject
  updatedFields: [String!]
  previousValues: VideoProjectPreviousValues
}

input VideoProjectSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoProjectWhereInput
  AND: [VideoProjectSubscriptionWhereInput!]
  OR: [VideoProjectSubscriptionWhereInput!]
  NOT: [VideoProjectSubscriptionWhereInput!]
}

input VideoProjectUpdateInput {
  projectType: String
  projectTitle: String
  descPublic: String
  descInternal: String
  author: String
  team: TeamUpdateOneInput
  status: ProjectPublishStatus
  visibility: ProjectVisibility
  units: VideoUnitUpdateManyInput
  supportFiles: SupportFileUpdateManyInput
  thumbnails: ImageFileUpdateManyInput
  categories: CategoryUpdateManyInput
  tags: TagUpdateManyInput
}

input VideoProjectUpdateManyMutationInput {
  projectType: String
  projectTitle: String
  descPublic: String
  descInternal: String
  author: String
  status: ProjectPublishStatus
  visibility: ProjectVisibility
}

input VideoProjectWhereInput {
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
  projectType: String
  projectType_not: String
  projectType_in: [String!]
  projectType_not_in: [String!]
  projectType_lt: String
  projectType_lte: String
  projectType_gt: String
  projectType_gte: String
  projectType_contains: String
  projectType_not_contains: String
  projectType_starts_with: String
  projectType_not_starts_with: String
  projectType_ends_with: String
  projectType_not_ends_with: String
  projectTitle: String
  projectTitle_not: String
  projectTitle_in: [String!]
  projectTitle_not_in: [String!]
  projectTitle_lt: String
  projectTitle_lte: String
  projectTitle_gt: String
  projectTitle_gte: String
  projectTitle_contains: String
  projectTitle_not_contains: String
  projectTitle_starts_with: String
  projectTitle_not_starts_with: String
  projectTitle_ends_with: String
  projectTitle_not_ends_with: String
  descPublic: String
  descPublic_not: String
  descPublic_in: [String!]
  descPublic_not_in: [String!]
  descPublic_lt: String
  descPublic_lte: String
  descPublic_gt: String
  descPublic_gte: String
  descPublic_contains: String
  descPublic_not_contains: String
  descPublic_starts_with: String
  descPublic_not_starts_with: String
  descPublic_ends_with: String
  descPublic_not_ends_with: String
  descInternal: String
  descInternal_not: String
  descInternal_in: [String!]
  descInternal_not_in: [String!]
  descInternal_lt: String
  descInternal_lte: String
  descInternal_gt: String
  descInternal_gte: String
  descInternal_contains: String
  descInternal_not_contains: String
  descInternal_starts_with: String
  descInternal_not_starts_with: String
  descInternal_ends_with: String
  descInternal_not_ends_with: String
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
  team: TeamWhereInput
  status: ProjectPublishStatus
  status_not: ProjectPublishStatus
  status_in: [ProjectPublishStatus!]
  status_not_in: [ProjectPublishStatus!]
  visibility: ProjectVisibility
  visibility_not: ProjectVisibility
  visibility_in: [ProjectVisibility!]
  visibility_not_in: [ProjectVisibility!]
  units_every: VideoUnitWhereInput
  units_some: VideoUnitWhereInput
  units_none: VideoUnitWhereInput
  supportFiles_every: SupportFileWhereInput
  supportFiles_some: SupportFileWhereInput
  supportFiles_none: SupportFileWhereInput
  thumbnails_every: ImageFileWhereInput
  thumbnails_some: ImageFileWhereInput
  thumbnails_none: ImageFileWhereInput
  categories_every: CategoryWhereInput
  categories_some: CategoryWhereInput
  categories_none: CategoryWhereInput
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
  AND: [VideoProjectWhereInput!]
  OR: [VideoProjectWhereInput!]
  NOT: [VideoProjectWhereInput!]
}

input VideoProjectWhereUniqueInput {
  id: ID
}

enum VideoQuality {
  WEB
  BROADCAST
}

type VideoStream {
  id: ID!
  site: String
  url: String
  embedUrl: String
}

type VideoStreamConnection {
  pageInfo: PageInfo!
  edges: [VideoStreamEdge]!
  aggregate: AggregateVideoStream!
}

input VideoStreamCreateInput {
  site: String
  url: String
  embedUrl: String
}

input VideoStreamCreateOneInput {
  create: VideoStreamCreateInput
  connect: VideoStreamWhereUniqueInput
}

type VideoStreamEdge {
  node: VideoStream!
  cursor: String!
}

enum VideoStreamOrderByInput {
  id_ASC
  id_DESC
  site_ASC
  site_DESC
  url_ASC
  url_DESC
  embedUrl_ASC
  embedUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoStreamPreviousValues {
  id: ID!
  site: String
  url: String
  embedUrl: String
}

type VideoStreamSubscriptionPayload {
  mutation: MutationType!
  node: VideoStream
  updatedFields: [String!]
  previousValues: VideoStreamPreviousValues
}

input VideoStreamSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoStreamWhereInput
  AND: [VideoStreamSubscriptionWhereInput!]
  OR: [VideoStreamSubscriptionWhereInput!]
  NOT: [VideoStreamSubscriptionWhereInput!]
}

input VideoStreamUpdateDataInput {
  site: String
  url: String
  embedUrl: String
}

input VideoStreamUpdateInput {
  site: String
  url: String
  embedUrl: String
}

input VideoStreamUpdateManyMutationInput {
  site: String
  url: String
  embedUrl: String
}

input VideoStreamUpdateOneInput {
  create: VideoStreamCreateInput
  update: VideoStreamUpdateDataInput
  upsert: VideoStreamUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoStreamWhereUniqueInput
}

input VideoStreamUpsertNestedInput {
  update: VideoStreamUpdateDataInput!
  create: VideoStreamCreateInput!
}

input VideoStreamWhereInput {
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
  site: String
  site_not: String
  site_in: [String!]
  site_not_in: [String!]
  site_lt: String
  site_lte: String
  site_gt: String
  site_gte: String
  site_contains: String
  site_not_contains: String
  site_starts_with: String
  site_not_starts_with: String
  site_ends_with: String
  site_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  embedUrl: String
  embedUrl_not: String
  embedUrl_in: [String!]
  embedUrl_not_in: [String!]
  embedUrl_lt: String
  embedUrl_lte: String
  embedUrl_gt: String
  embedUrl_gte: String
  embedUrl_contains: String
  embedUrl_not_contains: String
  embedUrl_starts_with: String
  embedUrl_not_starts_with: String
  embedUrl_ends_with: String
  embedUrl_not_ends_with: String
  AND: [VideoStreamWhereInput!]
  OR: [VideoStreamWhereInput!]
  NOT: [VideoStreamWhereInput!]
}

input VideoStreamWhereUniqueInput {
  id: ID
}

type VideoUnit {
  id: ID!
  language: Language
  title: String!
  descPublic: String
  files(where: VideoFileWhereInput, orderBy: VideoFileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoFile!]
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category!]
  thumbnails(where: ThumbnailWhereInput, orderBy: ThumbnailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thumbnail!]
}

type VideoUnitConnection {
  pageInfo: PageInfo!
  edges: [VideoUnitEdge]!
  aggregate: AggregateVideoUnit!
}

input VideoUnitCreateInput {
  language: LanguageCreateOneInput
  title: String!
  descPublic: String
  files: VideoFileCreateManyInput
  tags: TagCreateManyInput
  categories: CategoryCreateManyInput
  thumbnails: ThumbnailCreateManyInput
}

input VideoUnitCreateManyInput {
  create: [VideoUnitCreateInput!]
  connect: [VideoUnitWhereUniqueInput!]
}

type VideoUnitEdge {
  node: VideoUnit!
  cursor: String!
}

enum VideoUnitOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  descPublic_ASC
  descPublic_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoUnitPreviousValues {
  id: ID!
  title: String!
  descPublic: String
}

input VideoUnitScalarWhereInput {
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
  descPublic: String
  descPublic_not: String
  descPublic_in: [String!]
  descPublic_not_in: [String!]
  descPublic_lt: String
  descPublic_lte: String
  descPublic_gt: String
  descPublic_gte: String
  descPublic_contains: String
  descPublic_not_contains: String
  descPublic_starts_with: String
  descPublic_not_starts_with: String
  descPublic_ends_with: String
  descPublic_not_ends_with: String
  AND: [VideoUnitScalarWhereInput!]
  OR: [VideoUnitScalarWhereInput!]
  NOT: [VideoUnitScalarWhereInput!]
}

type VideoUnitSubscriptionPayload {
  mutation: MutationType!
  node: VideoUnit
  updatedFields: [String!]
  previousValues: VideoUnitPreviousValues
}

input VideoUnitSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoUnitWhereInput
  AND: [VideoUnitSubscriptionWhereInput!]
  OR: [VideoUnitSubscriptionWhereInput!]
  NOT: [VideoUnitSubscriptionWhereInput!]
}

input VideoUnitUpdateDataInput {
  language: LanguageUpdateOneInput
  title: String
  descPublic: String
  files: VideoFileUpdateManyInput
  tags: TagUpdateManyInput
  categories: CategoryUpdateManyInput
  thumbnails: ThumbnailUpdateManyInput
}

input VideoUnitUpdateInput {
  language: LanguageUpdateOneInput
  title: String
  descPublic: String
  files: VideoFileUpdateManyInput
  tags: TagUpdateManyInput
  categories: CategoryUpdateManyInput
  thumbnails: ThumbnailUpdateManyInput
}

input VideoUnitUpdateManyDataInput {
  title: String
  descPublic: String
}

input VideoUnitUpdateManyInput {
  create: [VideoUnitCreateInput!]
  update: [VideoUnitUpdateWithWhereUniqueNestedInput!]
  upsert: [VideoUnitUpsertWithWhereUniqueNestedInput!]
  delete: [VideoUnitWhereUniqueInput!]
  connect: [VideoUnitWhereUniqueInput!]
  disconnect: [VideoUnitWhereUniqueInput!]
  deleteMany: [VideoUnitScalarWhereInput!]
  updateMany: [VideoUnitUpdateManyWithWhereNestedInput!]
}

input VideoUnitUpdateManyMutationInput {
  title: String
  descPublic: String
}

input VideoUnitUpdateManyWithWhereNestedInput {
  where: VideoUnitScalarWhereInput!
  data: VideoUnitUpdateManyDataInput!
}

input VideoUnitUpdateWithWhereUniqueNestedInput {
  where: VideoUnitWhereUniqueInput!
  data: VideoUnitUpdateDataInput!
}

input VideoUnitUpsertWithWhereUniqueNestedInput {
  where: VideoUnitWhereUniqueInput!
  update: VideoUnitUpdateDataInput!
  create: VideoUnitCreateInput!
}

input VideoUnitWhereInput {
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
  language: LanguageWhereInput
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
  descPublic: String
  descPublic_not: String
  descPublic_in: [String!]
  descPublic_not_in: [String!]
  descPublic_lt: String
  descPublic_lte: String
  descPublic_gt: String
  descPublic_gte: String
  descPublic_contains: String
  descPublic_not_contains: String
  descPublic_starts_with: String
  descPublic_not_starts_with: String
  descPublic_ends_with: String
  descPublic_not_ends_with: String
  files_every: VideoFileWhereInput
  files_some: VideoFileWhereInput
  files_none: VideoFileWhereInput
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
  categories_every: CategoryWhereInput
  categories_some: CategoryWhereInput
  categories_none: CategoryWhereInput
  thumbnails_every: ThumbnailWhereInput
  thumbnails_some: ThumbnailWhereInput
  thumbnails_none: ThumbnailWhereInput
  AND: [VideoUnitWhereInput!]
  OR: [VideoUnitWhereInput!]
  NOT: [VideoUnitWhereInput!]
}

input VideoUnitWhereUniqueInput {
  id: ID
}

type VideoUse {
  id: ID!
  name: String!
}

type VideoUseConnection {
  pageInfo: PageInfo!
  edges: [VideoUseEdge]!
  aggregate: AggregateVideoUse!
}

input VideoUseCreateInput {
  name: String!
}

input VideoUseCreateOneInput {
  create: VideoUseCreateInput
  connect: VideoUseWhereUniqueInput
}

type VideoUseEdge {
  node: VideoUse!
  cursor: String!
}

enum VideoUseOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoUsePreviousValues {
  id: ID!
  name: String!
}

type VideoUseSubscriptionPayload {
  mutation: MutationType!
  node: VideoUse
  updatedFields: [String!]
  previousValues: VideoUsePreviousValues
}

input VideoUseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoUseWhereInput
  AND: [VideoUseSubscriptionWhereInput!]
  OR: [VideoUseSubscriptionWhereInput!]
  NOT: [VideoUseSubscriptionWhereInput!]
}

input VideoUseUpdateDataInput {
  name: String
}

input VideoUseUpdateInput {
  name: String
}

input VideoUseUpdateManyMutationInput {
  name: String
}

input VideoUseUpdateOneInput {
  create: VideoUseCreateInput
  update: VideoUseUpdateDataInput
  upsert: VideoUseUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoUseWhereUniqueInput
}

input VideoUseUpsertNestedInput {
  update: VideoUseUpdateDataInput!
  create: VideoUseCreateInput!
}

input VideoUseWhereInput {
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
  AND: [VideoUseWhereInput!]
  OR: [VideoUseWhereInput!]
  NOT: [VideoUseWhereInput!]
}

input VideoUseWhereUniqueInput {
  id: ID
}
`
      }
    