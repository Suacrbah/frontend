<template>
  <div>
    <!-- 导航栏 -->
    <app-bar @change_key_word="change_key_word" :q="key_word"></app-bar>

    <v-card class="mx-auto mt-2" width="75%">
      <v-tabs v-model="tabs">
        <v-tabs-slider></v-tabs-slider>
        <v-tab grow>
          <span>Questions</span>
          <v-icon>mdi-history</v-icon>
        </v-tab>
        <v-tab grow>
          <span>Answers</span>
          <v-icon>mdi-heart</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card width="100%">
            <v-card v-for="question in questions_list" :key="question.id">
              <router-link :to="'question/' + question.id" tag="v-btn">
                <v-card-title>{{ question.title }}</v-card-title>
                <v-card-text>{{ question.content }}</v-card-text>
              </router-link>
            </v-card>

            <v-progress-linear
              color="light-blue"
              height="10"
              background-opacity="0.10"
              indeterminate
              striped
              :active="show_progress"
            ></v-progress-linear>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card width="100%">
            <v-card-text>Answers</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";

export default {
  components: { AppBar },
  data() {
    return {
      key_word:"",
      tabs: null,

      questions_list: [], //存放主页的问题列表
      new_question: [], //存放新请求的问题列表

      show_progress: false, //控制是否显示上拉刷新进度条
      page_num: 1, //当前刷新出的页面数
      num_per_page: 10, //每页显示的问题或回答数
      total_page_num: 5, //总页数

      
    };
  },
  mounted() {
    //页面创建时调用
    //-----------debug------------
    
    //-----------debug------------

    // 初始化questions_list
    this.requestQuestion(this.page_num);
    // this.questions_list = this.questions_list.slice(0,2);

    // 增加监听页面滑动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      //变量scrollTop是滚动条滚动时,距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (this.page_num < this.total_page_num) {
          this.show_progress = true;
          this.page_num++;
          this.requestQuestion(this.page_num);
        } else {
          this.show_progress = false;
        }
      } else {
        this.show_progress = false;
      }
    },
    //向服务器请求新的问题
    requestQuestion(page_num) {
      
      this.$axios
        .get("/question?currentPage=" + page_num, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.new_question = res.data.data.records;
          this.questions_list = this.questions_list.concat(this.new_question);
        })
        .catch(e => {
          this.errors.push(e);
          this.$router.push('/login');
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