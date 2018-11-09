<template>
  <div class="crew-list">
  <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
          >
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
  </div>
</template>

<script>
export default {
  components: {
  },

  data: () => ({
  }),

  methods: {

  }  
};
</script>

