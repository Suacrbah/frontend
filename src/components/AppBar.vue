<template>
  <v-app-bar flat app dark class="primary">
    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="90"
          width="90"
          max-width="90"
          @click="$vuetify.goTo(0)"
        />
        <!-- <v-toolbar-title class="headline">
          <span class="font-weight-bold">BeHoo</span>
        </v-toolbar-title> -->

        <v-btn class="hidden-sm-and-down" text @click="toMain()">首页</v-btn>

        <!-- <v-btn class="hidden-sm-and-down" text @click="addQuestion">提问</v-btn> -->

        <v-dialog v-model="dialog" scrollable max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="hidden-sm-and-down" text v-on="on" v-bind="attrs">提问</v-btn>
          </template>
          <v-card>
            <v-card-title>请输入你要提的问题，尽量详细</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-textarea
                auto-grow="true"
                label="请输入问题的标题"
                single-line="true"
                rows="1"
                v-model="question_title"
              ></v-textarea>
              <v-textarea
                auto-grow="true"
                label="请输入问题的具体描述"
                single-line="true"
                outlined="true"
                v-model="question_decription"
              ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="submitQuestion">提交</v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">退出</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>

        <v-text-field
          flat
          hide-details
          solo-inverted
          label="输入您要搜索的问题"
          style="max-width: 300px;"
          v-model="q"
        />
        <v-btn dark icon @click="search()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu bottom left :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-avatar>
                <img :src="avatarURL" />
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="toPage(i)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      errors: [],
      items: [
        { title: "个人中心" },
        { title: "退出登录" }
      ],
      dialog: false,

      questionId: "",

      avatarURL: "",

      question_title: "",

      question_decription: ""
    };
  },
  props: {
    q: String
  },

  mounted() {
    this.getAvatar();
  },

  methods: {
    toMain() {
      this.$router.push("/main");
    },
    toPage(i) {
      const _this = this;
      if (i == 0) {

        this.$router.push("/personalpage");
      } else if (i == 1) {
        this.$axios.get('/logout', {
        headers:{
          Authorization: localStorage.getItem("token")
        }
        }).then(() => {
          localStorage.clear();
          sessionStorage.clear();
          _this.$router.push("/login");
        })
        .catch(e => this.errors.push(e));
      }
    },

    search() {
      let data = {
        query_key_word: this.q
      };
      this.$emit("change_key_word", data);
      console.log(data.query_key_word);
    },

    getAvatar() {
      this.avatarURL = JSON.parse(sessionStorage.getItem("userInfo"))[
        "avatar_url"
      ];
    },

    submitQuestion() {
      // alert("提交成功")
      var formdata = new FormData();
      formdata.append("title", this.question_title);
      formdata.append("content", this.question_decription);

      this.$axios
        .post("/question/add", formdata, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.questionId = res.data.data.id;
          this.dialog = false;
          // this.reload();
          this.$router.push({
            name: "QuestionDetail",
            params: { questionId: this.questionId }
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>