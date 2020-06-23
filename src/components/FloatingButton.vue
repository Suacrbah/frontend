<template>
  <app-card>
    <v-btn
      dark
      fab
      top
      right
      color="white"
      @click="nextAnswer()"
    >
      <v-icon color="blue-grey darken-2">mdi-chevron-double-down</v-icon>
    </v-btn>
  </app-card>
</template>

<script>
export default {
  methods: {
    nextAnswer() {}
  }
}
</script>