import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

const TEAMS_QUERY = gql`
  query Teams {
    teams {
      id
      name
      organization
    }
  }
`;

const TEAM_QUERY = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      name
      organization
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($name: String! $organization: String!) {
    createTeam(name: $name, organization: $organization) {
      id
      name
      organization
    }
  }
`;

const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam(
    $data: TeamUpdateInput! $where: TeamWhereUniqueInput!
  ) {
    updateTeam(data: $data, where: $where) {
      id
      name
      organization
    }
  }
`;

const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeam($where: TeamWhereUniqueInput!) {
    deleteTeam(where: $where) {
      id
      name
      organization
    }
  }
`;

describe( 'Query:', () => {
  it( 'teams returns the correct teams', async () => {
    const teams = [
      {
        id: 'ck2lzfx640hig0720fw7j98yt',
        name: 'GPA Video',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx650hih0720mpgplsqr',
        name: 'U.S. Speakers Program',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6f0hk607209lofxuzd',
        name: 'American Spaces',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6f0hk707205r3a5xwk',
        name: 'GPA Media Strategy',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6p0hkd0720h05lurvx',
        name: 'ShareAmerica',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6p0hke0720t6zw8jde',
        name: 'YLAI',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6r0hkg07201iym6ckg',
        name: 'ECA',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6u0hkj0720f8n8mtda',
        name: 'GPA Editorial & Design',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx6w0hkk07205vkfqtdk',
        name: 'VOA Editorials',
        organization: 'Department of State'
      },
      {
        id: 'ck2lzfx710hkn0720tog9i53x',
        name: 'Global Engagement Center',
        organization: 'Department of State'
      },
      {
        id: 'ck2qgfbke0ubc07209xmmjua2',
        name: 'GPA Front Office',
        organization: 'Department of State'
      },
      {
        id: 'ck2qgfbku0ubh0720iwhkvuyn',
        name: 'GPA Press Office',
        organization: 'Department of State'
      },
      {
        id: 'ck5cvpjdf01kq0720i4ovjo49',
        name: 'U.S. Missions',
        organization: 'Department of State'
      }
    ];
    const ctx = {
      prisma: { teams: jest.fn( () => teams ) }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: TEAMS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.teams ).toEqual( teams );
  } );

  it( 'team returns a specific team', async () => {
    const team = {
      id: 'ck2qgfbku0ubh0720iwhkvuyn',
      name: 'GPA Press Office',
      organization: 'Department of State'
    };
    const ctx = {
      prisma: {
        team: jest.fn( () => ( { ...team } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: TEAM_QUERY, variables: { id: team.id } };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.team ).toEqual( { ...team } );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createTeam creates a team', async () => {
    const team = {
      name: 'new team',
      organization: 'Department of State'
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: { createTeam: jest.fn( () => team ) }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: CREATE_TEAM_MUTATION, variables: { ...team } };
    const result = await server.mutate( request );
    const { createTeam } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( createTeam.name ).toEqual( team.name );
    expect( createTeam.organization ).toEqual( team.organization );
  } );

  it( 'updateTeam updates a team', async () => {
    const team = {
      id: 'ck2lzfx640hig0720fw7j98yt',
      name: 'new team name',
      organization: 'Department of State'
    };
    const variables = {
      data: { name: team.name },
      where: { id: team.id }
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: {
        updateTeam: jest.fn( () => ( { ...team } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: UPDATE_TEAM_MUTATION, variables };
    const result = await server.mutate( request );
    const { updateTeam } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( updateTeam ).toEqual( { ...team } );
  } );

  it( 'deleteTeam deletes a team', async () => {
    const variables = {
      where: { id: 'ck2lzfx640hig0720fw7j98yt' }
    };
    const { where: { id } } = variables;
    const team = {
      id,
      name: 'GPA Video',
      organization: 'Department of State'
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: {
        deleteTeam: jest.fn( () => ( { ...team } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: DELETE_TEAM_MUTATION, variables };
    const result = await server.mutate( request );
    const { deleteTeam } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( deleteTeam ).toEqual( { ...team } );
  } );
} );
