export const PACKAGE_DOCUMENT_FILES = `
  fragment PACKAGE_DOCUMENT_FILES on Package {
    documents {
      url
    }
  }
`;

export const PACKAGE_FULL = `
  fragment PACKAGE_FULL on Package {
    id
    type
    title
    desc
    status
    visibility
    assetPath
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
    documents {
      id
      language { id languageCode locale textDirection displayName nativeName }
      filetype
      filename
      filesize
      status
      content {
        id
        rawText
        html
        markdown
      }
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
        visibility
        use {
          id
          name
        } 
        url
        signedUrl
      }
      url
      signedUrl
      visibility
      use {
        id
        name
      }
      tags {
        id 
        translations {
          name
          language { id languageCode locale textDirection displayName nativeName }
        }
      }
      bureaus {
        id
        name
        abbr
        offices {
          id
          name
          abbr
        }
      }
      categories {
        id 
        translations {
          name
          language { id languageCode locale textDirection displayName nativeName }
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
    categories {
      id 
      translations {
        name
        language { id languageCode locale textDirection displayName nativeName }
      }
    }
    tags {
      id 
      translations {
        name
        language { id languageCode locale textDirection displayName nativeName }
      }
    }
  }
`;
