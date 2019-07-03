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
