<template>
  <div>
    <app-bar></app-bar>

    <v-card class="mx-auto" max-width="1000">
      <v-card>
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://pic1.zhimg.com/80/v2-e12dfbf5719f16830e25882c85661a5d_r.jpg"
        ></v-img>
      </v-card>

      <v-card class="mt-n14 ml-10" width="164" elevation="0">
        <v-card class="px-1 py-1" @click="submit()">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg">
            <v-overlay absolute :value="true">
              
          <v-icon color="white">mdi-camera</v-icon><span> 编辑头像</span>
            </v-overlay>
          </v-img>
        </v-card>
      </v-card>

      <v-card-actions>
        <v-btn color="orange" text @click="submit()">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import AppBar from "../components/AppBar";

export default {
  components: {
    AppBar
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log(this.userInfo);
  },
  methods: {
    submit() {
      alert("Hello");
    }
  }
};
</script>
