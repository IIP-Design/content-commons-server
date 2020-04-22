import * as query from './queries/user';
import createTestServer from '../../testServer/createTestServer';

const teams = [
  {
    id: 'ck2qgfbku0ubh0720iwhkvuyn',
    name: 'GPA Press Office',
    organization: 'Department of State',
    contentTypes: ['PACKAGE'],
    isConfirmed: true
  },
  {
    id: 'ck2lzfx640hig0720fw7j98yt',
    name: 'GPA Video',
    organization: 'Department of State',
    contentTypes: ['VIDEO'],
    isConfirmed: true
  }
];

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
    team: teams[0]
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
    team: teams[1]
  }
];

describe( 'Query:', () => {
  it( 'authenticatedUser returns the user', async () => {
    const ctx = {
      prisma: {
        user: jest.fn( () => ( {
          ...users[0],
          team: jest.fn( () => teams[0] )
        } ) )
      },
      user: users[0]
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.AUTHENTICATED_USER_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.authenticatedUser ).toEqual( users[0] );
  } );

  it( 'users returns the correct users', async () => {
    const ctx = {
      prisma: {
        user: jest.fn( () => ( {
          team: jest.fn( () => {
            if ( ctx.prisma.user.mock.calls.length % 2 > 0 ) {
              return teams[0];
            }
            return teams[1];
          } )
        } ) ),
        users: jest.fn( () => users )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.USERS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.users ).toEqual( users );
  } );
} );

describe( 'Mutation:', () => {
  const team = teams[0];
  const user = users[0];

  it( 'updateUser updates a user if the current user is logged in', async () => {
    const updatedUser = {
      ...user,
      firstName: 'Joe\'s new firstName'
    };
    const variables = {
      data: { firstName: updatedUser.firstName },
      where: { id: user.id }
    };
    const ctx = {
      user,
      prisma: {
        updateUser: jest.fn( () => updatedUser ),
        user: jest.fn( () => ( {
          ...updatedUser,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.UPDATE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateUser ).toEqual( { ...updatedUser } );
  } );

  it( 'updateUser returns an Unauthorized error message if the current user is not logged in', async () => {
    const updatedUser = {
      ...user,
      firstName: 'Joe\'s new firstName'
    };
    const variables = {
      data: { firstName: updatedUser.firstName },
      where: { id: user.id }
    };
    const ctx = {
      // user, // missing ctx.user
      prisma: {
        updateUser: jest.fn( () => ( { ...updatedUser } ) ),
        user: jest.fn( () => ( {
          ...updatedUser,
          team: jest.fn( () => team )
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.UPDATE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.errors[0].message ).toEqual( 'Unauthorized' );
    expect( result.data.updateUser ).toEqual( null );
  } );

  it( 'deleteUser deletes a user if the current user is logged in', async () => {
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
    const request = { query: query.DELETE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteUser ).toEqual( { ...user } );
  } );

  it( 'deleteUser returns an Unauthorized error message if the current user is not logged in', async () => {
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
    const request = { query: query.DELETE_USER_MUTATION, variables };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.errors[0].message ).toEqual( 'Unauthorized' );
    expect( result.data.deleteUser ).toEqual( null );
  } );
} );
