import gql from 'graphql-tag';
import {
  LANGUAGE_FRAGMENT,
  LANGUAGE_TRANSLATIONS_FRAGMENT,
  IMAGE_DETAILS_FRAGMENT,
  SUPPORT_FILE_FRAGMENT,
  TEAM_FRAGMENT
} from './shared';

// Fragments
const GRAPHIC_PROJECT_FRAGMENT = gql`
  fragment graphicProjectDetails on GraphicProject {
    id
    createdAt
    updatedAt
    publishedAt
    type
    title
    copyright
    alt
    descPublic
    descInternal
    assetPath
    author {
      id
      firstName
      lastName
      email
    }
    team { ...teamDetails }
    status
    visibility
    supportFiles { ...supportFileDetails }
    images { ...imageDetails }
    categories {
      id
      translations { ...languageTranslationsDetails }
    }
    tags {
      id
      translations { ...languageTranslationsDetails }
    }
  }
  ${LANGUAGE_FRAGMENT}
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
  ${IMAGE_DETAILS_FRAGMENT}
  ${SUPPORT_FILE_FRAGMENT}
  ${TEAM_FRAGMENT}
`;

// GraphicProject
export const GRAPHIC_PROJECTS_QUERY = gql`
  query GraphicProjects {
    graphicProjects {
      ...graphicProjectDetails
    }
  }
  ${GRAPHIC_PROJECT_FRAGMENT}
`;

export const GRAPHIC_PROJECT_QUERY = gql`
  query GraphicProject($id: ID!) {
    graphicProject(id: $id) {
      ...graphicProjectDetails
    }
  }
  ${GRAPHIC_PROJECT_FRAGMENT}
`;

export const CREATE_GRAPHIC_PROJECT_MUTATION = gql`
  mutation CreateGraphicProject($data: GraphicProjectCreateInput!) {
    createGraphicProject(data: $data) {
      ...graphicProjectDetails
    }
  }
  ${GRAPHIC_PROJECT_FRAGMENT}
`;

export const UPDATE_GRAPHIC_PROJECT_MUTATION = gql`
  mutation UpdateGraphicProject(
    $data: GraphicProjectUpdateInput!
    $where: GraphicProjectWhereUniqueInput!
  ) {
    updateGraphicProject(data: $data, where: $where) {
      ...graphicProjectDetails
    }
  }
  ${GRAPHIC_PROJECT_FRAGMENT}
`;

export const UPDATE_MANY_GRAPHIC_PROJECTS_MUTATION = gql`
  mutation UpdateManyGraphicProjects(
    $data: GraphicProjectUpdateManyMutationInput!
    $where: GraphicProjectWhereInput
  ) {
    updateManyGraphicProjects(data: $data, where: $where) {
      count
    }
  }
`;

export const DELETE_GRAPHIC_PROJECT_MUTATION = gql`
  mutation DeleteGraphicProject($id: ID!) {
    deleteGraphicProject(id: $id) {
      ...graphicProjectDetails
    }
  }
  ${GRAPHIC_PROJECT_FRAGMENT}
`;

export const DELETE_MANY_GRAPHIC_PROJECTS_MUTATION = gql`
  mutation DeleteManyGraphicProjects($where: GraphicProjectWhereInput) {
    deleteManyGraphicProjects(where: $where) {
      count
    }
  }
`;

// GraphicStyle
export const GRAPHIC_STYLES_QUERY = gql`
  query GraphicStyles {
    graphicStyles {
      id
      name
    }
  }
`;

export const GRAPHIC_STYLE_QUERY = gql`
  query GraphicStyle($id: ID!) {
    graphicStyle(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_GRAPHIC_STYLE_MUTATION = gql`
  mutation CreateGraphicStyle($data: GraphicStyleCreateInput!) {
    createGraphicStyle(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_GRAPHIC_STYLE_MUTATION = gql`
  mutation UpdateGraphicStyle(
    $data: GraphicStyleUpdateInput!
    $where: GraphicStyleWhereUniqueInput!
  ) {
    updateGraphicStyle(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const UPDATE_MANY_GRAPHIC_STYLES_MUTATION = gql`
  mutation UpdateManyGraphicStyles(
    $data: GraphicStyleUpdateManyMutationInput!
    $where: GraphicStyleWhereInput
  ) {
    updateManyGraphicStyles(data: $data, where: $where) {
      count
    }
  }
`;

export const DELETE_GRAPHIC_STYLE_MUTATION = gql`
  mutation DeleteGraphicStyle($id: ID!) {
    deleteGraphicStyle(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_MANY_GRAPHIC_STYLES_MUTATION = gql`
  mutation DeleteManyGraphicStyles($where: GraphicStyleWhereInput) {
    deleteManyGraphicStyles(where: $where) {
      count
    }
  }
`;

// SocialPlatform
export const SOCIAL_PLATFORMS_QUERY = gql`
  query SocialPlatforms {
    socialPlatforms {
      id
      name
    }
  }
`;

export const SOCIAL_PLATFORM_QUERY = gql`
  query SocialPlatform($id: ID!) {
    socialPlatform(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_SOCIAL_PLATFORM_MUTATION = gql`
  mutation CreateSocialPlatform($data: SocialPlatformCreateInput!) {
    createSocialPlatform(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_SOCIAL_PLATFORM_MUTATION = gql`
  mutation UpdateSocialPlatform(
    $data: SocialPlatformUpdateInput!
    $where: SocialPlatformWhereUniqueInput!
  ) {
    updateSocialPlatform(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const UPDATE_MANY_SOCIAL_PLATFORMS_MUTATION = gql`
  mutation UpdateManySocialPlatforms(
    $data: SocialPlatformUpdateManyMutationInput!
    $where: SocialPlatformWhereInput
  ) {
    updateManySocialPlatforms(data: $data, where: $where) {
      count
    }
  }
`;

export const DELETE_SOCIAL_PLATFORM_MUTATION = gql`
  mutation DeleteSocialPlatform($id: ID!) {
    deleteSocialPlatform(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_MANY_SOCIAL_PLATFORMS_MUTATION = gql`
  mutation DeleteManySocialPlatforms($where: SocialPlatformWhereInput) {
    deleteManySocialPlatforms(where: $where) {
      count
    }
  }
`;
