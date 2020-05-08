import gql from 'graphql-tag';

const USER_FRAGMENT = gql`
  fragment userDetails on User {
    id
    firstName
    lastName
    email
    jobTitle
    country
    city
    howHeard
    permissions
    team {
      id
      name
      organization
      contentTypes
      isConfirmed
    }
  }
`;

export const AUTHENTICATED_USER_QUERY = gql`
  query AuthenticatedUser {
    authenticatedUser {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateUser(data: $data, where: $where) {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;
