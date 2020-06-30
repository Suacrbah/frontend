<template>
  <div>
    <app-bar @change_key_word="change_key_word" :q="key_word"></app-bar>

    <v-card class="mx-auto" max-width="1000">
      <!-- //问题 -->
      <div>
        <ques-des v-bind:question="question"></ques-des>
      </div>

      <!-- //回答列表 -->
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
    QuesDes: () => import("@/components/questionDes"),
    Comment: () => import("@/components/Comment"),
    AppBar
  },

  data() {
    return {
      key_word: "",

      answer: {
        id: 2,
        userId: 2,
        questionId: 1,
        content:
          '<span class="RichText ztext CopyrightRichText-richText" itemprop="text"><p>同样是毫无基础，今年5月底六月初的时候开始接触王者荣耀，从零开始玩王者荣耀的人。</p><p class="ztext-empty-paragraph"><br></p><p>1.新手教程看完，自己先玩两把，熟悉下这个游戏。至于什么是红buff。什么是蓝buff。大龙，小龙这些我想不用人教。如果连这个都要人教而游戏里的文字说明你视而不见。真的，不要玩了。。。</p><p>2.如果你只是随便玩玩，那么第一条看完就足够了。如果你认真的，想玩好这个游戏。那你就要改变下对这个游戏的认知，这不是个游戏，对你而言这是一门功课，你要用严谨认真的态度去钻研。</p><p>3.知乎上王者荣耀专栏其实有很多文章的。可以拿来看看。这里推荐 <span><span class="UserLink"><div class="Popover"><div id="Popover18-toggle" aria-haspopup="true" aria-expanded="false" aria-owns="Popover18-content"><a class="UserLink-link" data-za-detail-view-element_name="User" target="_blank" href="//www.zhihu.com/people/bf6ad22696207409e8803e7bab043a53" data-za-detail-view-id="1045">@冯哲</a></div></div></span></span> <span><span class="UserLink"><div class="Popover"><div id="Popover19-toggle" aria-haspopup="true" aria-expanded="false" aria-owns="Popover19-content"><a class="UserLink-link" data-za-detail-view-element_name="User" target="_blank" href="//www.zhihu.com/people/544964d054a5c2f1eed94497f11e61ac" data-za-detail-view-id="1045">@Mr.Poker</a></div></div></span></span> 的一些文章，个人认为对新人非常有帮助。</p><p>4.现在你应该已经搞清楚游戏里有上单，中单，辅助，射手，打野这些位置了。而且你大致应该也知道每个位置都应该最什么了。这时候你不要急着玩。可以去看看主播们怎么玩的。主播太多了不一一列举，个人比较常看张大仙的。有多的时间也可以看看kpl。那些职业玩家怎么玩的。这里要学的是意识。每个时间点他们都在干嘛以及一些英雄在主播手里是怎么玩的。</p><p>5.去训练营，熟悉下常见英雄的技能。</p><p>6.看得多了。结合你的理论知识，应该有点心得了。自己再去玩几把。应该就已经可以上手了。总而言之一句话，多看多悟比一个劲闷着头瞎打要更有效果。</p><p>7.如果想更进一步。就要进一步去研究数据了。比如buff的刷新时间要记清楚。再比如每个英雄、至少是常见英雄的技能的伤害。不说多清楚，至少要大致有个数吧。以及你会不会根据对面的阵容来选择自己的英雄，起到克制对面的效果？</p><p>8、如果还要再进一步。不好意思以我的水平暂时还不知道如何能更进一步。。。</p></span>',
        createTime: "2020-06-26T21:26:53",
        lastUpdateTime: null,
        likeCount: 1,
        collectCount: 2,
        username: "LiGuo",
        introduction: "快乐每一天",
        avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
      },

      question: {
        id: 1,
        userId: 1,
        title: "《王者荣耀》如何从零开始玩好打野？",
        content:
          "我是一个主玩中路的玩家，可是发现好多人抢中路，然后就被支配到其他位置，但是总感觉自己不容易主导比赛，所以想练习打野位置，希望大家可以分享一下自己打野的心得(●—●)。",
        createTime: "2020-06-09T16:24:09",
        lastUpdateTime: "2020-06-21T16:24:04",
        viewCount: 661,
        username: "admin",
        introduction: "a coder",
        avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
      }
    };
  },

  methods: {
    change_key_word() {
      console.log("answerDetail");
    }
  }
};
</script>