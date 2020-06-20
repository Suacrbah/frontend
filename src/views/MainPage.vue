<template>
  <v-top-navigation
    v-model="topNav"
  >
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-top-navigation>
</template>

<script>
  export default {
    data () {
      return {
        topNav: 'recent',
      }
    },
  }
</script>