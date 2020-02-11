import pubsub from '../pubsub';

const PROJECT_STATUS_CHANGE = 'PROJECT_STATUS_CHANGE';

export const notifyClientOnSuccess = async ( { id, status } ) => {
  console.log( `NOTIFYING CLIENT: Status changed to ${status}` );
  pubsub.publish( PROJECT_STATUS_CHANGE, { projectStatusChange: { id, status, error: null } } );
};

export const notifyClientOnError = async ( { id, status, error } ) => {
  console.log( `ERROR: NOTIFYING CLIENT of error: ${error}` );
  pubsub.publish( PROJECT_STATUS_CHANGE, { projectStatusChange: { id, status, error } } );
};
