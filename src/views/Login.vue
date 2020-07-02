<template>
  <div class="fill-height back">
    <!-- // 每日一圖 -->
    <div class="daily_image_text">
      <span class="text-h6 font-weight-medium white--text">@Bing daily image</span>
    </div>

    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <!-- // Logo -->
        <v-card color="transparent" flat class="mb-5">
          <v-img
            background-color="transparent"
            height="80px"
            width="200px"
            contain
            class="mx-auto"
            :src="require('@/assets/logo.png')"
          ></v-img>
        </v-card>

        <!-- //表单 -->
        <v-card class="elevation-12">
          <v-card-text>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-form>
              <v-text-field
                id="username"
                label="Username"
                name="username"
                v-model="form.username"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="form.hashedPassword"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submitForm()" style="bottom: 12px" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  sname: "Login",
  data() {
    return {
      errors: [],
      form: {
        username: "",
        hashedPassword: ""
      },
      res: ""
    };
  },
  created() {},
  methods: {
    submitForm() {
      const _this = this;

      this.$axios
        .post("/login", this.form)
        .then(res => {
          this.res = res.data;
          if (this.res["code"] === 200) {
            // alert("You have successfully logged in!");

            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;
            _this.$store.commit("set_token", jwt);
            _this.$store.commit("set_userInfo", userInfo);
            //
            // 获取
            console.log(_this.$store.getters.getUser);

            _this.$router.push("/main");
          } else {
            alert("Sorry, you have entered wrong info!");
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
.back {
  background-image: url(https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.daily_image_text {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>