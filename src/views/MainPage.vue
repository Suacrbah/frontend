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
              <div @click="$router.push('question/' + question.id)">
                <v-card-title>{{ question.title }}</v-card-title>
                <v-card-text>{{ question.content }}</v-card-text>
              </div>
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
              <div @click="goAnswerDetail(answer)">
                <v-card-title>{{ answer.title }}</v-card-title>
                <v-card-text>{{ answer.content }}</v-card-text>
              </div>
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

          //将answer.content内标签去掉
          for (let i = 0; i < res.data.data.records.length; i++) {
            var item = res.data.data.records[i];  //每个回答
            let str = item.content.split("\\SPLIT\\")[0]; //回答content中html部分

            //以标签来分隔内容
            let arr = str.split(/<.*?>/);
            let len = arr.length;
            var newArr = [];

            //均匀选择
            if (len < 5) {  //当回答很短时
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].length<10) {
                  newArr.push(arr[i]);
                }
              }
            } else {
              for (let i = 0; i < 5; i++) {
                let j = Math.floor((len * i) / 5);

                //除去空的内容
                do {
                  if (arr[j].length > 10) {
                    newArr.push(arr[j]);
                    break;
                  }
                  j = j + 1;
                } while (j < Math.floor((len * (i + 1)) / 5)); //不到达下一段
              }
            }

            // console.log(newArr)
            item.content = newArr.join("    ............    ");
            this.new_answer.push(item);
          }
          this.answer_list = this.answer_list.concat(this.new_answer);
          // console.log(this.answer_list);
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
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
    },

    goAnswerDetail(answer){
      // console.log(answer)
      this.$router.push({
        name: 'AnswerDetail',
        params: {
          answerId: answer.id,
          questionId: answer.questionId
        }
      })
    }
  }
};
</script>