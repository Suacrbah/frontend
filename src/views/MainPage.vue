<template>
  <div>
    <!-- 导航栏 -->
    <app-bar></app-bar>

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
              <v-card-title>{{ question.title }}</v-card-title>
              <v-card-text>{{ question.content_description }}</v-card-text>
            </v-card>
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
      tabs: null,
      topNav: "recent",

      questions_list: [
        {
          id: 1,
          title: "2020 年 6 月 21 日中国全境可观测的金环日食，你看到了吗？",
          view_count: 39800000,
          content_description:
            "观测日食要注意防护哦~ 观测方法、时间和地点可预先服用：对于 2020 年 6 月 21 日在中国全境可观测的金环日食，有哪些观测建议?"
        },
        {
          id: 2,
          title: "《三体Ⅱ 黒暗森林》2020 年 6 月 18 日在日本发售，反响如何?",
          view_count: 8360000,
          content_description:
            "2020 年 6 月 18 日，日本正式发售《三体Ⅱ 黒暗森林》，反响如何? 能否达到第一部发售的盛况?"
        },
        {
          id: 3,
          title:
            "如何看待聊城冒名顶替上学者被撤职，其同事却称「举报者做得太绝」？",
          view_count: 6420000,
          content_description:
            "山东聊城的王丽丽（曾用名王丽）1996 年考取聊城农业学校，后被人顶替。6 月 17 日，顶替者的同事称，王丽是该街道办党委委员负责组织工作（副科级），被撤职已经得到应有的处分，但现在两败俱伤，双方应提前协调。 感觉生活中有很多这样听「看似很有同理心」实则强盗至极的逻辑啊，但是很多人并没有当事人这么清醒。如何评价这种现象？遇到这类事情应该如何反击、最大化合理索取自己的权益？ 附背景资料："
        },
        {
          id: 4,
          title: "为什么华农兄弟不膨胀?",
          view_count: 6310000,
          content_description:
            "如题，华农兄弟作为农户有了大量的粉丝，好像却看不出有什么膨胀的地方，或者飘了之类的，咱黄金晋级赛成功了都恨不得全世界都知道，人或多或少都会有些虚荣心吧，似乎有些不合理?"
        }
      ]
    };
  }
};
</script>