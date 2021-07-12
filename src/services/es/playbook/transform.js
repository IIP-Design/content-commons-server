import {
  english,
  transformContent,
  transformSupportFile,
  transformTaxonomy,
} from '../common/transform';

/**
 * Transforms data from a GraphQL Playbook into a Playbook format
 * accepted by the Public API for Elastic Search.
 *
 * @param {Object} playbook
 * @returns {Object}
 */
const transformPlaybook = playbook => {
  const now = new Date().toISOString();
  const {
    id,
    createdAt,
    initialPublishedAt,
    title,
    visibility,
    team,
    desc,
    policy,
    content,
    categories,
    tags,
  } = playbook;

  const esData = {
    id,
    site: process.env.INDEXING_DOMAIN,
    title: title || '',
    type: 'playbook',
    published: now,
    initialPublished: initialPublishedAt || now,
    modified: now,
    created: createdAt,
    visibility,
    language: english,
    desc,
    owner: team && team.name ? team.name : '',
    categories: transformTaxonomy( categories, 'en-us' ),
    tags: transformTaxonomy( tags, 'en-us' ),
    supportFiles: [],
  };

  if ( policy ) {
    esData.policy = {
      name: policy.name,
      theme: policy.theme,
    };
  }

  if ( content ) {
    esData.content = transformContent( content );
  }

  if ( playbook.supportFiles && playbook.supportFiles.length ) {
    esData.supportFiles = playbook.supportFiles.map( file => transformSupportFile( file ) );
  }

  console.log( 'playbook', JSON.stringify( playbook, null, 2 ) );
  console.log( 'esdata', JSON.stringify( esData, null, 2 ) );

  return esData;
};

export default transformPlaybook;
