import { EventEmitter } from '../lib/eventEmitter.js';

const emitter = new EventEmitter();

const listener1 = (data) => console.log('Listener 1:', data);
const listener2 = (data) => console.log('Listener 2:', data);

emitter.on('matchStart', listener1);
emitter.on('matchStart', listener2);

emitter.emit('matchStart', { room: 'ABC123', players: 2 });

emitter.off('matchStart', listener2);

emitter.emit('matchStart', { room: 'XYZ789', players: 1 });