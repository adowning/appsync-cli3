<template>
  <div class="chat-history">
    <VListTile v-for="item in items" :key="item.title" avatar>
      <VListTileAvatar> <img :src="item.avatar" /> </VListTileAvatar>
      <VListTileContent> <VListTileTitle /> </VListTileContent>
      <VListTileAction>
        <VIcon :color="item.active ? 'teal' : 'grey'">
          chat_bubble
        </VIcon>
      </VListTileAction>
    </VListTile>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),

  methods: {},
}
</script>
