import gql from 'graphql-tag';
import {
  LANGUAGE_FRAGMENT,
  LANGUAGE_TRANSLATIONS_FRAGMENT,
  SUPPORT_FILE_FRAGMENT,
  TEAM_FRAGMENT,
} from './shared';

// Fragments
const PLAYBOOK_FRAGMENT = gql`
  fragment playbookDetails on Playbook {
    id
    createdAt
    updatedAt
    publishedAt
    type
    title
    assetPath
    author {
      id
      firstName
      lastName
      email
    }
    team {
      ...teamDetails
    }
    desc
    status
    visibility
    categories {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
    tags {
      id
      translations {
        ...languageTranslationsDetails
      }
    }
    content {
      id
      rawText
      html
      markdown
    }
    policy {
      id
      name
      theme
    }
    supportFiles {
      ...supportFileDetails
    }
  }
  ${LANGUAGE_FRAGMENT}
  ${LANGUAGE_TRANSLATIONS_FRAGMENT}
  ${SUPPORT_FILE_FRAGMENT}
  ${TEAM_FRAGMENT}
`;

// Playbook
export const PLAYBOOKS_QUERY = gql`
  query Playbooks {
    playbooks {
      ...playbookDetails
    }
  }
  ${PLAYBOOK_FRAGMENT}
`;

export const PLAYBOOK_QUERY = gql`
  query Playbook($id: ID!) {
    playbook(id: $id) {
      ...playbookDetails
    }
  }
  ${PLAYBOOK_FRAGMENT}
`;

export const CREATE_PLAYBOOK_MUTATION = gql`
  mutation CreatePlaybook($data: PlaybookCreateInput!) {
    createPlaybook(data: $data) {
      ...playbookDetails
    }
  }
  ${PLAYBOOK_FRAGMENT}
`;

export const UPDATE_PLAYBOOK_MUTATION = gql`
  mutation UpdatePlaybook(
    $data: PlaybookUpdateInput!
    $where: PlaybookWhereUniqueInput!
  ) {
    updatePlaybook(data: $data, where: $where) {
      ...playbookDetails
    }
  }
  ${PLAYBOOK_FRAGMENT}
`;
