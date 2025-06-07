export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(listener);
  }

  emit(eventName, data) {
    const listeners = this.events[eventName];
    if (listeners) {
      for (const listener of listeners) {
        listener(data);
      }
    }
  }

  off(eventName, listenerToRemove) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.delete(listenerToRemove);
    }
  }
}