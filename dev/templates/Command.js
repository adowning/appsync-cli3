const args = {
    controller: 'kuzzle-core-plugin-boilerplate/myNewController',
    action: 'clockIn'
  },
  query = {
    documentId: '2342344',
    indexName: 'playground',
    collectionName: 'test',
    body: {
      property: 'bar'
    },
    other: 'argument'
  };
kuzzle.query(args, query, function(err, res) {
  console.log(err);
  console.log(res.result);
});
