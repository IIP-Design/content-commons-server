import * as query from '../mocks/mockQueries/team';
import { teams } from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'teams returns the correct teams', async () => {
    const ctx = {
      prisma: { teams: jest.fn( () => teams ) },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.TEAMS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.teams ).toEqual( teams );
  } );

  it( 'team returns a specific team', async () => {
    const team = teams[11];
    const ctx = {
      prisma: {
        team: jest.fn( () => ( { ...team } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.TEAM_QUERY, variables: { id: team.id } };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.team ).toEqual( { ...team } );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createTeam creates a team', async () => {
    const team = {
      name: 'new team',
      organization: 'Department of State',
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: { createTeam: jest.fn( () => team ) },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_TEAM_MUTATION,
      variables: { ...team },
    };
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
      organization: 'Department of State',
    };
    const variables = {
      data: { name: team.name },
      where: { id: team.id },
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: {
        updateTeam: jest.fn( () => ( { ...team } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.UPDATE_TEAM_MUTATION, variables };
    const result = await server.mutate( request );
    const { updateTeam } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( updateTeam ).toEqual( { ...team } );
  } );

  it( 'deleteTeam deletes a team', async () => {
    const variables = {
      where: { id: 'ck2lzfx640hig0720fw7j98yt' },
    };
    const { where: { id } } = variables;
    const team = {
      id,
      name: 'GPA Video',
      organization: 'Department of State',
    };
    const ctx = {
      user: { permissions: ['ADMIN'] },
      prisma: {
        deleteTeam: jest.fn( () => ( { ...team } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = { query: query.DELETE_TEAM_MUTATION, variables };
    const result = await server.mutate( request );
    const { deleteTeam } = result.data;

    expect( spy ).toHaveBeenCalledWith( request );
    expect( deleteTeam ).toEqual( { ...team } );
  } );
} );
