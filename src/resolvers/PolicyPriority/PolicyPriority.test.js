import * as query from '../mocks/mockQueries/policyPriority';
import { policyPriorities } from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

describe( 'Query:', () => {
  it( 'policyPriorities returns the correct priorities', async () => {
    const ctx = {
      prisma: {
        policyPriorities: jest.fn( () => policyPriorities ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.POLICY_PRIORITIES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.policyPriorities ).toEqual( policyPriorities );
  } );

  it( 'policyPriority returns a specific priority', async () => {
    const policyPriority = policyPriorities[0]; // Alliances and Partnerships
    const ctx = {
      user: {},
      prisma: {
        policyPriority: jest.fn( () => policyPriority ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.POLICY_PRIORITY_QUERY,
      variables: { id: policyPriority.id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.policyPriority ).toEqual( policyPriority );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createPolicyPriority creates a policyPriority', async () => {
    const policyPriority = {
      id: 'new-policy-priority-123',
      name: 'New Policy Priority',
      theme: 'new-new-new',
    };
    const ctx = {
      user: {},
      prisma: {
        policyPriority: jest.fn( () => policyPriority ),
        createPolicyPriority: jest.fn( () => ( { ...policyPriority } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_POLICY_PRIORITY_MUTATION,
      variables: { data: { ...policyPriority } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createPolicyPriority ).toEqual( {
      ...policyPriority,
    } );
  } );

  it( 'updatePolicyPriority updates a policyPriority', async () => {
    const policyPriority = {
      id: 'new-policy-priority-123',
      name: 'Sort of New Policy Priority',
      theme: 'new-new-new',
    };
    const ctx = {
      user: {},
      prisma: {
        policyPriority: jest.fn( () => policyPriority ),
        updatePolicyPriority: jest.fn( () => ( {
          ...policyPriority,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_POLICY_PRIORITY_MUTATION,
      variables: {
        data: { name: policyPriority.name },
        where: { id: policyPriority.id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updatePolicyPriority ).toEqual( {
      ...policyPriority,
    } );
  } );

  it( 'deletePolicyPriority deletes a policyPriority', async () => {
    const policyPriority = {
      id: 'new-policy-priority-123',
      name: 'Sort of New Policy Priority',
      theme: 'new-new-new',
    };
    const ctx = {
      user: {},
      prisma: {
        policyPriority: jest.fn( () => policyPriority ),
        deletePolicyPriority: jest.fn( () => ( {
          ...policyPriority,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_POLICY_PRIORITY_MUTATION,
      variables: {
        where: { id: policyPriority.id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deletePolicyPriority ).toEqual( {
      ...policyPriority,
    } );
  } );
} );
