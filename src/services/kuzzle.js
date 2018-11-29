// const { Kuzzle } = require('kuzzle-sdk');

// const kuzzle = new Kuzzle('websocket', { host: 'app.ashdevtools.com', port: 7512 });

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
// let kuzzle = new Kuzzle('app.ashdevtools.com', {
//   connect: 'manual',
//   port: 443,
//   sslConnection: true
// })
//  const kuzzle = new Kuzzle('https', { host: 'app.ashdevtools.com', port: 443, sslConnection: true })
 const kuzzle = new Kuzzle('manual', { host: 'app.ashdevtools.com/ws', port: 443, sslConnection: true })
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
