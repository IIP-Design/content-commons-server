export const VIDEO_UNIT_VIMEO_FILES = `
  fragment VIDEO_PROJECT_VIMEO_FILES on VideoUnit {
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
