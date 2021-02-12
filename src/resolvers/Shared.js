import { withFilter } from 'apollo-server-express';
import pubsub from '../services/pubsub';

const PROJECT_STATUS_CHANGE = 'PROJECT_STATUS_CHANGE';

const SharedResolvers = {
  Subscription: {
    projectStatusChange: {
      subscribe: withFilter(
        () => pubsub.asyncIterator( [PROJECT_STATUS_CHANGE] ),
        ( payload, variables ) => {
          const { id } = payload.projectStatusChange;

          if ( !id && ( !variables.ids || !variables.ids.length ) ) {
            return true;
          }

          return id === variables.id || variables.ids.includes( id );
        },
      ),
    },
  },
};

export default SharedResolvers;
