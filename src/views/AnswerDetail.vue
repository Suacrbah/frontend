<template>
  <div>
    <app-bar @change_key_word="change_key_word" :q="key_word"></app-bar>

    <!-- //问题 -->
    <v-card class="mx-auto" max-width="1000">
      <v-card auto-grow class="mx-auto" max-width="1000px">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">{{question.title}}</v-list-item-title>

            <div>
              <span v-if="!readMoreActivated">{{question.content.slice(0, 120)}}</span>
              <br v-if="!readMoreActivated" />
              <a
                class
                v-if="!readMoreActivated && (question.content.length>120) "
                @click="activateReadMore"
              >展开全部</a>
              <span auto-grow="true" v-if="readMoreActivated" v-text="question.content"></span>
              <br v-if="readMoreActivated" />
              <a class v-if="readMoreActivated" @click="disableReadMore">收起</a>
            </div>

            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-card class="my-1" @click="goAllAnswer">
        查看所有回答
      </v-card>

      <!-- //回答作者信息 -->
      <v-card>
        <v-list three-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="answer.avatarUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="answer.username"></v-list-item-title>
              <v-list-item-subtitle v-text="answer.introduction"></v-list-item-subtitle>
              <v-list-item-subtitle
                v-text="answer.likeCount + '人赞同该回答，' + answer.collectCount + '人收藏该回答'"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <!-- //回答内容 -->
      <v-card class="my-1">
        <div v-html="answer.content.split('\\SPLIT\\')[0]"></div>
      </v-card>

      <!-- //点赞，评论，收藏 -->
      {{answer.t_isFixed}}
      <comment :class="{'isFixed': answer.isFixed}" v-bind:id="answer.id" ref="comment" />
    </v-card>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";

export default {
  components: {
    Comment: () => import("@/components/Comment"),
    AppBar
  },
  props: ["questionId"],
  data() {
    return {
      key_word: "",

      answer: {},
      question: {},

      answer_id: "",
      question_id: ""
    };
  },

  created() {
    // console.log(this.$route.params)
    this.answer_id = this.$route.params.answerId;
    this.question_id = this.$route.params.questionId; 
    /*这句可以不用，先请求Answer，从中获得question_id。
    如果在router.push时携带参数，在刷新页面后，就获取不到该参数，这一点不知如何处理，
    因此先采用笨办法
    */

    this.requestAnswer()
    // this.requestQuestion() 
  },

  methods: {
    change_key_word() {
      console.log("answerDetail");
    },

    requestQuestion() {
      this.$axios
        .get("/question/" + this.question_id, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.question = res.data.data;
          console.log(this.question);
        })
        .catch(e => {
          console.log(e);
        });
    },
    requestAnswer() {
      this.$axios
        .get("/answer/" + this.answer_id, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          this.answer = res.data.data;
          console.log(this.answer);

          this.question_id = this.answer.questionId
          this.requestQuestion()
        })
        .catch(e => {
          console.log(e);
        });
    },

    goAllAnswer() {
      this.$router.replace("/question/" + this.question_id);
    }
  }
};
</script>