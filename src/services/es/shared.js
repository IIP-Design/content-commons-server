export const maybeGetUrlToProdS3 = url => {
  if ( url.startsWith( 'http:' ) || url.startsWith( 'https:' ) ) return url;
  return `https://${process.env.AWS_S3_PRODUCTION_BUCKET}.s3.amazonaws.com/${url}`;
};

export const transformLanguage = language => ( {
  language_code: language.languageCode,
  locale: language.locale,
  text_direction: language.textDirection.toLowerCase(),
  display_name: language.displayName,
  native_name: language.nativeName
} );

const transformThumbnail = image => ( {
  url: maybeGetUrlToProdS3( image.url ),
  width: image.dimensions.width,
  height: image.dimensions.height,
  orientation: image.dimensions.width >= image.dimensions.height ? 'landscape' : 'portrait'
} );

/**
 * Convert an array of thumbnails into an ES thumbnail object that consists of at least the full size.
 *
 * @param thumbnails
 * @param hasSize
 * @returns object
 */
export const transformThumbnails = ( thumbnails, hasSize = true ) => {
  const esThumb = {
    name: null,
    alt: null,
    caption: null,
    longdesc: null,
    visibility: 'PUBLIC',
    sizes: {
      small: null,
      medium: null,
      large: null,
      full: null
    }
  };
  if ( !thumbnails || !thumbnails.length ) return esThumb;

  if ( hasSize ) {
    // Unit level thumbnails use the Thumbnail schema which includes size
    thumbnails.forEach( ( { size, image } ) => {
      esThumb.sizes[size.toLowerCase()] = transformThumbnail( image );
      if ( image.visibility && image.visibility === 'INTERNAL' ) {
        esThumb.visibility = 'INTERNAL';
      }
      if ( size === 'FULL' ) {
        esThumb.name = image.filename;
        esThumb.alt = image.alt;
        esThumb.caption = image.caption;
        esThumb.longdesc = image.longdesc;
      }
    } );
  } else {
    // Project level thumbnails use ImageFile schema which does not include size
    const image = thumbnails[0];
    esThumb.sizes.full = transformThumbnail( image );
    esThumb.name = image.filename;
    esThumb.alt = image.alt;
    esThumb.caption = image.caption;
    esThumb.longdesc = image.longdesc;
    esThumb.visibility = image.visibility || 'PUBLIC';
  }
  return esThumb;
};
