import gql from 'graphql-tag';

const TEAM_FRAGMENT = gql`
  fragment teamDetails on Team {
    id
    name
    organization
  }
`;

export const TEAMS_QUERY = gql`
  query Teams {
    teams {
      ...teamDetails
    }
  }
  ${TEAM_FRAGMENT}
`;

export const TEAM_QUERY = gql`
  query Team($id: ID!) {
    team(id: $id) {
      ...teamDetails
    }
  }
  ${TEAM_FRAGMENT}
`;

export const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($name: String! $organization: String!) {
    createTeam(name: $name, organization: $organization) {
      ...teamDetails
    }
  }
  ${TEAM_FRAGMENT}
`;

export const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam(
    $data: TeamUpdateInput!
    $where: TeamWhereUniqueInput!
  ) {
    updateTeam(data: $data, where: $where) {
      ...teamDetails
    }
  }
  ${TEAM_FRAGMENT}
`;

export const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeam($where: TeamWhereUniqueInput!) {
    deleteTeam(where: $where) {
      ...teamDetails
    }
  }
  ${TEAM_FRAGMENT}
`;
