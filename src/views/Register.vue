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
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
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
                  
                  <v-row>
                    <v-col cols="9">
                      <v-text-field
                        id="email"
                        label="Email"
                        name="email"
                        v-model="form.email"
                        prepend-icon="mdi-email"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  <v-col  cols="1">
                      <v-btn color="primary" style="top:12px"   @click="sendCode()">GetCode</v-btn>
                  </v-col>
                  </v-row>

                  <v-text-field
                    id="captcha"
                    label="Captcha"
                    name="captcha"
                    v-model="form.captcha"
                    prepend-icon="mdi-captcha"
                    type="captcha"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Registry</v-btn>
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
    name: "Login",
    data() {
      return {
        errors: [],
        res: '', 
        form: {
          username: '',
          hashedPassword: '',
          email: '',
          captcha: '',
        }
      }
    },
    props: {
      source: String,
    },
    methods: {
      sendCode() {
        this.$axios.get('http://192.168.43.145:8889/registryValid/' + this.form.email)
        .then(
          res => {
            this.res = res.data['msg'];
          }
        )
        .catch(e => {
          this.errors.push(e);
        })
      }
    }
  }
</script>