import gql from 'graphql-tag';

const POLICY_PRIORITY_FRAGMENT = gql`
  fragment policyPriorityDetails on PolicyPriority {
    id
    name
    theme
  }
`;

export const POLICY_PRIORITIES_QUERY = gql`
  query PolicyPriorities {
    policyPriorities {
      ...policyPriorityDetails
    }
  }
  ${POLICY_PRIORITY_FRAGMENT}
`;

export const POLICY_PRIORITY_QUERY = gql`
  query PolicyPriority($id: ID!) {
    policyPriority(id: $id) {
      ...policyPriorityDetails
    }
  }
  ${POLICY_PRIORITY_FRAGMENT}
`;

export const CREATE_POLICY_PRIORITY_MUTATION = gql`
  mutation CreatePolicyPriority($data: PolicyPriorityCreateInput!) {
    createPolicyPriority(data: $data) {
      ...policyPriorityDetails
    }
  }
  ${POLICY_PRIORITY_FRAGMENT}
`;

export const UPDATE_POLICY_PRIORITY_MUTATION = gql`
  mutation UpdatePolicyPriority($data: PolicyPriorityUpdateInput!, $where: PolicyPriorityWhereUniqueInput!) {
    updatePolicyPriority(data: $data, where: $where) {
      ...policyPriorityDetails
    }
  }
  ${POLICY_PRIORITY_FRAGMENT}
`;

export const DELETE_POLICY_PRIORITY_MUTATION = gql`
  mutation DeletePolicyPriority($where: PolicyPriorityWhereUniqueInput!) {
    deletePolicyPriority(where: $where) {
      ...policyPriorityDetails
    }
  }
  ${POLICY_PRIORITY_FRAGMENT}
`;
