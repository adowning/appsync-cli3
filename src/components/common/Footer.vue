<template>
  <VFooter dark color="accent" height="auto" app>
    <VBtn class="mx-3 white--text" icon @click="drawer = !drawer">
      <VIcon size="32px">
        menu
      </VIcon>
    </VBtn>
    <VNavigationDrawer v-model="drawer" light temporary app>
      <VList class="pa-1">
        <VListTile avatar>
          <VListTileAvatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>John Leider</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList class="pt-0" dense>
        <VDivider />
        <VListTile v-for="item in items" :key="item.title" :to="item.link">
          <VListTileAction>
            <VIcon>{{ item.icon }}</VIcon>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VSpacer />
      <VListTile to="/settings">
        <VListTileAction> <VIcon>settings</VIcon> </VListTileAction>

        <VListTileContent>
          <VListTileTitle>Settings</VListTileTitle>
        </VListTileContent>
      </VListTile>
    </VNavigationDrawer>
    <VSpacer />
  </VFooter>
</template>
<script>
export default {
  data: () => ({
    sheet: false,
    drawer: false,
    items: [
      { title: 'Home', icon: 'dashboard', link: '/' },
      { title: 'Crew', icon: 'people', link: '/employee' },
      { title: 'About', icon: 'question_answer', link: '/about' },
    ],
    tiles: [
      { img: 'logo.png', title: 'Home', link: '/' },
      { img: 'home.png', title: 'Employees', link: '/employee' },
    ],
  }),
  mounted(){
    console.log('yar')
  }
}
</script>
<style lang="stylus">
/* .footer {
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}  */
.v-footer {
  position:absolute;
   bottom:0;
   width:100%;
   height:60px;   /* Height of the footer */
   background:#6cf !important;
} 

</style>
