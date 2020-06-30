<template>
  <div>
    <app-bar @change_key_word="change_key_word" :q="key_word"></app-bar>

    <v-card class="mx-auto" max-width="1000">
      <v-card>
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>用户名：{{userinfo.username}}</v-card-title>
        </v-img>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-subtitle class="pb-0">用户简介：{{userinfo.introduction}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>用户邮箱：{{userinfo.email}}</div>

              <div></div>
            </v-card-text>
          </v-list-item-content>
          <v-list-item-avatar color="blue">
            <v-img :src="userinfo.avatarurl"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn color="orange" text @click="editInfo()">Edit Info</v-btn>
        </v-card-actions>
      </v-card>

      <v-card flat class="mx-auto">
        <v-tabs v-model="tab" background-color="blue" dark show-arrows>
          <v-tab v-for="item in items" @click="changeToPage(tab)" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item  in items" :key="item.tab">
            <v-card width="100%" v-for="content in item.contents" :key="content">
              <v-card-title>{{ content.title }}</v-card-title>
              <v-card-text v-html="content.content.split('\\SPLIT\\')[0]" ></v-card-text>
            </v-card>
            <v-pagination
              v-model="item.current_page"
              :length="item.total_page"
              v-on:next="changeToPage(tab)"
              v-on:input="changeToPage(tab)"
            ></v-pagination>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
      key_word:"",
      errors: [],

      userinfo: {
        id: " ",
        avatarurl: "",
        email: " ",
        introduction: " ",
        username: " "
      },
      tab: 0,
      items: [
        {
          tab: "提问",
          contents: [],
          total_page: 1,
          current_page: 1
        },
        {
          tab: "收藏",
          total_page: 1,
          current_page: 1,
          contents: [],
        },
        {
          tab: "回答",
          total_page: 1,
          current_page: 1,
          contents: [],
        }
      ]
    };
  },
  mounted() {
    // 获取用户的问题与回答信息
    // getQA(),
    // 获取用户信息
    this.getUserInfo();
    this.changeToPage(0);
    this.changeToPage(1);
    this.changeToPage(2);
  },

  methods: {
    getQA() {
      // this.$axios
      //     .get('', {headers: {"Authorization": localStorage.getItem("token")}})
      //     .then(res => {
      //       }
      //     )
    },
    getUserInfo() {
      var va = JSON.parse(sessionStorage.getItem("userInfo"));
      // console.log(sessionStorage.getItem("userInfo"));
      // console.log(va["email"]);

      this.userinfo.email = va["email"];
      this.userinfo.id = va["id"];
      this.userinfo.introduction = va["introduction"];
      this.userinfo.username = va["username"];
      this.userinfo.avatarurl = va["avatar_url"];
    },
    changeToPage(id) {
      const _this = this;
      // console.log(id)
      // alert("Now we're in tab " + this.items[id].tab);
      // console.log('/question/my_question?currentPage='+this.items[id].current_page);
      // this.$axios.get('/question/my_question?currentPage='+this.items[id].current_page,

      var req;
      if (this.items[id].tab == "提问") req = "my_question";
      else if (this.items[id].tab == "收藏") req = "my_collection";
      else if (this.items[id].tab == "回答") req = "my_answer";

      var pre_req;
      if (this.items[id].tab == "提问") pre_req = "/question/";
      else if (this.items[id].tab == "收藏") pre_req = "/collection/";
      else if (this.items[id].tab == "回答") pre_req = "/answer/";

      this.$axios
        .get(pre_req + req + "/?currentPage=" + this.items[id].current_page, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res.data);

          _this.items[id].total_page = res.data.data.pages;
          _this.items[id].current_page = res.data.data.current;
          _this.items[id].contents = res.data.data.records;
        })
        .catch(e => {
          this.errors.push(e);
          this.$router.push("/login");
        });
    },
    editInfo() {
      this.$router.push({
        name: "personalInfoEdit",
        params: {}
      });
    },



    change_key_word(data){
      this.key_word = data.query_key_word;
      this.$router.push({
        name: 'Search',
        params:{
          key_word:this.key_word
        }
      });
    }


  }
};
</script>