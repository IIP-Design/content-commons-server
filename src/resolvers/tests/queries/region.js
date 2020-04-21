import gql from 'graphql-tag';
import { COUNTRY_FRAGMENT } from './shared';

const REGION_FRAGMENT = gql`
  fragment regionDetails on Region {
    id
    name
    abbr
    countries {
      id
      name
      abbr
    }
  }
`;

export const REGIONS_QUERY = gql`
  query Regions {
    regions {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;

export const REGION_QUERY = gql`
  query Region($id: ID!) {
    region(id: $id) {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;

export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      ...countryDetails
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const COUNTRY_QUERY = gql`
  query country($id: ID!) {
    country(id: $id) {
      ...countryDetails
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const CREATE_REGION_MUTATION = gql`
  mutation CreateRegion($data: RegionCreateInput!) {
    createRegion(data: $data) {
      ...regionDetails
    }
  }
  ${REGION_FRAGMENT}
`;
