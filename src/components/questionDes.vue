<template>
  <v-card class="mx-auto" max-width="1000px" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="headline mb-1">{{question.title}}</v-list-item-title>

        <div>
          <span
            v-if="!readMoreActivated"
          >{{ question.content ? question.content.slice(0, 200) : "如题" }}</span>
          <br v-if="!readMoreActivated" />
          <br v-if="!readMoreActivated" />
          <a class v-if="!readMoreActivated" @click="activateReadMore">展开全部</a>
          <span v-if="readMoreActivated" v-text="question.content"></span>
          <br v-if="readMoreActivated" />
          <br v-if="readMoreActivated" />
          <a class v-if="readMoreActivated" @click="disableReadMore">收起</a>
        </div>

        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn>关注问题</v-btn>
      <v-btn color="pink lighten-3" @click="writeAnswer()">{{ write_answer_btn_text }}</v-btn>
      <v-btn>邀请回答</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "QuesDes",
  props: ["question"],
  data() {
    return {
      readMoreActivated: false,

      write_answer_btn_text: "写回答", //写回答按钮的文本：“写回答”，“编辑回答”
      answer: null, //如果用户写过回答，则存储该回答内容
    };
  },
  created() {
    //获得当前url
    var array = window.location.href.split("/");
    this.question_id = array[array.length - 1];
    // console.log(this.question);
    // 检查是否回答过该问题
    this.$axios
      .get("/answer/checkExist/" + this.question_id, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        if (res.data.msg == "answer exist") { //回答过
          this.write_answer_btn_text = "编辑回答";
          let answer = res.data.data;
          this.answer = answer.content.split("\\SPLIT\\")[1];
        }
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });
  },
  methods: {
    activateReadMore() {
      this.readMoreActivated = true;
    },
    disableReadMore() {
      this.readMoreActivated = false;
    },
    writeAnswer() {
      this.$router.push({
        name: "QuestionEdit",
        params: {
          questionId: this.question.id,
          answer: this.answer
        }
      });
    }
  }
};
</script>