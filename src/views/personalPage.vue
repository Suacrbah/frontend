<template>
  <div id = "personalPage">
    <app-bar></app-bar>
    <v-card class="mx-auto" max-width="1000">
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
        <v-list-item-avatar tile size="80" color="blue" >
          <v-img :src = userinfo.avatarurl >
          </v-img>
        
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn color="orange" text>Share</v-btn>

        <v-btn color="orange" text>Explore</v-btn>
      </v-card-actions>
    </v-card>
    <v-container class="mx-auto py-0">
      <v-card>
        <v-tabs v-model="tab" background-color="blue" dark show-arrows>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
          
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-list three-line>
              <v-list-item v-for="content in item.contents" :key="content">
                <v-card flat>
                  <v-card-text>{{ content.question }}</v-card-text>
                  <v-card-text>{{ content.answer }}</v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
export default {
  components: { AppBar },
  data() {
    return {
      userinfo:
        {
          id: " ",
          avatarurl:"",
          email:" ",
          introduction:" ",
          username:" "
        }
      ,
      tab: null,
      items: [
        {
          tab: "提问",
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
    this.getUserInfo()

  },

  methods:{
    getQA(){
      // this.$axios
      //     .get('', {headers: {"Authorization": localStorage.getItem("token")}})
      //     .then(res => {

      //       }
      //     )
    },
    getUserInfo(){
      var va = JSON.parse(sessionStorage.getItem("userInfo"))
      console.log(sessionStorage.getItem("userInfo"))
      console.log(va["email"])
      
      this.userinfo.email = va["email"]
      this.userinfo.id = va["id"]
      this.userinfo.introduction = va["introduction"]
      this.userinfo.username = va["username"]
      this.userinfo.avatarurl = va["avatar-url"]

    }
  }
};

</script>