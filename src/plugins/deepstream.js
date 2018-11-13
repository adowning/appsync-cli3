const deepstream = require('deepstream.io-client-js')
const client = deepstream('wss://123.deepstreamhub.com?apiKey=xxx')




clearLocalData(){
  localStorage.clear();
}
getServerUpdate(){
  const users = client.record.getList('users')
users.whenReady(users => {
  var entries = list.getEntries()
  console.log(entries) // [ 'car/1', 'car2' ]
})

}




client.login(
  {
    type: 'email',
    email: 'user@example.com',
    password: 'sesame',
  },
  (success, data) => {
    if (success) {
      clearLocalData()
      getServerUpdate()
    } else {
      // extra data can be returned from the permissionHandler as client data
      // both successful and unsuccesful logins
      // client.getConnectionState() will now return
      // 'AWAITING_AUTHENTICATION' or 'CLOSED'
      // if the maximum number of authentication
      // attempts has been exceeded.
    }
  }
)

