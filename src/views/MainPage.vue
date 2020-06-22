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
              <v-card-text>{{ question.content }}</v-card-text>
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
      tabs: null,

      questions_list: [], //存放主页的问题列表
      new_question: [],       //存放新请求的问题列表

      show_progress: false, //控制是否显示上拉刷新进度条
      page_num: 1, //当前刷新出的页面数
      num_per_page: 10, //每页显示的问题或回答数
      total_page_num: 5, //总页数

      //静态数据，用于测试
      questions_list_tmp: [
        {
          id: 1,
          title: "2020 年 6 月 21 日中国全境可观测的金环日食，你看到了吗？",
          view_count: 39800000,
          content:
            "观测日食要注意防护哦~ 观测方法、时间和地点可预先服用：对于 2020 年 6 月 21 日在中国全境可观测的金环日食，有哪些观测建议?"
        },
        {
          id: 2,
          title: "《三体Ⅱ 黒暗森林》2020 年 6 月 18 日在日本发售，反响如何?",
          view_count: 8360000,
          content:
            "2020 年 6 月 18 日，日本正式发售《三体Ⅱ 黒暗森林》，反响如何? 能否达到第一部发售的盛况?"
        },
        {
          id: 3,
          title:
            "如何看待聊城冒名顶替上学者被撤职，其同事却称「举报者做得太绝」？",
          view_count: 6420000,
          content:
            "山东聊城的王丽丽（曾用名王丽）1996 年考取聊城农业学校，后被人顶替。6 月 17 日，顶替者的同事称，王丽是该街道办党委委员负责组织工作（副科级），被撤职已经得到应有的处分，但现在两败俱伤，双方应提前协调。 感觉生活中有很多这样听「看似很有同理心」实则强盗至极的逻辑啊，但是很多人并没有当事人这么清醒。如何评价这种现象？遇到这类事情应该如何反击、最大化合理索取自己的权益？ 附背景资料："
        },
        {
          id: 4,
          title: "为什么华农兄弟不膨胀?",
          view_count: 6310000,
          content:
            "如题，华农兄弟作为农户有了大量的粉丝，好像却看不出有什么膨胀的地方，或者飘了之类的，咱黄金晋级赛成功了都恨不得全世界都知道，人或多或少都会有些虚荣心吧，似乎有些不合理?"
        },
        {
          id: 5,
          title:
            "如何看待百事食品公司出现新冠确诊病例，87 人被隔离已停产停业？可能会带来多大范围的影响？?",
          view_count: 6310000,
          content:
            "百事中国声明：百事可乐饮料厂无确诊病例，正常生产供货 新京报讯（记者 王子扬）6 月 21 日，针对旗下工厂出现确诊病例一事，百事中国在官方微博发布声明表示，包括北京百事可乐饮料有限公司在内的、生产百事可乐等饮料产品的全国各百事各灌装厂迄今为止并未发现任何新冠肺炎确诊病例。北京新冠发布会通报发生疫情个案的工厂只是位于北京大兴区磁魏路 1 号的百事食品一个分厂，其从未生产任何饮料产品。 百事中国表示，百事饮料的灌装厂生产经营一直有序开展，未曾停产停业，百事全系列饮料产品符合国家各项标准，一直依法正常供应。 新京报记者了解，此次出现确诊病例的这家食品公司为百事公司旗下的大兴磁魏路分厂，为薯片等膨化食品、粮食加工品的生产厂。百事公司大中华区集团事务部企宣总监樊志敏在发布会上通报，公司出现确诊病例后，已第一时间启动应急预案，采取停产停工，产品封存、环境消杀、人员隔离等措施，已经对产品及常去环境进行了全方位取样调查。 另外，百事公司旗下北京百事可乐饮料有限公司的地址在大兴区，股权结构显示，北京百事可乐的控股股东为百事（中国）投资有限公司，占 65% 股份；北京一轻控股有限责任公司占 35% 股份，该公司也是北京北冰洋食品有限公司、北京义利食品有限公司的 100% 控股股东。6 月 21 日，北京一轻食品集团公司发布澄清声明称，旗下义利或北冰洋工厂没有发生任何疫情，公司为全体员工进行核酸检测，检测结果 100% 为阴性。 新京报记者 王子扬百事中国声明：百事可乐饮料厂无确诊病例，正常生产供货 今天下午，北京市新型冠状病毒肺炎疫情防控工作第 128 场新闻发布会上，百事公司大中华区集团事务部企宣总监樊志敏通报，公司出现确诊病例后，已经第一时间启动应急预案，采取停产停工，产品封存、环境消杀、人员隔离等措施，已经对产品及常去环境进行了全方位取样调查。百事可乐公司出现确诊病例，已停产停业"
        }
      ]
    };
  },
  created() {
    //页面创建时调用
    //-----------debug------------
    //扩充questions_list_tmp到50个元素
    for (let i = 0; i < 9; i++) {
      this.questions_list_tmp = this.questions_list_tmp.concat(
        this.questions_list_tmp.slice(0, 5)
      );
    }
    //-----------debug------------

    // 初始化questions_list
    this.requestQuestion(this.page_num);

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
        if (this.page_num <= this.total_page_num) {
          this.show_progress = true;
          this.requestQuestion(this.page_num);
          this.page_num++;
        } else {
          this.show_progress = false;
        }
      } else {
        this.show_progress = false;
      }
    },
    //向服务器请求新的问题
    requestQuestion(page_num) {
      // return this.questions_list_tmp.slice(
      //   (page_num - 1) * this.num_per_page,
      //   page_num * this.num_per_page
      // );
      this.$axios
        .get(
          "/question?currentPage=" + page_num,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          this.new_question = res.data.data.records;
          this.questions_list = this.questions_list.concat(this.new_question);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>