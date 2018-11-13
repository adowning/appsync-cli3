// import * as CB from 'cloudboost'
// var CB = require('cloudboost')
import * as CB from 'cloudboost'
var fs = require('fs')
var parse = require('csv-parse')

var csvData = []

function csvJSON(csv, CB) {
  console.log(csv)
  fs.createReadStream(csv)
    .pipe(parse({ delimiter: ':' }))
    .on('data', function(csvrow) {
      console.log(csvrow)
      //do something with csvrow
      csvData.push(csvrow)
    })
    .on('end', function() {
      //do something wiht csvData
      console.log(csvData)
    })
  return JSON.stringify(csvData) //JSON
}

async function remove() {
  // var table = new CB.CloudTable('Employees')
  // table.delete().then(
  //   function(status) {
  //     //success status
  //   },
  //   function() {
  //     //get error status
  //   }
  // )
  var table2 = new CB.CloudTable('Employees')
  if (table2) {
    return await table2.delete().then(
      function(status) {
        return status
      },
      function() {
        //get error status
      }
    )
  }
}
async function init() {
  return CB.CloudApp.init(
    'http://localhost:4730',
    'devApp',
    '417c9820-6eeb-42a3-b59b-a8eed67b71ca'
  )
}
init().then(remove().then(csvJSON('Users.csv', CB)))
