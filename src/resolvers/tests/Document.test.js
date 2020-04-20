import gql from 'graphql-tag';
import createTestServer from '../../testServer/createTestServer';

jest.mock(
  '../../services/aws/s3',
  () => ( {
    getSignedUrlPromiseGet: () => ( {
      key: 'the-mock-key',
      url: 'https://signedurl.com'
    } )
  } )
);

const DOCUMENT_USE_FRAGMENT = gql`
  fragment documentUseDetails on DocumentUse {
    id
    name
  }
`;

const DOCUMENT_CONVERSION_FORMAT_FRAGMENT = gql`
  fragment documentConversionFormatDetails on DocumentConversionFormat {
    id
    rawText
    html
    markdown
  }
`;

const DOCUMENT_FILE_FRAGMENT = gql`
  fragment documentFileDetails on DocumentFile {
    id
    createdAt
    updatedAt
    publishedAt
    title
    language {
      id
      languageCode
      locale
      textDirection
      displayName
      nativeName
    }
    filetype
    filename
    filesize
    status
    excerpt
    content { ...documentConversionFormatDetails }
    image {
      id
      createdAt
      updatedAt
      filename
      filetype
      filesize
      visibility
      use {
        id
        name
      }
      url
      signedUrl
      language {
        id
        languageCode
        locale
        textDirection
        displayName
        nativeName
      }
    }
    url
    signedUrl
    visibility
    use { ...documentUseDetails }
    bureaus {
      id
      name
      abbr
      offices {
        id
        name
      }
    }
    countries {
      id
      name
      abbr
      region {
        id
        name
        abbr
      }
    }
  }
`;

