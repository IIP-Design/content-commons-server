export const GRAPHIC_ASSET_PATH = `
  fragment PACKAGE_DOCUMENT_FILES on Package {
    id
    title
    assetPath
  }
`;

export const GRAPHIC_PROJECT_FULL = `
  fragment GRAPHIC_PROJECT_FULL on GraphicProject {
    id
    status
    assetPath
    type
    title
    copyright
    alt
    descPublic {
      id 
      visibility
      content
    } 
    descInternal {
      id 
      visibility
      content
    } 
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
    visibility  
    supportFiles {
      id
      language { 
        id 
        languageCode 
        locale 
        textDirection 
        displayName 
        nativeName 
      }
      url 
      filename
      filetype
      filename
      visibility 
      editable
    }
    images {
      id
      title
      language { 
        id 
        languageCode 
        locale 
        textDirection 
        displayName 
        nativeName 
      }
      dimensions {
        id
        height
        width
      }
      alt
      longdesc
      caption
      filename
      filetype
      filesize
      visibility 
      url
      style {
        id
        name
      }
      social {
        id
        name
      }
    }
    categories {
      id 
      translations {
        name
        language { 
          id 
          languageCode 
          locale 
          textDirection 
          displayName 
          nativeName 
        }
      }
    }
    tags {
      id 
      translations {
        name
        language { 
          id 
          languageCode 
          locale 
          textDirection 
          displayName 
          nativeName 
        }
      }
    }
  }
`;
