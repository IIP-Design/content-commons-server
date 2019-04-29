/**
 * Represents a request sent to the ES API by way of socket so that it can be tracked,
 * and reacted to by way of Promise resolve/reject.
 * Since, it may take time for a request to be processed in the API we need this reference
 * in order to respond to it later.
 */
export default class SocketRequest {
  constructor( operation, type, data ) {
    this.operation = operation;
    this.type = type;
    this.data = data;
    this.sent = null;
    this.requestId = null;
    this.promise = new Promise( ( resolve, reject ) => {
      this.resolve = resolve;
      this.reject = reject;
    } );
  }
}