// DocumentFile
const DOCUMENT_FILES_QUERY = gql`
  query DocumentFiles {
    documentFiles {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

const DOCUMENT_FILE_QUERY = gql`
  query DocumentFile($id: ID!) {
    documentFile(id: $id) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

const CREATE_DOCUMENT_FILE_MUTATION = gql`
  mutation CreateDocumentFile($data: DocumentFileCreateInput!) {
    createDocumentFile(data: $data) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

const UPDATE_DOCUMENT_FILE_MUTATION = gql`
  mutation UpdateDocumentFile(
    $data: DocumentFileUpdateInput!
    $where: DocumentFileWhereUniqueInput!
  ) {
    updateDocumentFile(data: $data, where: $where) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

const DELETE_DOCUMENT_FILE_MUTATION = gql`
  mutation DeleteDocumentFile($id: ID!) {
    deleteDocumentFile(id: $id) {
      ...documentFileDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
  ${DOCUMENT_USE_FRAGMENT}
  ${DOCUMENT_FILE_FRAGMENT}
`;

const DELETE_MANY_DOCUMENT_FILES_MUTATION = gql`
  mutation DeleteManyDocumentFiles(
    $where: DocumentFileWhereInput
  ) {
    deleteManyDocumentFiles(where: $where) {
      count
    }
  }
`;

// DocumentUse
const DOCUMENT_USES_QUERY = gql`
  query DocumentUses {
    documentUses {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

const DOCUMENT_USE_QUERY = gql`
  query DocumentUse($id: ID!) {
    documentUse(id: $id) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

const CREATE_DOCUMENT_USE_MUTATION = gql`
  mutation CreateDocumentUse($name: String!) {
    createDocumentUse(name: $name) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

const UPDATE_DOCUMENT_USE_MUTATION = gql`
  mutation UpdateDocumentUse(
    $data: DocumentUseUpdateInput!
    $where: DocumentUseWhereUniqueInput!
  ) {
    updateDocumentUse(data: $data, where: $where) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;

const UPDATE_MANY_DOCUMENT_USES_MUTATION = gql`
  mutation UpdateManyDocumentUses(
    $data: DocumentUseUpdateManyMutationInput!
    $where: DocumentUseWhereInput
  ) {
    updateManyDocumentUses(data: $data, where: $where) {
      count
    }
  }
`;

const DELETE_DOCUMENT_USE_MUTATION = gql`
  mutation DeleteDocumentUse($id: ID!) {
    deleteDocumentUse(id: $id) {
      ...documentUseDetails
    }
  }
  ${DOCUMENT_USE_FRAGMENT}
`;


const DELETE_MANY_DOCUMENT_USES_MUTATION = gql`
  mutation DeleteManyDocumentUses(
    $where: DocumentUseWhereInput
  ) {
    deleteManyDocumentUses(where: $where) {
      count
    }
  }
`;

// DocumentConversionFormat
const DOCUMENT_CONVERSION_FORMATS_QUERY = gql`
  query DocumentConversionFormats {
    documentConversionFormats {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

const DOCUMENT_CONVERSION_FORMAT_QUERY = gql`
  query DocumentConversionFormat($id: ID!) {
    documentConversionFormat(id: $id) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

const CREATE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation CreateDocumentConversionFormat(
    $data: DocumentConversionFormatCreateInput!
  ) {
    createDocumentConversionFormat(data: $data) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

const UPDATE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation UpdateDocumentConversionFormat(
    $data: DocumentConversionFormatUpdateInput!
    $where: DocumentConversionFormatWhereUniqueInput!
  ) {
    updateDocumentConversionFormat(data: $data, where: $where) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

const UPDATE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION = gql`
  mutation UpdateManyDocumentConversionFormats(
    $data: DocumentConversionFormatUpdateManyMutationInput!
    $where: DocumentConversionFormatWhereInput
  ) {
    updateManyDocumentConversionFormats(data: $data, where: $where) {
      count
    }
  }
`;

const DELETE_DOCUMENT_CONVERSION_FORMAT_MUTATION = gql`
  mutation DeleteDocumentConversionFormat($id: ID!) {
    deleteDocumentConversionFormat(id: $id) {
      ...documentConversionFormatDetails
    }
  }
  ${DOCUMENT_CONVERSION_FORMAT_FRAGMENT}
`;

const DELETE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION = gql`
  mutation DeleteManyDocumentConversionFormats(
    $where: DocumentConversionFormatWhereInput
  ) {
    deleteManyDocumentConversionFormats(where: $where) {
      count
    }
  }
`;

const documentUses = [
  {
    id: 'a8es',
    name: 'document use name',
  },
  {
    id: 'aies',
    name: 'document use name'
  }
];
const documentConversionFormats = [
  {
    id: '123',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content'
  },
  {
    id: '678',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content'
  }
];

const documentFile = {
  id: 'ck8k3zcoy102p0720k0xph2bv',
  createdAt: '2020-03-15T13:01:01.906Z',
  updatedAt: '2020-03-15T13:01:01.906Z',
  publishedAt: '2020-03-15T13:01:01.906Z',
  title: 'mock string value',
  language: {
    id: 'ck2lzfx710hkq07206thus6pt',
    languageCode: 'mock string value',
    locale: 'mock string value',
    textDirection: 'LTR',
    displayName: 'mock string value',
    nativeName: 'mock string value'
  },
  filetype: 'mock string value',
  filename: 'mock string value',
  filesize: 25555,
  status: 'PUBLISHED',
  excerpt: '<p>the excerpt</p>',
  content: {
    id: '123',
    rawText: 'the content',
    html: '<p>the content</p>',
    markdown: 'the content'
  },
  image: [
    {
      id: 'image-id-28uid',
      createdAt: '2020-03-15T13:01:01.906Z',
      updatedAt: '2020-03-15T13:01:01.906Z',
      filename: 'mock string value',
      filetype: 'mock string value',
      filesize: 25555,
      visibility: 'INTERNAL',
      use: { id: 'a32asd', name: 'mock image use' },
      url: 'mock string value',
      signedUrl: 'https://signedurl.com',
      language: {
        id: 'ck2lzfx710hkq07206thus6pt',
        languageCode: 'en',
        locale: 'en-us',
        textDirection: 'LTR',
        displayName: 'English',
        nativeName: 'English'
      }
    }
  ],
  url: 'mock string value',
  signedUrl: 'https://signedurl.com',
  visibility: 'INTERNAL',
  use: documentUses[0],
  bureaus: [
    {
      id: 'ck5cvpjcu01k80720d2eouy43',
      name: 'Bureau of African Affairs',
      abbr: 'AF',
      offices: []
    }
  ],
  countries: [
    {
      id: 'ck6krp96x3f3n0720q1289gee',
      name: 'Angola',
      abbr: 'AF',
      region: {
        id: 'ck6krp96g3f3c0720c1w09bx1',
        name: 'Bureau of African Affairs',
        abbr: 'AF'
      }
    }
  ]
};

const getDocumentFile = () => ( {
  id: documentFile.id,
  language: jest.fn( () => documentFile.language ),
  excerpt: jest.fn( () => documentFile.excerpt ),
  content: jest.fn( () => documentConversionFormats[0] ),
  use: jest.fn( () => documentUses[0] ),
  image: jest.fn( () => documentFile.image ),
  visibility: documentFile.visibility,
  status: documentFile.status,
  bureaus: jest.fn( () => documentFile.bureaus ),
  countries: jest.fn( () => documentFile.countries )
} );

const getImageFile = () => ( {
  ...documentFile.image[0],
  language: jest.fn( () => documentFile.image[0].language ),
  use: jest.fn( () => documentFile.image[0].use )
} );

const getPrismaDocumentFileFns = () => ( {
  bureau: jest.fn( () => ( {
    offices: jest.fn( () => documentFile.bureaus[0].offices )
  } ) ),
  country: jest.fn( () => ( {
    region: jest.fn( () => documentFile.countries[0].region )
  } ) ),
  documentFile: jest.fn( () => getDocumentFile() ),
  imageFile: jest.fn( () => getImageFile() )
} );

describe( 'Query:', () => {
  it( 'documentFiles returns the correct document files', async () => {
    const ctx = {
      user: {},
      prisma: {
        bureau: jest.fn( () => ( {
          offices: jest.fn()
        } ) ),
        country: jest.fn( () => ( {
          region: jest.fn()
        } ) ),
        documentFile: jest.fn( () => ( {
          language: jest.fn(),
          excerpt: jest.fn(),
          content: jest.fn(),
          use: jest.fn(),
          image: jest.fn(),
          bureaus: jest.fn(),
          countries: jest.fn()
        } ) ),
        imageFile: jest.fn( () => ( {
          language: jest.fn(),
          use: jest.fn()
        } ) ),
        documentFiles: jest.fn(),
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: DOCUMENT_FILES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    /**
     * Use autogenerated mocks for sake of convenience (i.e.,
     * avoids having to manually create multiple documentFile
     * mocks). So check that no gql errors are returned
     * and that each top level field is truthy.
     */
    expect( result.errors ).not.toBeDefined();
    result.data.documentFiles.forEach( doc => {
      const fields = Object.keys( doc );
      fields.forEach( field => {
        const value = doc[field];
        expect( value ).toBeTruthy();
        if ( typeof value === 'object' ) {
          const isArray = Array.isArray( value );
          const arr = isArray ? value : Object.keys( value );
          expect( arr.length ).toBeGreaterThan( 0 );
        }
      } );
    } );
  } );

  it( 'documentFile returns a specific document file', async () => {
    const ctx = {
      user: {},
      prisma: { ...getPrismaDocumentFileFns() }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: DOCUMENT_FILE_QUERY,
      variables: { id: documentFile.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.documentFile ).toEqual( documentFile );
  } );

  it( 'documentUses returns the correct document uses', async () => {
    const ctx = {
      user: {},
      prisma: {
        documentUses: jest.fn( () => documentUses )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: DOCUMENT_USES_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.documentUses ).toEqual( documentUses );
  } );

  it( 'documentUse returns a specific document use', async () => {
    const documentUse = documentUses[0];
    const ctx = {
      user: {},
      prisma: {
        documentUse: jest.fn( () => documentUse )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: DOCUMENT_USE_QUERY,
      variables: { id: documentUse.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.documentUse ).toEqual( documentUse );
  } );

  it( 'documentConversionFormats returns the correct document conversion formats', async () => {
    const ctx = {
      user: {},
      prisma: {
        documentConversionFormats: jest.fn( () => documentConversionFormats )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = { query: DOCUMENT_CONVERSION_FORMATS_QUERY };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.documentConversionFormats )
      .toEqual( documentConversionFormats );
  } );

  it( 'documentConversionFormat returns a specific document conversion format', async () => {
    const documentConversionFormat = documentConversionFormats[0];
    const ctx = {
      user: {},
      prisma: {
        documentConversionFormat: jest.fn( () => documentConversionFormat )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'query' );
    const request = {
      query: DOCUMENT_CONVERSION_FORMAT_QUERY,
      variables: { id: documentConversionFormat.id }
    };
    const result = await server.query( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.documentConversionFormat )
      .toEqual( documentConversionFormat );
  } );
} );

describe( 'Mutation:', () => {
  it( 'createDocumentFile creates a document file', async () => {
    const { id } = documentFile;
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaDocumentFileFns(),
        createDocumentFile: jest.fn( () => documentFile )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: CREATE_DOCUMENT_FILE_MUTATION,
      variables: { data: { id } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createDocumentFile ).toEqual( documentFile );
  } );

  it( 'updateDocumentFile updates a specific document file', async () => {
    const { id } = documentFile;
    const title = 'new document file title';
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaDocumentFileFns(),
        updateDocumentFile: jest.fn( () => ( { ...documentFile, title } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: UPDATE_DOCUMENT_FILE_MUTATION,
      variables: {
        data: { title },
        where: { id }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateDocumentFile ).toEqual( {
      ...documentFile, title
    } );
  } );

  it( 'deleteDocumentFile deletes a specific document file', async () => {
    const { id } = documentFile;
    const ctx = {
      user: {},
      prisma: {
        ...getPrismaDocumentFileFns(),
        deleteDocumentFile: jest.fn( () => documentFile )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_DOCUMENT_FILE_MUTATION,
      variables: { id }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteDocumentFile ).toEqual( documentFile );
  } );

  it( 'deleteManyDocumentFiles deletes many document files', async () => {
    const documentsToDelete = [{}, {}];
    const ctx = {
      user: {},
      prisma: {
        deleteManyDocumentFiles: jest.fn( () => ( {
          count: documentsToDelete.length
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_MANY_DOCUMENT_FILES_MUTATION,
      variables: { where: { id_not: '' } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManyDocumentFiles.count )
      .toEqual( documentsToDelete.length );
  } );

  it( 'createDocumentUse creates a document use', async () => {
    const newDocumentUseId = 'new-document-use-133';
    const newDocumentUse = { name: 'new document use name' };
    const ctx = {
      user: {},
      prisma: {
        createDocumentUse: jest.fn( () => ( {
          ...newDocumentUse,
          id: newDocumentUseId
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: CREATE_DOCUMENT_USE_MUTATION,
      variables: { name: newDocumentUse.name }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createDocumentUse )
      .toEqual( { ...newDocumentUse, id: newDocumentUseId } );
  } );

  it( 'updateDocumentUse updates a specific document use', async () => {
    const updatedDocumentUseName = 'an updated document use name';
    const updatedDocumentUse = {
      ...documentUses[0],
      name: updatedDocumentUseName
    };
    const ctx = {
      user: {},
      prisma: {
        updateDocumentUse: jest.fn( () => updatedDocumentUse )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: UPDATE_DOCUMENT_USE_MUTATION,
      variables: {
        data: { name: updatedDocumentUseName },
        where: { id: documentUses[0].id }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateDocumentUse ).toEqual( updatedDocumentUse );
  } );

  it( 'updateManyDocumentUses updates many document uses', async () => {
    const updatedDocumentUseName = 'an updated document use name';
    const ctx = {
      user: {},
      prisma: {
        updateManyDocumentUses: jest.fn( () => ( {
          count: documentUses.length
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: UPDATE_MANY_DOCUMENT_USES_MUTATION,
      variables: {
        data: { name: updatedDocumentUseName },
        where: { id_not: '' }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateManyDocumentUses.count )
      .toEqual( documentUses.length );
  } );

  it( 'deleteDocumentUse deletes a specific document use', async () => {
    const deletedDocumentUse = documentUses[0];
    const ctx = {
      user: {},
      prisma: {
        deleteDocumentUse: jest.fn( () => deletedDocumentUse )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_DOCUMENT_USE_MUTATION,
      variables: { id: documentUses[0].id }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteDocumentUse ).toEqual( deletedDocumentUse );
  } );

  it( 'deleteManyDocumentUses deletes many document uses', async () => {
    const ctx = {
      user: {},
      prisma: {
        deleteManyDocumentUses: jest.fn( () => ( {
          count: documentUses.length
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_MANY_DOCUMENT_USES_MUTATION,
      variables: { where: { id_not: '' } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManyDocumentUses.count )
      .toEqual( documentUses.length );
  } );

  it( 'createDocumentConversionFormat creates a document conversion format', async () => {
    const newDocumentConversionFormatId = 'new-document-conversion-format-133';
    const newDocumentConversionFormat = {
      rawText: 'new document conversion format content',
      html: '<p>new document conversion content</p>',
      markdown: 'new document conversion content'
    };
    const ctx = {
      user: {},
      prisma: {
        createDocumentConversionFormat: jest.fn( () => ( {
          ...newDocumentConversionFormat,
          id: newDocumentConversionFormatId
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: CREATE_DOCUMENT_CONVERSION_FORMAT_MUTATION,
      variables: {
        data: { ...newDocumentConversionFormat }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.createDocumentConversionFormat ).toEqual( {
      ...newDocumentConversionFormat,
      id: newDocumentConversionFormatId
    } );
  } );

  it( 'updateDocumentConversionFormat updates a specific document conversion format', async () => {
    const updatedRawText = 'updated raw text';
    const updatedDocumentConversionFormat = {
      ...documentConversionFormats[0],
      rawText: updatedRawText
    };
    const ctx = {
      user: {},
      prisma: {
        updateDocumentConversionFormat: jest.fn( () => updatedDocumentConversionFormat )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: UPDATE_DOCUMENT_CONVERSION_FORMAT_MUTATION,
      variables: {
        data: { rawText: updatedRawText },
        where: { id: documentConversionFormats[0].id }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateDocumentConversionFormat )
      .toEqual( updatedDocumentConversionFormat );
  } );

  it( 'updateManyDocumentConversionFormats updates many document conversion formats', async () => {
    const updatedRawText = 'updated rawText';
    const ctx = {
      user: {},
      prisma: {
        updateManyDocumentConversionFormats: jest.fn( () => ( {
          count: documentConversionFormats.length
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: UPDATE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION,
      variables: {
        data: { rawText: updatedRawText },
        where: { id_not: '' }
      }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.updateManyDocumentConversionFormats.count )
      .toEqual( documentConversionFormats.length );
  } );

  it( 'deleteDocumentConversionFormat deletes a specific document conversion format', async () => {
    const deletedDocumentConversionFormat = documentConversionFormats[0];
    const ctx = {
      user: {},
      prisma: {
        deleteDocumentConversionFormat: jest.fn( () => deletedDocumentConversionFormat )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_DOCUMENT_CONVERSION_FORMAT_MUTATION,
      variables: { id: documentConversionFormats[0].id }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteDocumentConversionFormat )
      .toEqual( deletedDocumentConversionFormat );
  } );

  it( 'deleteManyDocumentConversionFormats deletes many document conversion formats', async () => {
    const ctx = {
      user: {},
      prisma: {
        deleteManyDocumentConversionFormats: jest.fn( () => ( {
          count: documentConversionFormats.length
        } ) )
      }
    };
    const server = createTestServer( ctx );
    const spy = jest.spyOn( server, 'mutate' );
    const request = {
      query: DELETE_MANY_DOCUMENT_CONVERSION_FORMATS_MUTATION,
      variables: { where: { id_not: '' } }
    };
    const result = await server.mutate( request );

    expect( spy ).toHaveBeenCalledWith( request );
    expect( result.data.deleteManyDocumentConversionFormats.count )
      .toEqual( documentConversionFormats.length );
  } );
} );
