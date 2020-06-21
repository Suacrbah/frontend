<template>
  <v-app>
    <v-app-bar   app dark class="primary">
      <v-img
              :src="require('@/assets/logo.png')"
              class="mr-5"
              contain
              height="48"
              width="48"
              max-width="48"
              @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title class="headline">
        <span class="font-weight-bold">
          BeHoo
        </span>
      </v-toolbar-title>



      <v-spacer></v-spacer>


      <span class="font-weight-bold">
          BeHoo
      </span>

    </v-app-bar>

     <v-content>
      <router-view />
     </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
