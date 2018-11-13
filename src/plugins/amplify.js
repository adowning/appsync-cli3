import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { API } from 'aws-amplify'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'
// eslint-disable-next-line
import aws_exports from '../aws-exports'
Amplify.configure(aws_exports)

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false
AmplifyEventBus.$on('authState', info => {
  console.log(
    `Here is the auth event that was just emitted by an Amplify component: ${info}`
  )
})
Vue.prototype.$Bus = AmplifyEventBus
//Dp6JO2Naba7w5B3k7vhi430e2eOI9H0Y8GGROU11
let apiName = 'employee-crud-api'
let path = '/aws-serverless-repository-empl-simplemobilebackend-R6ECIDC7DQCA'
let myInit = {
  // OPTIONAL
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  // queryStringParameters: {
  //   // OPTIONAL
  //   name: 'param',
  // },
}
API.get(apiName, path, myInit)
  .then(response => {
    // Add your code here
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

// Amplify.configure({
//     Auth: {

//         // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//         identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

//         // REQUIRED - Amazon Cognito Region
//         // region: 'XX-XXXX-X',
//         region: 'us-east-1',

//         // OPTIONAL - Amazon Cognito Federated Identity Pool Region
//         // Required only if it's different from Amazon Cognito Region
//         identityPoolRegion: 'XX-XXXX-X',

//         // OPTIONAL - Amazon Cognito User Pool ID
//         // userPoolId: 'XX-XXXX-X_abcd1234',
//         userPoolId: 'us-east-1_6VPY3XZWO',

//         // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//         // userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
//         userPoolWebClientId: '20fvfk90ur5gh05rk7hdp2rpi2',

//         // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//         // mandatorySignIn: false,
//         mandatorySignIn: true,

//         // // OPTIONAL - Configuration for cookie storage
//         // cookieStorage: {
//         // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//         //     domain: '.yourdomain.com',
//         // // OPTIONAL - Cookie path
//         //     path: '/',
//         // // OPTIONAL - Cookie expiration in days
//         //     expires: 365,
//         // // OPTIONAL - Cookie secure flag
//         //     secure: true
//         // },

//         // OPTIONAL - customized storage object
//         // storage: new MyStorage(),

//         // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//         // authenticationFlowType: 'USER_PASSWORD_AUTH'
//     }
// });
