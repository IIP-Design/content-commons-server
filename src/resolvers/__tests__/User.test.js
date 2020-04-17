import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

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

const AUTHENTICATED_USER_QUERY = gql`
  query AuthenticatedUser {
    authenticatedUser {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

const USERS_QUERY = gql`
  query Users {
    users {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

const UPDATE_USER_MUTATION = gql`
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

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      ...userDetails
    }
  }
  ${USER_FRAGMENT}
`;

describe( 'Query:', () => {
  it( 'authenticatedUser returns the user', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const user = {
      id: 'ck2m042xo0rnp0720nb4gxjix',
      firstName: 'Joe',
      lastName: 'Schmoe',
      email: 'schmoej@america.gov',
      jobTitle: '',
      country: 'United States',
      city: 'Washington, DC',
      howHeard: '',
      permissions: ['EDITOR'],
      team
    };
    const ctx = {
      prisma: {
        user: jest.fn( () => ( {
          ...user,
          team: jest.fn( () => team )
        } ) )
      },
      user
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: AUTHENTICATED_USER_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.authenticatedUser ).toEqual( user );
  } );

  it( 'users returns the correct users', async () => {
    const team1 = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const team2 = {
      id: 'ck2lzfx640hig0720fw7j98yt',
      name: 'GPA Video',
      organization: 'Department of State',
      contentTypes: ['VIDEO'],
      isConfirmed: true
    };
    const users = [
      {
        id: 'ck2m042xo0rnp0720nb4gxjix',
        firstName: 'Joe',
        lastName: 'Schmoe',
        email: 'schmoej@america.gov',
        jobTitle: '',
        country: 'United States',
        city: 'Washington, DC',
        howHeard: '',
        permissions: ['EDITOR'],
        team: team1
      },
      {
        id: 'ck2m93ks81ks9akldi19skdk2k',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'doej@america.gov',
        jobTitle: '',
        country: 'United States',
        city: 'Washington, DC',
        howHeard: '',
        permissions: ['ADMIN'],
        team: team2
      }
    ];
    const ctx = {
      prisma: {
        user: jest.fn( () => ( {
          team: jest.fn( () => {
            if ( ctx.prisma.user.mock.calls.length === 1 ) {
              return team1;
            }
            return team2;
          } )
        } ) ),
        users: jest.fn( () => users )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: USERS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.users ).toEqual( users );
  } );
} );

describe( 'Mutation:', () => {
  it( 'updateUser updates a user if the current user is logged in', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const user = {
      id: 'ck2m042xo0rnp0720nb4gxjix',
      firstName: 'Joe',
      lastName: 'Schmoe',
      email: 'schmoej@america.gov',
      jobTitle: 'New Job Title',
      country: 'United States',
      city: 'Washington, DC',
      howHeard: '',
      permissions: ['EDITOR'],
      team
    };
    const variables = {
      data: { jobTitle: user.jobTitle },
      where: { id: user.id }
    };
    const ctx = {
      user,
      prisma: {
        updateUser: jest.fn( () => ( { ...user } ) ),
        user: jest.fn( () => ( {
          ...user,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: UPDATE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateUser ).toEqual( { ...user } );
  } );

  it( 'updateUser returns an Unauthorized error message if the current user is not logged in', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const user = {
      id: 'ck2m042xo0rnp0720nb4gxjix',
      firstName: 'Joe',
      lastName: 'Schmoe',
      email: 'schmoej@america.gov',
      jobTitle: 'New Job Title',
      country: 'United States',
      city: 'Washington, DC',
      howHeard: '',
      permissions: ['EDITOR'],
      team
    };
    const variables = {
      data: { jobTitle: user.jobTitle },
      where: { id: user.id }
    };
    const ctx = {
      // user, // missing ctx.user
      prisma: {
        updateUser: jest.fn( () => ( { ...user } ) ),
        user: jest.fn( () => ( {
          ...user,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: UPDATE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.errors[0].message ).toEqual( 'Unauthorized' );
    expect( result.data.updateUser ).toEqual( null );
  } );

  it( 'deleteUser deletes a user if the current user is logged in', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const user = {
      id: 'ck2m042xo0rnp0720nb4gxjix',
      firstName: 'Joe',
      lastName: 'Schmoe',
      email: 'schmoej@america.gov',
      jobTitle: '',
      country: 'United States',
      city: 'Washington, DC',
      howHeard: '',
      permissions: ['EDITOR'],
      team
    };
    const variables = { where: { id: user.id } };
    const ctx = {
      user,
      prisma: {
        deleteUser: jest.fn( () => ( { ...user } ) ),
        user: jest.fn( () => ( {
          ...user,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: DELETE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteUser ).toEqual( { ...user } );
  } );

  it( 'deleteUser returns an Unauthorized error message if the current user is not logged in', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State',
      contentTypes: ['PACKAGE'],
      isConfirmed: true
    };
    const user = {
      id: 'ck2m042xo0rnp0720nb4gxjix',
      firstName: 'Joe',
      lastName: 'Schmoe',
      email: 'schmoej@america.gov',
      jobTitle: '',
      country: 'United States',
      city: 'Washington, DC',
      howHeard: '',
      permissions: ['EDITOR'],
      team
    };
    const variables = { where: { id: user.id } };
    const ctx = {
      // user, // missing ctx.user
      prisma: {
        deleteUser: jest.fn( () => ( { ...user } ) ),
        user: jest.fn( () => ( {
          ...user,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: DELETE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.errors[0].message ).toEqual( 'Unauthorized' );
    expect( result.data.deleteUser ).toEqual( null );
  } );
} );
