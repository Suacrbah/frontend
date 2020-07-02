<template>
  <div>
    <app-bar @change_key_word="change_key_word"  :q="key_word"></app-bar>

    <!-- //top -->
    <div id="top"></div>
    <!-- // 菜单按钮 -->
    <v-speed-dial class="menu_btn" v-model="fab" open-on-hover>
      <template v-slot:activator>
        <v-btn x-large v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark color="green" @click="goToBottom">
        <v-icon>mdi-chevron-double-down</v-icon>
      </v-btn>
      <v-btn fab dark color="red" @click="goNext">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn fab dark color="indigo" @click="goPrev">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn fab dark color="blue" @click="goToTop">
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-card id="hello" class="mx-auto" max-width="1000">
      <!-- //问题 -->
      <div>
        <ques-des :total_answer_num="total_answer_num" v-bind:question="question"></ques-des>
      </div>

      <!-- //回答列表 -->
      <v-card
        flat
        outlined
        v-for="(answer,index) in answer_list"
        :key="answer.id"
        :id="'answer'+index"
        ref="cardref"
      >
        <!-- //回答作者信息 -->
        <v-card outlined="true" :id="'ans'+index">
          <v-list three-line>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="answer.avatarUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-black" v-text="answer.username"></v-list-item-title>
                <v-list-item-subtitle class="font-weight-black" v-text="answer.introduction"></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="answer.likeCount + '人赞同该回答，' + answer.collectCount + '人收藏该回答'"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- //回答内容 -->
        <link href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css" rel="stylesheet">
        <v-card outlined="true" class="my-1">
          <div class="markdown-body ma-5" v-html="answer.content.split('\\SPLIT\\')[0]"></div>
        </v-card>
        <!-- //点赞，评论，收藏 -->
        {{answer.t_isFixed}}
        <comment :class="{'isFixed': answer.isFixed}" v-bind:id="answer.id" ref="comment" />
      </v-card>
    </v-card>
    <!-- //bottom -->
    <div id="bottom"></div>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";

