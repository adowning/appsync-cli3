<template>
  <div class="Crew">crew</div>
</template>

<script>
/* This Component is a template. */

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
      const query = {
        controller: 'kuzzle-core-plugin-boilerplate/myNewController',
        action: 'saySomething',
        documentId: '2342344',
        indexName: 'playground',
        collectionName: 'test'
      };

      try {
        await kuzzle.connect();
        const response = await kuzzle.query(query, {});
        console.log(response._result);
      } catch (error) {
        console.log(error);
      }
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
