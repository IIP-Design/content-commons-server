export const USER = `
  fragment USER on User {
    id 
    firstName
    lastName
    email
    permissions
    team {
      id
      name
      organization
    }
  }
`;
