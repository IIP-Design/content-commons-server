import pubsub, { PROJECT_STATUS } from '../services/pubsub';

export default {
  Subscription: {
    projectStatus: {
      subscribe: () => pubsub.asyncIterator( [PROJECT_STATUS] ),
      resolve: payload => payload
    }
  }
};
