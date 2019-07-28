export default class EventEmitter {

  constructor() {
    this._map = new Map();
  }

  on(eventName, caller, handler){
    if (!handler) {
      debugger;
    }
    const arrayOfHandlers = this._map.get(eventName);
    if (arrayOfHandlers) {
      arrayOfHandlers.push({caller, method: handler});
    } else {
      const newArray = [ { caller, method: handler } ];
      this._map.set(eventName, newArray);
    }
  }

  off(eventName, caller) {
    const arrayOfHandlers = this._map.get(eventName);
    if (!arrayOfHandlers) return;

    const handler = arrayOfHandlers.find(h => h.caller === caller);
    if (!handler) return;

    arrayOfHandlers.splice(arrayOfHandlers.indexOf(handler), 1);
    if (arrayOfHandlers.length === 0) {
      this._map.delete(eventName);
    }
  }

  emit(eventName, args) {

    const arrayOfHandlers = this._map.get(eventName);

    if (!arrayOfHandlers || arrayOfHandlers.length === 0) return;
    
    arrayOfHandlers.forEach(handler => {
      setTimeout(() => {
        try {
          handler.method(args);
        }
        catch (error) {
          console.log('ERRRRRRROR!');
        }
      });
    });
  }
}