import * as query from '../mocks/mockQueries/graphic';
import {
  graphicProject, graphicStyles, socialPlatforms, languages,
} from '../mocks/mockData';
import createTestServer from '../../testServer/createTestServer';

jest.mock( '../../services/aws/s3', () => ( {
  getSignedUrlPromiseGet: () => ( {
    key: 'the-mock-key',
    url: 'https://signedurl.com',
  } ),
  getAssetPath: () => 'graphic/2020/03/commons.america.gov_ck8enbkxs0bdy076501iy0akv',
  deleteAllS3Assets: () => Promise.resolve( {} ),
} ) );

const getGraphicProject = () => ( {
  ...graphicProject,
  author: jest.fn( () => graphicProject.author ),
  team: jest.fn( () => graphicProject.team ),
  descPublic: jest.fn( () => graphicProject.descPublic ),
  descInternal: jest.fn( () => graphicProject.descInternal ),
  supportFiles: jest.fn( () => graphicProject.supportFiles ),
  images: jest.fn( () => graphicProject.images ),
  categories: jest.fn( () => graphicProject.categories ),
  tags: jest.fn( () => graphicProject.tags ),
  $fragment: jest.fn( () => ( { ...graphicProject } ) ),
} );

const getImageFile = () => ( {
  ...graphicProject.images[0],
  language: jest.fn( () => graphicProject.images[0].language ),
  use: jest.fn( () => graphicProject.images[0].use ),
  social: jest.fn( () => graphicProject.images[0].social ),
  style: jest.fn( () => graphicProject.images[0].style ),
} );

const getPrismaGraphicProjectFns = () => ( {
  graphicProject: jest.fn( () => getGraphicProject() ),
  author: jest.fn( () => graphicProject.author ),
  team: jest.fn( () => graphicProject.team ),
  descPublic: jest.fn( () => graphicProject.descPublic ),
  descInternal: jest.fn( () => graphicProject.descInternal ),
  supportFile: jest.fn( () => ( {
    language: jest.fn( () => graphicProject.supportFiles[0].language ),
    use: jest.fn( () => graphicProject.supportFiles[0].use ),
  } ) ),
  imageFile: jest.fn( () => getImageFile() ),
  category: jest.fn( () => ( {
    translations: jest.fn( () => graphicProject.categories[0].translations ),
  } ) ),
  tag: jest.fn( () => ( {
    translations: jest.fn( () => graphicProject.tags[0].translations ),
  } ) ),
} );

