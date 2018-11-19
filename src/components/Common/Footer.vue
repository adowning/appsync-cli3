<template>
  <v-footer dark color="primary" height="80px">
    <v-menu transition="slide-y-transition" top>
      <v-btn slot="activator" color="primary" dark icon>
        <v-icon flat class="white--text ml-4" size="42px">fa-bars</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.link">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    drawer: false,
    items: [
      { title: 'Home', icon: 'dashboard', link: '/' },
      { title: 'Crew', icon: 'people', link: '/employeelist' },
      { title: 'Ownership', icon: 'fa-person', link: '/owner' },
    ],
    tiles: [
      { img: 'logo.png', title: 'Home', link: '/' },
      { img: 'home.png', title: 'Employees', link: '/employee' },
    ],
  })
}
</script>
<style>
footer {
  background-color: #333;
  width: 100%;
  bottom: 0;
  position: fixed;
}
</style>
