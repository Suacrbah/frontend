<template>
  <v-card class="mx-auto" max-width="1000px" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          OVERLINE
          <v-btn>标签？？</v-btn>
        </div>
        <v-list-item-title class="headline mb-1">{{question.title}}</v-list-item-title>

        <div>
          <span v-if="!readMoreActivated">{{ question.content ? question.content.slice(0, 200) : "如题" }}</span>
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
      <v-btn @click="writeAnswer()">写回答</v-btn>
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
      readMoreActivated: false
    };
  },
  mounted() {
    // console.log('hello');
    // console.log(this.question);
  },
  methods: {
    activateReadMore() {
      this.readMoreActivated = true;
    },
    disableReadMore() {
      this.readMoreActivated = false;
    },
    writeAnswer() {
      this.$router.push("/question/"+ this.question.id +"/edit");
    }
  }
};
</script>