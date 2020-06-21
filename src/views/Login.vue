<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" >
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    sname: "Login",
    data() {
      return {
        errors: [],
        form: {
          username: '',
          hashedPassword: '',
        },
        res: '',
      }
    },
    methods: {
      submitForm() {
        this.$axios.post('http://192.168.43.145:8889/login', this.form)
        .then(res => {
            this.res = res.data;
              if (this.res['code'] === 200) {
                alert("You have successfully logged in!");
                this.$router.push('/questions');
              } else {
                alert("Sorry, you have entered wrong info!");
              }
          }
        )
        .catch(e => { this.errors.push(e); });
      },
    },
  }
</script>