import WebSocketService from './WebSocketService';
import Messages from "./Messages";
import EventEmitter from '../EventEmitter';

export default class WsClient extends EventEmitter { 

  constructor() {
    super();
    this._service = new WebSocketService();
    this.url = null;

    this._service.on('disconnect', this, () => {
      console.log('disconnected');
    })

    this._service.on('message', this, data => {
      this.emit('message', data);
    });
  }

  tryConnect(userId) {

    if (this._service.isConnected) {
      console.log(Messages.ALREADY_CONNECTED);
      return Promise.resolve();
    }
    
    console.log(Messages.CONNECTING);

    return this._service
      .tryConnect(this.url, userId)
      .then(() => {
        console.log(Messages.CONNECTED);
        // alert(Messages.CONNECTED);
        return;
      })
      .catch(err => {
        console.log(Messages.FAILED);
        // alert(err);
        console.log(err);
      })
  }

  disconnect() {
    if (this._service.isConnected) {
      this._service.disconnect();
      return Promise.resolve();
      // Сообщение в out пойдёт через событие от сервиса.
    } else {
      return Promise.reject(Messages.NOT_CONNECTED);
    }
  }

  sendMessage(message) {
    console.log('sending message: ');
    console.log(message);

    if (this._service.send(message)) {  // JSON.stringify
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(Messages.NOT_CONNECTED))
    }
  }
}