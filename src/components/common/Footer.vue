<template>
  <VFooter dark color="accent" height="auto">
    <VBtn class="mx-3 white--text" icon @click="drawer = !drawer">
      <VIcon size="32px">
        menu
      </VIcon>
    </VBtn>
    <VNavigationDrawer v-model="drawer" light absolute temporary>
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
}
</script>
<style></style>
