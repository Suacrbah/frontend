<template>
    <v-layout row justify-center>
      <v-toolbar app dark color="primary" class="hidden-xs-and-down">
        <v-toolbar-title>Desktop Menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
         <v-btn
           v-for="item in nav"
           :key="item.icon"
           to="#"
           :title="item.title"
           flat
         >{{ item.text }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <v-toolbar app dark color="primary" class="hidden-sm-and-up">
        <v-toolbar-title>Mobile Menu</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-toolbar-side-icon dark slot="activator"></v-toolbar-side-icon>
          <v-card>
            <v-toolbar flat color="primary">
              <v-toolbar-title>Mobile Menu</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <v-list-tile
                v-for="(item, index) in nav"
                :key="index"
                to="#"
              >
                <v-list-tile-action>
                  <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title :title="item.title">{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-dialog>

      </v-toolbar>
      
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <h1 class="display-1">Vuetify Desktop / Mobile navbar example</h1>
            <p>
              A quick demo of how to combine a desktop navigation and a 
              mobile overlay (dialog) navigation menu.
            </p>
            <p>
              Resize the window to see the navbar change to mobile version.
            </p>
            <p>
              My deep gratitude towards the VueJS and Vuetify team!
            </p>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      nav: [
        {
          icon: 'home',
          text: 'Home',
          title: 'Back to Home page',
          active: true
        },
        {
          icon: 'info',
          text: 'About',
          title: 'About this demo',
          active: false
        },
        {
          icon: 'assignment_turned_in',
          text: 'Todos',
          title: 'Some stuff that needs doing',
          active: false
        },
        {
          icon: 'email',
          text: 'Contact',
          title: 'Our Contact info',
          active: false
        }
      ]
    }
  }
}
</script>