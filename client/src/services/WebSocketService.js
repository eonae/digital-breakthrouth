import EventEmitter from '../EventEmitter';

export default class WebSocketService extends EventEmitter {

  constructor() {
    super();
    this._socket = null;
  }

  tryConnect(url, username) {

    return new Promise((resolve, reject) => {
        const fullUrl = url;// + //'?user=' + username;

        var socket = new WebSocket(fullUrl);

        socket.onopen = () => {
          this._socket = socket;
          resolve();
        };

        socket.onclose = () => {
          this.emit('disconnect', {});
          this._socket = null;
          reject();
        };
        
        socket.onmessage = event => {
          let data;
          try {
            data = JSON.parse(event.data);
            this.emit('message', data);
          } catch (error){
            console.log('Debug: invalid json');
            this.emit('message', event.data);
          }

        };
    });
  }

  disconnect() {
    if (!this._socket) return;
    this._socket.close();
    this._socket = null;
  }
  get isConnected() {
    return this._socket !== null;
  }

  send(message) {
    if (!this._socket) return false;
    this._socket.send(JSON.stringify(message));
    return true;
  }
}