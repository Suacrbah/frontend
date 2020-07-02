<template>
  <div class="fill-height back">
    <div class="daily_image_text">
      <span class="text-h6 font-weight-medium white--text">@Bing daily image</span>
    </div>

    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
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

              <v-text-field
                id="email"
                label="Email"
                name="email"
                v-model="form.email"
                prepend-icon="mdi-email"
                type="text"
              ></v-text-field>

              <v-row justify="end">
                <v-btn class="mr-1" color="primary" @click="sendCode()">GetCode</v-btn>
              </v-row>

              <v-text-field
                id="captcha"
                label="verification code"
                name="captcha"
                v-model="form.validCode"
                prepend-icon="mdi-captcha"
                type="captcha"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$router.replace('login')" style="bottom: 12px" color="primary">Login</v-btn>
            <v-btn style="bottom: 12px" color="primary" @click="submitForm()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      res: "",
      form: {
        username: "",
        hashedPassword: "",
        email: "",
        validCode: ""
      }
    };
  },
  props: {
    source: String
  },
  methods: {
    submitForm() {
      if (this.form.validCode === this.res) {
        this.$axios.post("/registry", this.form);
        alert("You are successfully registered!");
        this.$router.push("/login");
      } else {
        alert("Please input the right captha code!");
      }
    },
    sendCode() {
      this.$axios
        .get("/registryValid/" + this.form.email)
        .then(res => {
          this.res = res.data["msg"];
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