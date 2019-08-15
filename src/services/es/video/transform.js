import { getVimeoId, getYouTubeId } from '../../../lib/projectParser';

const ENGLISH_LOCALE = 'en-us';
const THUMBNAIL_USE = 'Thumbnail/Cover Image';


function getEmbedUrl( url ) {
  if ( !url.includes( 'youtube' ) && !url.includes( 'vimeo' ) ) {
    return url;
  }
  if ( url.includes( 'youtube' ) ) {
    return `https://www.youtube.com/embed/${getYouTubeId( url )}`;
  }
  if ( url.includes( 'vimeo' ) ) {
    return `https://player.vimeo.com/video/${getVimeoId( url )}`;
  }
  return url;
}

const transformThumbnail = image => ( {
  url: image.url,
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
const transformThumbnails = ( thumbnails, hasSize = true ) => {
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

  if ( hasSize ) {
    // Unit level thumbnails use the Thumbnail schema which includes size
    thumbnails.forEach( ( { size, image } ) => {
      esThumb.sizes[size.toLowerCase()] = transformThumbnail( image );
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
  }
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
  taxonomyTerms.forEach( ( { translations = [] } ) => {
    const translation = translations.find( trans => trans.language.id === unitLanguage.id );
    if ( translation ) {
      terms.push( translation.name );
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
    downloadUrl: file.url,
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
    if ( stream.site === 'youtube' ) {
      source.stream = {
        url: stream.embedUrl || getEmbedUrl( stream.url ),
        site: 'youtube',
        uid: getYouTubeId( source.stream.url )
      };
      source.streamUrl.push( source.stream );
    } else if ( stream.site === 'vimeo' ) {
      const streamObj = {
        url: stream.embedUrl || getEmbedUrl( stream.url ),
        link: stream.url,
        site: 'vimeo',
        uid: getVimeoId( stream.url )
      };
      source.streamUrl.push( streamObj );
      if ( !source.stream ) {
        source.stream = streamObj;
      }
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
 * @param projectCategories
 * @param projectTags
 * @returns object
 */
const transformVideoUnit = ( publisherUnit, projectCategories, projectTags ) => {
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
  if ( publisherUnit.categories && publisherUnit.categories.length > 0 ) {
    esUnit.categories = transformTaxonomy( publisherUnit.categories, publisherUnit.language );
  } else if ( projectCategories && projectCategories.length ) {
    esUnit.categories = transformTaxonomy( projectCategories, publisherUnit.language );
  }
  if ( publisherUnit.tags && publisherUnit.tags.length > 0 ) {
    esUnit.tags = transformTaxonomy( publisherUnit.tags, publisherUnit.language );
  } else if ( projectTags && projectTags.length ) {
    esUnit.tags = transformTaxonomy( projectTags, publisherUnit.language );
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
 * Transforms data from a VideoProject into a format accepted by the Public API
 * for Elastic Search.
 *
 * @param videoProject
 * @returns object
 */
const transformVideo = videoProject => {
  const now = ( new Date() ).toISOString();

  const esData = {
    post_id: videoProject.id,
    site: 'commons.america.gov',
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

  const { categories, tags } = videoProject;

  videoProject.units.forEach( videoUnit => {
    const unit = transformVideoUnit( videoUnit, categories, tags );

    // Assign SRTs and Transcripts based on language
    // TODO: Allow for user assigned SRT/Transcript in future
    if ( videoProject.supportFiles ) {
      videoProject.supportFiles.forEach( file => {
        if ( file.language.id !== videoUnit.language.id ) return;
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
    if ( !esData.thumbnail && unit.thumbnail.sizes.full && videoUnit.language.locale === ENGLISH_LOCALE ) {
      esData.thumbnail = unit.thumbnail;
    }
  } );

  // If still no project thumbnail, try to use the project level ImageFiles
  if ( !esData.thumbnail && videoProject.thumbnails && videoProject.thumbnails.length > 0 ) {
    const thumbs = videoProject.thumbnails.filter( thumb => thumb.use.name === THUMBNAIL_USE );
    esData.thumbnail = transformThumbnails( thumbs, false );
  }
  return esData;
};

export default transformVideo;
