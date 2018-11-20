<template>
  <div class="Crew">
    <v-btn block outline warning @click="test();">test</v-btn>
  </div>
</template>

<script>
/* This Component is a template. */
import kuzzle from "../../services/kuzzle";

export default {
  name: 'Crew',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    async test() {
      const args = {
          controller: 'kuzzle-core-plugin-boilerplate/myNewController',
          action: 'myNewAction'
        },
        query = {
          body: {
            property: 'bar'
          },
          other: 'argument'
        };

      // Using callbacks (NodeJS or Web Browser)
      kuzzle.query(args, query, function(err, res) {
        console.log(err);
        console.log(res.result);
      });
      // const query = {
      //   controller: 'kuzzle-core-plugin-boilerplate/myNewController',
      //   action: 'myNewAction',
      //   index: 'playground',
      //   body: {
      //     "asdxxf": 'asxxdf'
      //   }
      //   // documentId: "2342344",
      //   // indexName: "playground",
      //   // collectionName: "test"
      // };

      // try {
      //   // await kuzzle.connect();
      //   // const response = await kuzzle.query(query, {
      //   //   documentId: '2342344',
      //   //   indexName: 'playground',
      //   //   collectionName: 'test'
      //   // })
      //   const response = await kuzzle.query(query, {});
      //   console.log(response._result);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  },
  created() {},
  mounted() {},
  watch: {}
}
</script>

<style scoped lang="scss">
.Crew {
}
</style>
