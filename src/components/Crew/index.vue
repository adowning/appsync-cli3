<template>
  <div class="Crew">
    <v-btn block outline warning @click="test();">clock in</v-btn>
    <v-btn block outline warning @click="test2();">clock out</v-btn>
    <v-btn block outline warning @click="test3();"> test</v-btn>
  </div>
</template>

<script>
/* This Component is a template. */
import kuzzle from '../../services/kuzzle';

export default {
  name: "Crew",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    async test() {
      const args = {
          controller: "kuzzle-core-plugin-boilerplate/clockPunch",
          action: "clockIn"
        },
        query = {
          empId: "1444044"
        }
      kuzzle.query(args, query, function(err, res) {
        console.log(err)
        console.log(res.result)
      })
    },
    async test2() {
      const args = {
          controller: "kuzzle-core-plugin-boilerplate/clockPunch",
          action: "clockOut"
        },
        query = {
          empId: "1444044"
        }
      kuzzle.query(args, query, function(err, res) {
        console.log(err)
        console.log(res.result)
      })
    },
    async test3() {
      const args = {
          controller: "kuzzle-core-plugin-boilerplate/clockPunch",
          action: "test"
        },
        query = {
          empId: "1444044"
        }
      kuzzle.query(args, query, function(err, res) {
        console.log(err)
        console.log(res.result)
      })
    }
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.Crew {
}
</style>
