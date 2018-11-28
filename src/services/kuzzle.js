// const { Kuzzle } = require('kuzzle-sdk');

// const kuzzle = new Kuzzle('websocket', { host: 'localhost', port: 7512 });

// kuzzle
//   .connect()
//   .then(() => {
//     // You are now connected to your Kuzzle instance.
//     return kuzzle.server.now();
//   })
//   .then(serverTime => console.log(serverTime))
//   .catch(error => console.error(error));

import Kuzzle from 'kuzzle-sdk/dist/kuzzle'
import Promise from 'bluebird'
Kuzzle.prototype.bluebird = Promise

// let kuzzle = new Kuzzle('100.25.9.46:7512', {
//     connect: 'manual',
// })
// let kuzzle = new Kuzzle('localhost', {
//   connect: 'manual',
//   sslConnection: false
// })
 const kuzzle = new Kuzzle('http', { host: 'api.groupandrews.com', port: 80 })
// kuzzle
//   .connect()
//   .then(() => {
//     // You are now connected to your Kuzzle instance.
//     return kuzzle.server.now();
//   })
//   .then(serverTime => console.log(serverTime))
//   .catch(error => console.error(error));
window.kuzzle = kuzzle
export default kuzzle