describe( 'Query:', () => {
  it( 'graphicProjects returns the correct graphic projects', async () => {
    const ctx = {
      user: {},
      prisma: {
        graphicProject: jest.fn( () => ( {
          author: jest.fn(),
          team: jest.fn(),
          descPublic: jest.fn(),
          descInternal: jest.fn(),
          supportFiles: jest.fn(),
          images: jest.fn(),
          categories: jest.fn(),
          tags: jest.fn(),
        } ) ),
        author: jest.fn(),
        team: jest.fn(),
        descPublic: jest.fn( () => ( {
          visibility: jest.fn(),
          content: jest.fn(),
        } ) ),
        descInternal: jest.fn( () => ( {
          visibility: jest.fn(),
          content: jest.fn(),
        } ) ),
        supportFile: jest.fn( () => ( {
          language: jest.fn(),
          use: jest.fn(),
        } ) ),
        imageFile: jest.fn( () => ( {
          language: jest.fn(),
          use: jest.fn(),
          social: jest.fn(),
          style: jest.fn(),
        } ) ),
        category: jest.fn( () => ( {
          translations: jest.fn(),
        } ) ),
        tag: jest.fn( () => ( {
          translations: jest.fn(),
        } ) ),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn(),
        } ) ),
        graphicProjects: jest.fn(),
      },
    };
    const server = createTestServer( ctx );

    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.GRAPHIC_PROJECTS_QUERY };

    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    /**
     * Use autogenerated mocks for sake of convenience (i.e.,
     * avoids having to manually create multiple documentFile
     * mocks). So check that no gql errors are returned
     * and that each top level field is truthy.
     */
    expect( result.errors ).not.toBeDefined();
    result.data.graphicProjects.forEach( project => {
      const fields = Object.keys( project );

      fields.forEach( field => {
        const value = project[field];

        expect( value ).toBeTruthy();

        if ( typeof value === 'object' ) {
          const isArray = Array.isArray( value );
          const arr = isArray ? value : Object.keys( value );

          expect( arr.length ).toBeGreaterThan( 0 );
        }
      } );
    } );
  } );

  it( 'graphicProject returns a specific graphic project', async () => {
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaGraphicProjectFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.GRAPHIC_PROJECT_QUERY,
      variables: { id: graphicProject.id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.graphicProject ).toEqual( graphicProject );
  } );

  it( 'graphicStyles returns the correct graphic styles', async () => {
    const ctx = {
      user: {},
      prisma: {
        graphicStyles: jest.fn( () => graphicStyles ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.GRAPHIC_STYLES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.graphicStyles ).toEqual( graphicStyles );
  } );

  it( 'graphicStyle returns a specific graphic style', async () => {
    const ctx = {
      user: {},
      prisma: {
        graphicStyle: jest.fn( () => graphicStyles[0] ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.GRAPHIC_STYLE_QUERY,
      variables: { id: graphicStyles[0].id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.graphicStyle ).toEqual( graphicStyles[0] );
  } );

  it( 'socialPlatforms returns the correct social platforms', async () => {
    const ctx = {
      user: {},
      prisma: {
        socialPlatforms: jest.fn( () => socialPlatforms ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: query.SOCIAL_PLATFORMS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.socialPlatforms ).toEqual( socialPlatforms );
  } );

  it( 'socialPlatform returns a specific social platform', async () => {
    const ctx = {
      user: {},
      prisma: {
        socialPlatform: jest.fn( () => socialPlatforms[0] ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: query.SOCIAL_PLATFORM_QUERY,
      variables: { id: socialPlatforms[0].id },
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.socialPlatform ).toEqual( socialPlatforms[0] );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createGraphicProject creates a graphic project', async () => {
    const { id, title } = graphicProject;

    const ctx = {
      user: {},
      prisma: {
        ...getPrismaGraphicProjectFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        createGraphicProject: jest.fn( () => graphicProject ),
        updateGraphicProject: jest.fn( () => ( {
          $fragment: jest.fn( () => graphicProject ),
        } ) ),
      },
    };


    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_GRAPHIC_PROJECT_MUTATION,
      variables: { data: { id, title } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createGraphicProject ).toEqual( graphicProject );
  } );

  it( 'updateGraphicProject updates a specific graphic project', async () => {
    const { id } = graphicProject;
    const title = 'new graphic project title';
    const updatedGraphicProject = { ...graphicProject, title };
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaGraphicProjectFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        updateGraphicProject: jest.fn( () => updatedGraphicProject ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_GRAPHIC_PROJECT_MUTATION,
      variables: {
        data: { title },
        where: { id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateGraphicProject ).toEqual( updatedGraphicProject );
  } );

  it( 'updateManyGraphicProjects updates many graphic projects', async () => {
    const graphicProjectsToUpdate = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        updateManyGraphicProjects: jest.fn( () => ( {
          count: graphicProjectsToUpdate.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_MANY_GRAPHIC_PROJECTS_MUTATION,
      variables: {
        data: { title: 'an updated graphic project title' },
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateManyGraphicProjects.count )
      .toEqual( graphicProjectsToUpdate.length );
  } );

  it( 'deleteGraphicProject deletes a specific graphic project', async () => {
    const { id } = graphicProject;
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaGraphicProjectFns(),
        languageTranslation: jest.fn( () => ( {
          language: jest.fn( () => {
            const count = ctx.prisma.languageTranslation.mock.calls.length;

            if ( count % 2 > 0 ) {
              return languages.english;
            }

            return languages.french;
          } ),
        } ) ),
        deleteGraphicProject: jest.fn( () => graphicProject ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_GRAPHIC_PROJECT_MUTATION,
      variables: { id },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.errors ).not.toBeDefined();
    expect( result.data.deleteGraphicProject ).toEqual( graphicProject );
  } );

  it( 'deleteManyGraphicProjects deletes many graphic projects', async () => {
    const graphicProjectsToDelete = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        deleteManyGraphicProjects: jest.fn( () => ( {
          count: graphicProjectsToDelete.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_MANY_GRAPHIC_PROJECTS_MUTATION,
      variables: {
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManyGraphicProjects.count )
      .toEqual( graphicProjectsToDelete.length );
  } );

  it( 'createGraphicStyle creates a graphic style', async () => {
    const graphicStyleToCreate = graphicStyles[0];
    const ctx = {
      user: {},
      prisma: {
        createGraphicStyle: jest.fn( () => graphicStyleToCreate ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_GRAPHIC_STYLE_MUTATION,
      variables: { data: { ...graphicStyleToCreate } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createGraphicStyle ).toEqual( graphicStyleToCreate );
  } );

  it( 'updateGraphicStyle updates a specific graphic style', async () => {
    const name = 'new graphic style name';
    const updatedGraphicStyle = { ...graphicStyles[0], name };
    const ctx = {
      user: {},
      prisma: {
        updateGraphicStyle: jest.fn( () => updatedGraphicStyle ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_GRAPHIC_STYLE_MUTATION,
      variables: {
        data: { name },
        where: { id: graphicStyles[0].id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateGraphicStyle ).toEqual( updatedGraphicStyle );
  } );

  it( 'updateManyGraphicStyles updates many graphic styles', async () => {
    const graphicStylesToUpdate = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        updateManyGraphicStyles: jest.fn( () => ( {
          count: graphicStylesToUpdate.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_MANY_GRAPHIC_STYLES_MUTATION,
      variables: {
        data: { name: 'an updated graphic style name' },
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateManyGraphicStyles.count )
      .toEqual( graphicStylesToUpdate.length );
  } );

  it( 'deleteGraphicStyle deletes a specific graphic style', async () => {
    const graphicStyleToDelete = graphicStyles[0];
    const ctx = {
      user: {},
      prisma: {
        deleteGraphicStyle: jest.fn( () => graphicStyleToDelete ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_GRAPHIC_STYLE_MUTATION,
      variables: { id: graphicStyleToDelete.id },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteGraphicStyle ).toEqual( graphicStyleToDelete );
  } );

  it( 'deleteManyGraphicStyles deletes many graphic styles', async () => {
    const graphicStylesToDelete = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        deleteManyGraphicStyles: jest.fn( () => ( {
          count: graphicStylesToDelete.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_MANY_GRAPHIC_STYLES_MUTATION,
      variables: {
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManyGraphicStyles.count )
      .toEqual( graphicStylesToDelete.length );
  } );

  it( 'createSocialPlatform creates a social platform', async () => {
    const socialPlatformToCreate = socialPlatforms[0];
    const ctx = {
      user: {},
      prisma: {
        createSocialPlatform: jest.fn( () => socialPlatformToCreate ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.CREATE_SOCIAL_PLATFORM_MUTATION,
      variables: { data: { ...socialPlatformToCreate } },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createSocialPlatform ).toEqual( socialPlatformToCreate );
  } );

  it( 'updateUpdateSocialPlatform updates a specific social platform', async () => {
    const name = 'new social platform name';
    const updatedSocialPlatform = { ...graphicStyles[0], name };
    const ctx = {
      user: {},
      prisma: {
        updateSocialPlatform: jest.fn( () => updatedSocialPlatform ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_SOCIAL_PLATFORM_MUTATION,
      variables: {
        data: { name },
        where: { id: updatedSocialPlatform.id },
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateSocialPlatform ).toEqual( updatedSocialPlatform );
  } );

  it( 'updateManySocialPlatforms updates many social platforms', async () => {
    const socialPlatformsToUpdate = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        updateManySocialPlatforms: jest.fn( () => ( {
          count: socialPlatformsToUpdate.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.UPDATE_MANY_SOCIAL_PLATFORMS_MUTATION,
      variables: {
        data: { name: 'an updated social platform name' },
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateManySocialPlatforms.count )
      .toEqual( socialPlatformsToUpdate.length );
  } );

  it( 'deleteSocialPlatform deletes a specific social platform', async () => {
    const socialPlatformsToDelete = socialPlatforms[0];
    const ctx = {
      user: {},
      prisma: {
        deleteSocialPlatform: jest.fn( () => socialPlatformsToDelete ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_SOCIAL_PLATFORM_MUTATION,
      variables: { id: socialPlatformsToDelete.id },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteSocialPlatform )
      .toEqual( socialPlatformsToDelete );
  } );

  it( 'deleteManySocialPlatforms deletes many social platforms', async () => {
    const socialPlatformsToDelete = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        deleteManySocialPlatforms: jest.fn( () => ( {
          count: socialPlatformsToDelete.length,
        } ) ),
      },
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: query.DELETE_MANY_SOCIAL_PLATFORMS_MUTATION,
      variables: {
        where: {},
      },
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManySocialPlatforms.count )
      .toEqual( socialPlatformsToDelete.length );
  } );
} );
