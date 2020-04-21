import gql from 'graphql-tag';
import { LANGUAGE_FRAGMENT, LANGUAGE_TRANSLATIONS_FRAGMENT } from './shared';

export const LANGUAGES_QUERY = gql`
  query Languages {
    languages {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

export const LANGUAGE_QUERY = gql`
  query Language($id: ID!) {
    language(id: $id) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

export const LANGUAGE_TRANSLATIONS_QUERY = gql`
  query LanguageTranslations {
    languageTranslations {
      ...languageTranslationsDetails
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const LANGUAGE_TRANSLATION_QUERY = gql`
  query LanguageTranslation($id: ID!) {
    languageTranslation(id: $id) {
      ...languageTranslationsDetails
    }
  }
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
`;

export const CREATE_LANGUAGE_MUTATION = gql`
  mutation CreateLanguage($data: LanguageCreateInput!) {
    createLanguage(data: $data) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

export const UPDATE_LANGUAGE_MUTATION = gql`
  mutation UpdateLanguage(
    $data: LanguageUpdateInput!
    $where: LanguageWhereUniqueInput!
  ) {
    updateLanguage(data: $data, where: $where) {
      ...languageDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
`;
