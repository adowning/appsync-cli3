/**
 * Plugins must be valid Node.js requirable modules,
 * usually shipped as a directory and containing either:
 *
 *  - an `index.js` file in its root directory, exporting a Javascript class
 *  - a well-formed `package.json` file in its root directory,
 *    specifying the path of the main requirable file in the `main` field.
 *
 * To determine the Plugin name, Kuzzle looks for the `name` field
 * in the `manifest.json` file.
 * @deprecated  - If no `manifest.json` file is found, Kuzzle will fall back
 * to the `package.json` file, if there is one. Otherwise, an exception is thrown
 * and Kuzzle will fail to start.
 *
 * @see https://docs.kuzzle.io/plugins-reference/plugins-creation-prerequisites/
 */

const humanity = require('./humanity.js');
const setToken = async() =>{
  return await humanity.setToken();
};
setToken();

const clockInUser = async(u, t) =>{
  return await humanity.clockInUser(u, t);
};
const clockOutUser = async(u, t) =>{
  return await humanity.clockOutUser(u, t);
};

class CorePlugin {
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-console */

  constructor() {

    this.context = null;
    this.config = {
      param: '<default value>'
    };


    // this.hooks = {
    //   'document:afterCreate':    'asyncListener',
    //   'core:overload':            'asyncOverloadListener'
    // };

    // this.pipes = {
    //   'document:beforeDelete':  'syncListener',
    //   'realtime:beforePublish': 'syncListener'
    // };
    // this.humanityToken = humanity.getToken();
    // console.log('token >>>>>>> ', token);
    this.controllers = {
      'clockPunch': {
        'clockIn': 'clockIn',
        'clockOut': 'clockOut',
        'test': 'test',
      }
    };
    this.routes = [
      {verb: 'get', url: '/clockIn/:property', controller: 'clockPunch', action: 'clockIn'},
      {verb: 'get', url: '/clockOut/:documentId', controller: 'clockPunch', action: 'clockOut'}
    ];
  }

  init (customConfig, context) {
    this.config = Object.assign(this.config, customConfig);
    this.context = context;
  }

  async clockIn(request) {
    const result = await clockInUser(request.input.args.empId, humanity.token);
    console.log('humanity result status = ', result.status);
    if (result.status === 1) {

      const response = await this.context.accessors.sdk.document.create('playground', 'timeSheets', null,
        result.data
      );
      console.log(`Document ${response} created`);
      return response._source;
    }
    return {
      error: result.data
    };

  }

  async test() {
    this.context.accessors.sdk.document.search('playground', 'timeSheets', {
      'query': {
        'bool': {
          'must': [
            { 'match': { 'out_timestamp':   '0' }},
            { 'match': { 'employee.id': '1444044'} }
          ]
        }
      }

    })
      .then(res => {
        console.log(res.hits[0]._source.employee.id);
        return res;
      });
  }

  async clockOut(request) {

    const result = await clockOutUser(request.input.args.empId, humanity.token);
    console.log('humanity result status = ', result.data);
    if (result.status === 1) {

      this.context.accessors.sdk.document.search('playground', 'timeSheets', {
        'query': {
          'bool': {
            'must': [
              { 'match': { 'out_timestamp':   '0' }},
              { 'match': { 'employee.id': request.input.args.empId} }
            ]
          }
        }
      })
        .then(res => {
          if (res.total != 1) {
            console.log('cannot find document in kuzzle');
            return { error: {status: '13'} };
          }
          console.log(res.hits[0]._id);
          this.context.accessors.sdk.document.update('playground', 'timeSheets', res.hits[0]._id, result.data)

            .then(res2 => {
              console.log(res2);
              return res2;
            });

          return res;
        });
    } else {
      return { error: result.data };

    }

  }

}

module.exports = CorePlugin;
