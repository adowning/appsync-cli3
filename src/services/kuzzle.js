// import Kuzzle from 'kuzzle-sdk/dist/kuzzle'
import Kuzzle from 'kuzzle-sdk/src/Kuzzle';
import Promise from 'bluebird';
Kuzzle.prototype.bluebird = Promise

let kuzzle = new Kuzzle('localhost', {
  connect: 'manual'
})

window.kuzzle = kuzzle
export default kuzzle
