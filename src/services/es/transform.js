const ENGLISH_LOCALE = 'en-us';

/**
 * Convert an array of thumbnails into an ES thumbnail object that consists of at least the full size.
 *
 * @param thumbnails
 * @returns object
 */
const transformThumbnails = thumbnails => {
  const esThumb = {
    name: null,
    alt: null,
    caption: null,
    longdesc: null,
    sizes: {
      small: null,
      medium: null,
      large: null,
      full: null
    }
  };
  if ( !thumbnails || !thumbnails.length ) return esThumb;
  thumbnails.forEach( ( { size, image } ) => {
    esThumb.sizes[size.toLowerCase()] = {
      url: image.url,
      width: image.dimensions.width,
      height: image.dimensions.height,
      orientation: image.dimensions.width >= image.dimensions.height ? 'landscape' : 'portrait'
    };
    if ( image.size === 'FULL' ) {
      esThumb.name = image.filename;
      esThumb.alt = image.alt;
      esThumb.caption = image.caption;
      esThumb.longdesc = image.longdesc;
    }
  } );
  return esThumb;
};

/**
 * Convert a taxonomy field (categories/tags) into translated ES terms based on the provided language.
 *
 * @param taxonomyTerms
 * @param unitLanguage
 * @returns {Array}
 */
const transformTaxonomy = ( taxonomyTerms, unitLanguage ) => {
  if ( !taxonomyTerms || !taxonomyTerms.length ) return [];
  const terms = [];
  taxonomyTerms.forEach( ( { esId, translations = [] } ) => {
    const translation = translations.find( trans => trans.language.id === unitLanguage.id );
    if ( translation ) {
      terms.push( { id: esId, name: translation.name } );
    }
  } );
  return terms;
};

/**
 * Converts a video file into an ES video source object.
 *
 * @param file VideoFile type from a VideoUnit
 * @returns object
 */
const transformVideoFile = file => {
  const source = {
    burnedInCaptions: file.videoBurnedInStatus !== 'CLEAN',
    downloadUrl: `https://s3.amazonaws.com/${process.env.AWS_S3_PUBLISHER_UPLOAD_BUCKET}/${file.url}`,
    streamUrl: [],
    stream: null,
    duration: file.duration,
    filetype: file.filetype,
    video_quality: file.quality,
    md5: file.md5,
    size: {
      width: file.dimensions && file.dimensions.width ? file.dimensions.width : null,
      height: file.dimensions && file.dimensions.height ? file.dimensions.height : null,
      filesize: file.filesize,
      bitrate: file.bitrate
    }
  };
  file.stream.forEach( stream => {
    if ( stream.site === 'vimeo' && !source.stream ) {
      source.stream = {
        url: stream.embedUrl,
        link: stream.url,
        site: 'vimeo'
      };
      const parts = stream.url.split( 'videos/' );
      if ( parts.length === 2 ) [, source.stream.uid] = parts;
    } else {
      source.streamUrl.push( {
        site: stream.site,
        url: stream.url
      } );
    }
  } );
  return source;
};

/**
 * Convert a video unit of a video project into an ES video unit.
 *
 * @param publisherUnit
 * @returns object
 */
const transformVideoUnit = publisherUnit => {
  const esUnit = {
    language: {
      language_code: publisherUnit.language.languageCode,
      locale: publisherUnit.language.locale,
      text_direction: publisherUnit.language.textDirection.toLowerCase(),
      display_name: publisherUnit.language.displayName,
      native_name: publisherUnit.language.nativeName
    },
    title: publisherUnit.title,
    desc: publisherUnit.descPublic,
    categories: [],
    tags: [],
    source: [],
    thumbnail: null,
    transcript: {
      srcUrl: null,
      md5: null,
      text: null
    },
    srt: {
      srcUrl: null,
      md5: null
    },
  };
  if ( publisherUnit.categories ) {
    esUnit.categories = transformTaxonomy( publisherUnit.categories, publisherUnit.language );
  }
  if ( publisherUnit.tags ) {
    esUnit.tags = transformTaxonomy( publisherUnit.tags, publisherUnit.language );
  }

  esUnit.thumbnail = transformThumbnails( publisherUnit.thumbnails );

  if ( publisherUnit.files ) {
    publisherUnit.files.forEach( file => {
      const src = transformVideoFile( file );
      esUnit.source.push( src );
    } );
  }
  return esUnit;
};

/**
 * Transforms data from a VideProject into a format accepted by the Public API
 * for Elastic Search.
 *
 * @param videoProject
 * @returns object
 */
const transformVideo = videoProject => {
  const now = ( new Date() ).toISOString();

  const esData = {
    post_id: videoProject.id,
    site: 'publisher',
    type: 'video',
    published: now,
    modified: now,
    // owner: null,
    // author: null,
    // thumbnail: null,
    unit: [],
  };
  if ( videoProject.team ) {
    esData.owner = videoProject.team.name;
  }
  if ( videoProject.author ) {
    esData.author = `${videoProject.author.firstName} ${videoProject.author.lastName}`.trim();
  }

  videoProject.units.forEach( gunit => {
    const unit = transformVideoUnit( gunit );

    // Assign SRTs and Transcripts based on language
    // TODO: Allow for user assigned SRT/Transcript in future
    if ( videoProject.supportFiles ) {
      videoProject.supportFiles.forEach( file => {
        if ( file.language.id !== gunit.language.id ) return;
        const supportFile = {
          srcUrl: file.url,
          md5: file.md5
        };
        if ( file.filetype === 'srt' || file.url.substr( -3 ) === 'srt' ) {
          unit.srt = supportFile;
        } else {
          unit.transcript = supportFile;
        }
      } );
    }
    esData.unit.push( unit );

    // Set the project thumbnail if:
    //  it does not yet exist
    //  the unit thumbnail has a non null full size
    //  and the language is english
    if ( !esData.thumbnail && unit.thumbnail.full && gunit.language.locale === ENGLISH_LOCALE ) {
      esData.thumbnail = unit.thumbnail;
    }
  } );
  return esData;
};

export default transformVideo;
