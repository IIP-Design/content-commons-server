import gql from 'graphql-tag';
import {
  BUREAU_FRAGMENT,
  COUNTRY_FRAGMENT,
  IMAGE_DETAILS_FRAGMENT,
  LANGUAGE_FRAGMENT
} from './shared';

export const DOCUMENT_USE_FRAGMENT = gql`
  fragment documentUseDetails on DocumentUse {
    id
    name
  }
`;

export const DOCUMENT_CONVERSION_FORMAT_FRAGMENT = gql`
  fragment documentConversionFormatDetails on DocumentConversionFormat {
    id
    rawText
    html
    markdown
  }
`;

export const DOCUMENT_FILE_FRAGMENT = gql`
  fragment documentFileDetails on DocumentFile {
    id
    createdAt
    updatedAt
    publishedAt
    title
    language { ...languageDetails }
    filetype
    filename
    filesize
    status
    excerpt
    content { ...documentConversionFormatDetails }
    image { ...imageDetails }
    url
    signedUrl
    visibility
    use { ...documentUseDetails }
    bureaus { ...bureauDetails }
    countries { ...countryDetails }
  }
  ${BUREAU_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${IMAGE_DETAILS_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
`;

// DocumentFile
export const DOCUMENT_FILES_QUERY = gql`
  query DocumentFiles {
    documentFiles {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

export const DOCUMENT_FILE_QUERY = gql`
  query DocumentFile($id: ID!) {
    documentFile(id: $id) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

export const CREATE_DOCUMENT_FILE_MUTATION = gql`
  mutation CreateDocumentFile($data: DocumentFileCreateInput!) {
    createDocumentFile(data: $data) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

export const UPDATE_DOCUMENT_FILE_MUTATION = gql`
  mutation UpdateDocumentFile(
    $data: DocumentFileUpdateInput!
    $where: DocumentFileWhereUniqueInput!
  ) {
    updateDocumentFile(data: $data, where: $where) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

export const DELETE_DOCUMENT_FILE_MUTATION = gql`
  mutation DeleteDocumentFile($id: ID!) {
    deleteDocumentFile(id: $id) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

export const DELETE_MANY_DOCUMENT_FILES_MUTATION = gql`
  mutation DeleteManyDocumentFiles(
    $where: DocumentFileWhereInput
  ) {
    deleteManyDocumentFiles(where: $where) {
      count
    }
  }
`;

// DocumentUse
export const DOCUMENT_USES_QUERY = gql`
  query DocumentUses {
    documentUses {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

export const DOCUMENT_USE_QUERY = gql`
  query DocumentUse($id: ID!) {
    documentUse(id: $id) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

export const CREATE_DOCUMENT_USE_MUTATION = gql`
  mutation CreateDocumentUse($name: String!) {
    createDocumentUse(name: $name) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

export const UPDATE_DOCUMENT_USE_MUTATION = gql`
  mutation UpdateDocumentUse(
    $data: DocumentUseUpdateInput!
    $where: DocumentUseWhereUniqueInput!
  ) {
    updateDocumentUse(data: $data, where: $where) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

export const UPDATE_MANY_DOCUMENT_USES_MUTATION = gql`
  mutation UpdateManyDocumentUses(
    $data: DocumentUseUpdateManyMutationInput!
    $where: DocumentUseWhereInput
  ) {
    updateManyDocumentUses(data: $data, where: $where) {
      count
    }
  }
`;

export const DELETE_DOCUMENT_USE_MUTATION = gql`
  mutation DeleteDocumentUse($id: ID!) {
    deleteDocumentUse(id: $id) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

export const DELETE_MANY_DOCUMENT_USES_MUTATION = gql`
  mutation DeleteManyDocumentUses(
    $where: DocumentUseWhereInput
  ) {
    deleteManyDocumentUses(where: $where) {
      count
    }
  }
`;

// DocumentConversionFormat
export const DOCUMENT_CONVERSION_FORMATS_QUERY = gql`
  query DocumentConversionFormats {
    documentConversionFormats {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

export const DOCUMENT_CONVERSION_FORMAT_QUERY = gql`
  query DocumentConversionFormat($id: ID!) {
    documentConversionFormat(id: $id) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

export const CREATE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation CreateDocumentConversionFormat(
    $data: DocumentConversionFormatCreateInput!
  ) {
    createDocumentConversionFormat(data: $data) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

export const UPDATE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation UpdateDocumentConversionFormat(
    $data: DocumentConversionFormatUpdateInput!
    $where: DocumentConversionFormatWhereUniqueInput!
  ) {
    updateDocumentConversionFormat(data: $data, where: $where) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

export const UPDATE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION = gql`
  mutation UpdateManyDocumentConversionFormats(
    $data: DocumentConversionFormatUpdateManyMutationInput!
    $where: DocumentConversionFormatWhereInput
  ) {
    updateManyDocumentConversionFormats(data: $data, where: $where) {
      count
    }
  }
`;

export const DELETE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation DeleteDocumentConversionFormat($id: ID!) {
    deleteDocumentConversionFormat(id: $id) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

export const DELETE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION = gql`
  mutation DeleteManyDocumentConversionFormats(
    $where: DocumentConversionFormatWhereInput
  ) {
    deleteManyDocumentConversionFormats(where: $where) {
      count
    }
  }
`;
