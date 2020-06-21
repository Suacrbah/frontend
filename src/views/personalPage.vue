<template>
  <div>
    <v-card
            class="mx-auto"
            max-width="1000"
    >
      <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>
      <v-list-item three-line>
          <v-list-item-content>
            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
          </v-list-item-content>
          <v-list-item-avatar
                  tile
                  size="80"
                  color="blue"
          ></v-list-item-avatar>
      </v-list-item>


      <v-card-actions>
          <v-btn
                  color="orange"
                  text
          >
            Share
          </v-btn>

          <v-btn
                  color="orange"
                  text
          >
            Explore
          </v-btn>
      </v-card-actions>
    </v-card>



  </div>
</template>

<script>
    export default {
        data () {

        },
    }
</script>