export const VIDEO_UNIT_VIDEO_FILES = `
  fragment VIDEO_UNIT_VIDEO_FILES on VideoUnit {
    files {
      url
      stream(
        where: { 
          site: "vimeo"
        },
      ) {
        url
      }
    }
  }
`;

export const VIDEO_FILE_FILES = `
  fragment VIDEO_FILE_FILES on VideoFile { 
    url
    stream(
      where: { 
        site: "vimeo"
      },
    ) {
      url
    }
  } 
`;

export const VIDEO_PROJECT_FULL = `
  fragment VIDEO_PROJECT_FULL on VideoProject {
    id
    projectType
    projectTitle
    descPublic
    descInternal
    author {
      id
      firstName
      lastName
      email
      permissions
    }
    team {
      id
      name
      organization
    }
    status
    visibility
    units {
      id
      language { id languageCode locale textDirection displayName nativeName }
      title
      descPublic
      files {
        id
        language { id languageCode locale textDirection displayName nativeName }
        filetype
        filename
        use { name }
        quality
        videoBurnedInStatus
        url
        md5
        duration
        bitrate
        filesize
        dimensions {
          height
          width
        }
        stream {
          id
          site
          url
          embedUrl
        }
      }
      tags {
        id 
        translations {
          name
          language { id languageCode locale textDirection displayName nativeName }
        }
      }
      categories {
        id 
        translations {
          name
          language { id languageCode locale textDirection displayName nativeName }
        }
      }
      thumbnails {
        id
        size
        image {
          id
          language { id languageCode locale textDirection displayName nativeName }
          dimensions {
            height
            width
          }
          alt
          longdesc
          caption
          filename
          filetype
          use {
            name
          }
          md5
          url
        }
      }
    }
    supportFiles {
      id
      language { id languageCode locale textDirection displayName nativeName }
      url
      md5
      filename
      filetype
      filename
      use {
        name
      }
    }
    thumbnails {
      id
      language { id languageCode locale textDirection displayName nativeName }
      dimensions {
        height
        width
      }
      alt
      longdesc
      caption
      filename
      filetype
      use {
        name
      }
      md5
      url
    }
    categories {
      id 
      translations {
        name
        language { id languageCode locale textDirection displayName nativeName }
      }
    }
  }
`;
