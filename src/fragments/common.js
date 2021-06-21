export const SUPPORT_FILE_FULL = `
  fragment SUPPORT_FILE_FULL on SupportFile {
    id
    createdAt
    updatedAt
    language { 
      id 
      languageCode 
      locale 
      textDirection 
      displayName 
      nativeName 
    }
    url
    signedUrl
    md5
    filename
    filetype
    filesize
    visibility
    editable
    use {
      id
      name
    }
  }
`;
