import gql from 'graphql-tag';

export const TEAM_FRAGMENT = gql`
  fragment teamDetails on Team {
    id
    name
    organization
  }
`;

export const LANGUAGE_FRAGMENT = gql`
  fragment languageDetails on Language {
    id
    languageCode
    locale
    textDirection
    displayName
    nativeName
  }
`;

export const LANGUAGE_TRANSLATIONS_FRAGMENT = gql`
  fragment languageTranslationsDetails on LanguageTranslation {
    id
    name
    language { ...languageDetails }
  }
  ${LANGUAGE_FRAGMENT}
`;

export const BUREAU_FRAGMENT = gql`
  fragment bureauDetails on Bureau {
    id
    name
    abbr
    offices {
      id
      name
      abbr
    }
  }
`;

export const COUNTRY_FRAGMENT = gql`
  fragment countryDetails on Country {
    id
    name
    abbr
    region {
      id
      name
      abbr
    }
  }
`;

export const IMAGE_DETAILS_FRAGMENT = gql`
  fragment imageDetails on ImageFile {
    id
    createdAt
    updatedAt
    filename
    filetype
    filesize
    visibility
    use {
      id
      name
    }
    url
    signedUrl
    language { ...languageDetails }
  }
  ${LANGUAGE_FRAGMENT}
`;
