<template>
  <div>
    <app-bar></app-bar>

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
          <v-list-item-avatar tile size="80" color="blue">
            <v-img :src="userinfo.avatarurl"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn color="orange" text>Share</v-btn>

          <v-btn color="orange" text>Explore</v-btn>
        </v-card-actions>
      </v-card>

      <v-card flat class="mx-auto">
        <v-tabs v-model="tab" background-color="blue" dark show-arrows>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card width="100%" v-for="content in item.contents" :key="content">
              <v-card-title>{{ content.title }}</v-card-title>
              <v-card-text>{{ content.content }}</v-card-text>
            </v-card>
            <v-pagination v-model="item.current_page" :length=item.total_page v-on:next="changeToPage()" 
            v-on:input="changeToPage()"></v-pagination>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
export default {
  components: { AppBar },
  data() {
    return {
      
      errors: [],

      userinfo: {
        id: " ",
        avatarurl: "",
        email: " ",
        introduction: " ",
        username: " ",
      },
      tab: null,
      items: [
        {
          tab: "提问",
          contents: [],
          total_page: 1,
          current_page:1,
        },
        {
          tab: "收藏",
          contents: [
            {
              question: "问题1",
              answer: "简介"
            },
            {
              question: "问题2",
              answer: "简介"
            }
          ]
        },
        {
          tab: "回答",
          contents: [
            {
              question: "问题1",
              answer: "简介"
            },
            {
              question: "问题2",
              answer: "简介"
            },
            {
              question: "问题3",
              answer: "简介"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    // 获取用户的问题与回答信息
    // getQA(),
    // 获取用户信息
    this.getUserInfo();
    this.changeToPage();
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
      console.log(sessionStorage.getItem("userInfo"));
      console.log(va["email"]);

      this.userinfo.email = va["email"];
      this.userinfo.id = va["id"];
      this.userinfo.introduction = va["introduction"];
      this.userinfo.username = va["username"];
      this.userinfo.avatarurl = va["avatar-url"];
    },
    changeToPage(){
        const _this=this;
        console.log('http://192.168.43.145:8889/question/my_question?currentPage='+this.items[0].current_page);
        this.$axios.get('http://192.168.43.145:8889/question/my_question?currentPage='+this.items[0].current_page,
        {
            headers:{
                "Authorization": localStorage.getItem("token")

            }
        }
        ).then(res=>{
            console.log(res.data);
            
            _this.items[0].total_page = res.data.data.pages;
            _this.items[0].current_page = res.data.data.current;
            _this.items[0].contents = res.data.data.records;
        }).catch(e => {this.errors.push(e);});
    }
  }
};
</script>