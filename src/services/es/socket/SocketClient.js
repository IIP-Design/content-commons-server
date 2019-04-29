import io from 'socket.io-client';
import SocketRequest from './SocketRequest';

/**
 * Manages the socket connection to the public API (ES), and facilitates the sending of index/delete requests,
 * and the receiving of request results.
 * TODO: Can also be used to schedule timeouts for requests that don't see a response in a specific period of time.
 */
export default class SocketClient {
  constructor() {
    this.client = null;
    this.requests = [];
  }

  /**
   * Establish connection to the public API via socket.
   * Attach handlers for result and message events.
   */
  connect() {
    if ( this.client ) this.client.close();
    this.client = io.connect( process.env.API_URL );

    this.client.on( 'connect', () => {
      console.info( '[Socket] Connection to Public API established.' );
    } );

    this.client.on( 'disconnect', () => {
      console.warn( '[Socket] Disconnected by Public API.' );
    } );

    this.client.on( 'message', message => {
      console.log( '[Socket] Message received:' );
      console.log( JSON.stringify( message, null, 2 ) );
    } );

    this.client.on( 'index.result', this.handleResult.bind( this ) );
    this.client.on( 'delete.result', this.handleResult.bind( this ) );
  }

  /**
   * Handle the result that is sent back from the API once it has finished processing
   * a given request. We identify the request by the requestId originally assigned by the
   * API and returned in the ACK response.
   *
   * @param result
   */
  handleResult( result ) {
    console.info( '[Socket] Recieved Result' );
    const reqIndex = this.requests.findIndex( r => r.requestId === result.req.requestId );
    if ( reqIndex < 0 ) {
      console.warn( '[Socket] Received a result without an associated request.' );
      console.log( JSON.stringify( result, null, 2 ) );
      return;
    }
    // Delete the request from our records as it needs no further processing.
    const [req] = this.requests.splice( reqIndex, 1 );
    if ( result.error ) {
      req.reject( result );
    } else {
      req.resolve( result );
    }
  }

  /**
   * Creates a new SocketRequest and sends the request to the API unless
   * the socket is not currently connected in which case the SocketRequest promise
   * is immediately rejected (to be handled later by the original caller).
   *
   * @param operation
   * @param type
   * @param data
   * @returns {SocketRequest}
   */
  transmit( operation, type, data ) {
    const req = new SocketRequest( operation, type, data );
    this.requests.push( req );
    this.client.emit( `${req.operation}.${req.type}`, req.data, requestId => {
      // This is a callback for the ACK response which is simply the requestId that
      // the public API assigned to the request internally.
      // We can use it to identify the result when it gets sent back later.
      req.requestId = requestId;
    } );
    // We set sent so that we can potentially handle situations where a result is
    // never returned from the API.
    req.sent = Date.now();
    console.info( '[Socket] Request sent.' );
    return req;
  }

  /**
   * Create and transmit an index (POST/PUT) request to the API.
   * Returns the promise created by the SocketRequest.
   *
   * @param type
   * @param data
   * @returns Promise
   */
  index( type, data ) {
    const req = this.transmit( 'index', type, data );
    return req.promise;
  }

  /**
   * Create and transmit a DELETE request to the API.
   * Returns the promise created by the SocketRequest.
   *
   * @param type
   * @param id
   * @returns Promise
   */
  delete( type, id ) {
    // Delete requires that a UUID be present as a param.
    // We still need the body as the API requires it in the schema.
    const args = {
      body: {
        site: 'publisher',
        post_id: id
      },
      params: { uuid: `publisher_${id}` }
    };
    const req = this.transmit( 'delete', type, args );
    return req.promise;
  }
}
