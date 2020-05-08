import gql from 'graphql-tag';
import { BUREAU_FRAGMENT } from './shared';

export const BUREAUS_QUERY = gql`
  query Bureaus {
    bureaus {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;

export const BUREAU_QUERY = gql`
  query Bureau($id: ID!) {
    bureau(id: $id) {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;

export const CREATE_BUREAU_QUERY = gql`
  mutation CreateBureau($data: BureauCreateInput!) {
    createBureau(data: $data) {
      ...bureauDetails
    }
  }
  ${BUREAU_FRAGMENT}
`;
