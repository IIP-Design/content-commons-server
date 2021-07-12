export const PLAYBOOK_FULL = `
  fragment PLAYBOOK_FULL on Playbook {
    id
    createdAt
    updatedAt
    publishedAt
    initialPublishedAt
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
    content {
      id
      rawText
      html
      markdown
    }
    policy {
      id
      name
      theme
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
      filesize
      filetype
      visibility 
      editable
    }
  }
`;
