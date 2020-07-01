<template>
  <div>
    <!-- 导航栏 -->
    <app-bar @change_key_word="change_key_word" :q="key_word"></app-bar>

    <v-card class="mx-auto mt-2" max-width="75%">
      <!-- //tab名字 -->
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

      <!-- //每个tab内容 -->
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card width="100%">
            <v-card v-for="question in question_list" :key="question.id">
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
            <v-card v-for="answer in answer_list" :key="answer.id">
              <router-link :to="'answer/' + answer.id" tag="v-btn">
                <v-card-title>{{ answer.title }}</v-card-title>
                <v-card-text>{{ answer.content }}</v-card-text>
                <!-- <v-card-text v-html="answer.content">{{ answer.content }}</v-card-text> -->
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
      key_word: "",
      tabs: null,

      question_list: [], //存放主页的问题列表
      new_question: [], //存放新请求的问题列表

      show_progress: false, //控制是否显示上拉刷新进度条
      page_num: 1, //当前刷新出的页面数
      total_page_num: 5, //总页数

      answer_list: [],
      new_answer: [],
      ans_page_num: 1,
      ans_total_page_num: 5
    };
  },
  mounted() {
    // 初始化question_list
    this.requestQuestion(this.page_num);

    this.requestAnswer(this.ans_page_num);
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

      // console.log(this.tabs)
      if (scrollTop + windowHeight >= scrollHeight - 10) {
        // question tab
        if (this.tabs == 0) {
          if (this.page_num < this.total_page_num) {
            this.show_progress = true;
            this.page_num++;
            this.requestQuestion(this.page_num);
          } else {
            this.show_progress = false;
          }
          // answer tab
        } else {
          if (this.ans_page_num < this.ans_total_page_num) {
            this.ans_page_num++;
            this.requestAnswer(this.ans_page_num);
          }
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
          //总页数
          this.total_page_num = res.data.data.pages;

          this.new_question = res.data.data.records;
          this.question_list = this.question_list.concat(this.new_question);
        })
        .catch(e => {
          this.errors.push(e);
          this.$router.push("/login");
        });
    },
    requestAnswer(page_num) {
      this.$axios
        .get("/answer?currentPage=" + page_num, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          //总页数
          this.ans_total_page_num = res.data.data.pages;

          //截取answer.content内容
          var pattern = new RegExp("(?<=<p>).*?(?=</p>)");
          for (let i = 0; i < res.data.data.records.length; i++) {
            var item = res.data.data.records[i];
            var str = item.content;

            // console.log(i, str)
            //提取出某一个<p>标签内容
            var flag = true
            while (flag) {
              var p_matched = pattern.exec(str);
              var p = p_matched ? p_matched[0] : ""; //内容

              // console.log(i, p)
              if(p.search("<img")==-1){
                flag = false
              }else{
                // console.log(p)
                str = str.replace("<p>"+p+"</p>", "")
                // console.log(str)
              }
            }
            //除去<br>
            p = p.split("<br>").join(" ")

            //截取长度
            if (p.length > 200) {
              p = p.slice(0, 200);
            }

            item.content = p;
            this.new_answer.push(item);
          }
          this.answer_list = this.answer_list.concat(this.new_answer);
          // console.log(this.answer_list);
        })
        .catch(e => {
          this.errors.push(e);
          console.log(e);
          this.$router.push("/login");
        });
    },

    change_key_word(data) {
      this.key_word = data.query_key_word;
      this.$router.push({
        name: "Search",
        params: {
          key_word: this.key_word
        }
      });
    }
  }
};
</script>