export default {
  components: {
    QuesDes: () => import("@/components/questionDes"),
    Comment: () => import("@/components/Comment"),
    AppBar
  },
  data() {
    return {
      key_word: "",
      name: "QuestionDetail",

      questionId: -1,
      question: {}, //问题完整内容（包含用户头像等信息）
      answer_list: [], //回答列表
      page_num: 1, //当前刷新出的回答分页数
      num_per_page: 10, //每页显示的回答数
      total_page_num: 0, //总回答分页数
      total_answer_num: 0,

      isFixed: [],
      offsetTop: {},
      p_top: {},
      clientHeight: 0,
      scrollTop: 0,

      fab: false,
      answer_offset_list: [],
    };
  },
  mounted() {
    this.requestQuestion();
    //初始化回答列表
    this.requestAnswer(this.page_num);

    // 增加监听页面滑动事件
    window.addEventListener("scroll", this.handleScroll);

    for (var i = 0; i < this.answer_list.length; i++) {
      // console.log("hello");
      this.answer_list[i]["isFixed"] = false;
      this.answer_list[i]["t_isFixed"] = false;
      this.answer_list[i]["p_top"] = 0;
      this.answer_list[i]["offsetTop"] = 0;
    }

    this.$nextTick(() => {});
  },
  methods: {
    change_key_word(data) {
      // console.log("这啥啊");
      this.key_word = data.query_key_word;
      this.$router.push({
        name: "Search",
        params: {
          key_word: this.key_word
        }
      });
    },

    requestQuestion() {
      this.questionId = this.$route.params["questionId"];

      this.$axios
        .get("/question/" + this.questionId, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.question = res.data.data;

          console.log(JSON.stringify(this.question));
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    requestAnswer(page_num) {
      this.$axios
        .get(
          "/question/" + this.questionId + "/answers?currentPage=" + page_num,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.total_page_num = res.data.data.pages;
          this.num_per_page = res.data.data.size;
          this.total_answer_num = res.data.data.total;

          this.new_answer = res.data.data.records;

          for (var i = 0; i < this.new_answer.length; i++) {
            // console.log("hello");
            this.new_answer[i]["isFixed"] = false;
            // this.new_answer[i]["t_isFixed"] = false;
            this.new_answer[i]["p_top"] = 1;
            this.new_answer[i]["offsetTop"] = 1;
          }
          this.answer_list = this.answer_list.concat(this.new_answer);

          //将answer_offset_list置空
          this.answer_offset_list = [];
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    nextAnswer(index) {
      let target = "#ans" + index;
      if (target == "#ans" + this.answer_list.length) {
        target = "#bottom";
      }
      let options = {};

      this.$vuetify.goTo(target, options);
      // $vuetify.goTo(target, options);
    },
    preAnswer(index) {
      let target = "#ans" + index;
      if (target == "#ans0") {
        target = "#top";
      }
      let options = {};

      this.$vuetify.goTo(target, options);
    },
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
          // this.show_progress = true;
          this.page_num++;
          this.requestAnswer(this.page_num);
        } else {
          // this.show_progress = false;
        }
      } else {
        // this.show_progress = false;
      }

      this.initHeight();
    },

    initHeight() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.clientHeight = document.documentElement.clientHeight;

      for (var i = 0; i < this.answer_list.length; i++) {
        let cm_id = this.answer_list[i].id;
        let header = document.getElementById("answer" + i);
        let header1 = document.getElementById(cm_id);

        if (this.answer_list[i]["isFixed"] == false) {
          this.answer_list[i]["p_top"] = header.offsetTop;
          this.answer_list[i]["offsetTop"] = header1.offsetTop;
        }
      }

      for (var j = 0; j < this.answer_list.length; j++) {
        let offsetTop = this.answer_list[j]["offsetTop"];
        let p_top = this.answer_list[j]["p_top"];
        let res0 =
          this.scrollTop + this.clientHeight < offsetTop + p_top &&
          p_top + 600 < this.scrollTop + this.clientHeight
            ? true
            : false;

        this.$set(this.answer_list[j], "isFixed", res0);
      }
    },
    goToBottom() {
      this.$vuetify.goTo("#bottom");
    },
    goToTop() {
      this.$vuetify.goTo("#top");
    },
    goNext() {
      //变量scrollTop是滚动条滚动时,距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      var array = new Array();
      if (this.answer_offset_list.length == 0) {
        for (let i = 0; i < this.answer_list.length; i++) {
          let id = "answer" + i;
          array[i] = document.getElementById(id).offsetTop;
        }
        this.answer_offset_list = array;
      } else {
        array = this.answer_offset_list;
      }

      //获得是第几个问题
      var index;
      for (index = 0; index < array.length; index++) {
        if (scrollTop < array[index]) {
          break;
        }
      }
      // console.log(index);
      index = Math.min(index, array.length - 2); //减2来保证index+1不越界

      this.$vuetify.goTo("#answer" + (index + 1));
    },
    goPrev() {
      //变量scrollTop是滚动条滚动时,距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      var array = new Array();
      if (this.answer_offset_list.length == 0) {
        for (let i = 0; i < this.answer_list.length; i++) {
          let id = "answer" + i;
          array[i] = document.getElementById(id).offsetTop;
        }
        this.answer_offset_list = array;
      } else {
        array = this.answer_offset_list;
      }

      //获得是第几个问题
      var index;
      for (index = 0; index < array.length; index++) {
        if (scrollTop < array[index]) {
          break;
        }
      }
      // console.log(index);
      index = Math.max(index, 1); //减2来保证index+1不越界

      this.$vuetify.goTo("#answer" + (index - 1));
    }
  },
  destroyed_1() {
    window.removeEventListener("scroll", this.initHeight);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped >
.box_fixed {
  width: 500px;
  height: 40px;
  border: 2px dashed pink;
  border-radius: 20px;
  margin: 0 auto;
  line-height: 40px;
  background: #eeeeee;
  /* position: absolute; */
}
.bottom_isFixed {
  position: fixed;
  bottom: 0;
  /* z-index: 999; */
}
.isFixed {
  position: fixed;
  bottom: 0;
  /* right: 0; */
  z-index: 10000;
}
.top_isFixed {
  /* color: red */
  position: fixed;
  top: 65px;
  color: darkblue;
  z-index: 999;
}
.menu_btn {
  position: fixed;
  bottom: 20px;
  right: 50px;
}

</style>