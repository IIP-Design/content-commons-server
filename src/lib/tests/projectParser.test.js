import * as parser from '../projectParser';

describe( 'projectParser fn:', () => {
  it( 'getYouTubeId returns correct YouTube ID', () => {
    const { getYouTubeId } = parser;
    const id = '397271374';
    const values = [
      `https://www.youtube.com/watch?v=${id}`,
      `http://www.youtube.com/watch?v=${id}`,
      `https://youtube.com/watch?v=${id}`,
      `https://youtu.be/${id}`,
      `http://youtu.be/${id}`,
      `https://www.youtube.com/embed/${id}`,
      `http://www.youtube.com/embed/${id}`,
      `https://www.youtube.com/embed/${id}?rel=0`,
      `http://www.youtube.com/watch?v=${id}&feature=youtu.be`,
      `https://www.youtube.com/watch?v=${id}&feature=youtu.be`,
      `https://www.youtube.com/watch?v=${id}#t=0m30s`,
      `https://www.youtube.com/watch?v=${id}&feature=channel`,
      `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    ];

    values.forEach( val => {
      const ret = getYouTubeId( val );

      expect( ret ).toEqual( id );
    } );
  } );

  it( 'getVimeoId returns correct Vimeo ID', () => {
    const { getVimeoId } = parser;
    const id = '397271374';
    const values = [
      `http://vimeo.com/${id}`,
      `https://vimeo.com/${id}`,
      `https://www.vimeo.com/${id}`,
      `http://www.vimeo.com/${id}`,
      `http://player.vimeo.com/${id}`,
      `https://player.vimeo.com/${id}`,
      `http://www.player.vimeo.com/${id}`,
      `https://www.player.vimeo.com/${id}`,
      `https://vimeo.com/channels/${id}`,
      `http://vimeo.com/channels/${id}`,
      `https://www.vimeo.com/channels/${id}`,
      `http://www.vimeo.com/channels/${id}`,
      `https://vimeo.com/groups/name/videos/${id}`,
      `http://vimeo.com/groups/name/videos/${id}`,
      `https://www.vimeo.com/groups/name/videos/${id}`,
      `http://www.vimeo.com/groups/name/videos/${id}`,
      `https://vimeo.com/album/2222222/video/${id}`,
      `http://vimeo.com/album/2222222/video/${id}`,
      `https://www.vimeo.com/album/2222222/video/${id}`,
      `http://www.vimeo.com/album/2222222/video/${id}`,
      `https://vimeo.com/${id}?param=test`,
      `http://vimeo.com/${id}?param=test`,
      `https://www.vimeo.com/${id}?param=test`,
      `http://www.vimeo.com/${id}?param=test`,
    ];

    values.forEach( val => {
      const ret = getVimeoId( val );

      expect( ret ).toEqual( id );
    } );
  } );

  it( 'hasValidValue returns correct value', () => {
    const { hasValidValue } = parser;
    const values = [
      'https://vimeo.com/11111111',
      'dkskdkad',
      '',

      // failures
      // undefined,
      // null,
      // [],
      // {},
      // 5,
    ];

    values.forEach( val => {
      const ret = hasValidValue( val );

      if ( ret ) {
        expect( ret ).toEqual( true );
      } else {
        expect( ret ).toEqual( val );
      }
    } );
  } );

  it( 'getVimeoIds returns an array of ids', () => {
    const { getVimeoIds } = parser;
    const stream = [
      {
        url: 'https://vimeo.com/11',
      },
      {
        url: 'https://vimeo.com/22',
      },
      {
        url: 'https://vimeo.com/33',
      },
    ];

    expect( getVimeoIds( stream ) ).toEqual( [
      '11', '22', '33',
    ] );
  } );

  it( 'getS3ProjectDirectory returns the correct S3 directory', () => {
    const { getS3ProjectDirectory } = parser;
    const units = [
      {
        files: [
          {
            url: 'https://s3url.com/2020/04/filename1.mp4',
          },
          {
            url: 'https://s3url.com/2020/04/filename2.mp4',
          },
        ],
      },
      {
        files: [
          {
            url: 'https://s3url.com/2020/04/filename3.mp4',
          },
          {
            url: 'https://s3url.com/2020/04/filename4.mp4',
          },
        ],
      },
    ];
    const dir = getS3ProjectDirectory( units );

    expect( dir ).toEqual( 'https://s3url.com/2020/04' );
  } );

  it( 'getVimeoFiles returns the correct array of files', () => {
    const { getVimeoFiles } = parser;
    const units = [
      {
        files: [
          {
            stream: [
              {
                url: 'https://vimeo.com/11',
              },
              {
                url: 'https://vimeo.com/22',
              },
            ],
          },
        ],
      },
      {
        files: [
          {
            stream: [
              {
                url: 'https://vimeo.com/33',
              },
              {
                url: 'https://vimeo.com/44',
              },
            ],
          },
        ],
      },
    ];
    const files = getVimeoFiles( units );

    expect( files ).toEqual( ['33', '44'] );
  } );
} );
