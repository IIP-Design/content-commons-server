import gql from 'graphql-tag';
import { LANGUAGE_FRAGMENT, LANGUAGE_TRANSLATIONS_FRAGMENT } from './shared';

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const CATEGORY_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const TAG_QUERY = gql`
  query Tag($id: ID!) {
    tag(id: $id) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory(
    $data: CategoryUpdateInput!
    $where: CategoryWhereUniqueInput!
  ) {
    updateCategory(data: $data, where: $where) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($data: TagCreateInput!) {
    createTag(data: $data) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTag(
    $data: TagUpdateInput!
    $where: TagWhereUniqueInput!
  ) {
    updateTag(data: $data, where: $where) {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;
