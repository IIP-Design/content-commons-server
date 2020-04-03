export const DOCUMENT_FILE_FULL = `
  fragment DOCUMENT_FILE_FULL on DocumentFile {
    id
    language { id languageCode locale textDirection displayName nativeName }
    filetype
    filename
    filesize
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
      md5
      url
      signedUrl
    }
    url
    signedUrl
    visibility
    url: String
    use {
      id
      name
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
    tags {
      id 
      translations {
        name
        language { id languageCode locale textDirection displayName nativeName }
      }
    }
  }
`;

export const DOCUMENT_FILE_URL = `
 fragment DOCUMENT_FILE_URL on DocumentFile {
    id
    url 
    image {
      id
      url
    }
  }
`;
