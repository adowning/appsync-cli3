// import axios from 'axios'
const axios = require('axios');
const token = '';

async function setToken() {
  const options = {
    client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
    client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
    grant_type: 'password',
    username: 'ash@andrewscarpetcleaning.com',
    password: 'sugarlips42',
  };

  return await axios
    .post('https://www.humanity.com/oauth2/token.php', options)
    .then(response => {
      this.token = response.data.access_token;
      console.log(this.token);
    });

}
exports.setToken = setToken;
exports.token = this.token;

async function clockInUser(empId, _token) {
  var x = await axios.post(
    `https://www.humanity.com/api/v2/employees/${empId}/clockin?access_token=` +
    _token)
    .then(response => {
    // this.token = response.data.access_token;
      var string = response.data;
      return string;
    });
  return x;
}
exports.clockInUser = clockInUser;


async function clockOutUser(empId, _token) {
  var res = await axios.put(`https://www.humanity.com/api/v2/employees/${empId}/clockout?access_token=` + _token)
    .then(response => {
    // this.token = response.data.access_token;
      var string = response.data;
      return string;
    });
  return res;
}
exports.clockOutUser = clockOutUser;
