<template>
  <v-card id="hello" class="mx-auto" max-width="1000">
    <!-- //问题 -->
    <div>
      <ques-des v-bind:question="question"></ques-des>
    </div>

    <v-card class="my-1">
      <span>{{ total_answer_num }}</span>
    </v-card>

    <!-- //回答列表 -->
    <div id="top"></div>
    <v-card
      v-for="(answer,index) in answer_list"
      :key="answer.id"
      :id="answer.id+'0'"
      ref="cardref"
    >
      <!-- //回答作者信息 -->
      <v-card :id="'ans'+index">
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

      <!-- <v-icon color="blue-grey darken-2">mdi-chevron-double-down</v-icon> -->
      <!-- //下一个回答按钮:class="{'top_isFixed': answer.t_isFixed}"?? -->
      <!--  -->
      <v-card v-bind:id="answer.id + '1'" :class="{'top_isFixed': answer.t_isFixed}">
        {{answer.t_isFixed}}  
        <v-btn  dark fab top right @click="nextAnswer(index+1)">Next</v-btn>
        <v-btn  white fab top @click="preAnswer(index-1)">Pre</v-btn>
      </v-card>

      <!-- //回答内容 -->
      <v-card class="my-1">
        <div v-html="answer.content.split('\\SPLIT\\')[0]"></div>
      </v-card>
      <!-- //点赞，评论，收藏 -->
      <!-- <comment :class="{'bottom_isFixed': answer.b_isFixed}" v-bind:id="answer.id" ref="comment" /> -->
      {{answer.t_isFixed}}
      
      <comment :class="{'isFixed': answer.isFixed}" v-bind:id="answer.id" ref="comment" />
    </v-card>
    <div id="bottom"></div>
  </v-card>
</template>

<script>
export default {
  components: {
    QuesDes: () => import("@/components/questionDes"),
    Comment: () => import("@/components/Comment")
  },
  data() {
    return {
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

      //静态数据s，用于测试
      answer_list_debug: [
        {
          id: 1,
          userId: 1,
          questionId: 1,
          content:
            '<span class="RichText ztext CopyrightRichText-richText" itemprop="text"><p>如何玩好打野一直是众多玩家最苦恼的问题，线上英雄拥有明确的清线任务，全场只要保持先清线再支援的节奏即可。</p><p><b>而打野位难就难在没有明确的方向，GANK、反蹲或是控龙都非常考验玩家的判断。</b></p><p>今天Alex就跟大家分享一下打野玩家必须要掌握的大局观，谈谈如何GANK才能提高成功率！</p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/50/v2-1b045b9d356f74f92563c24285f63d0a_hd.jpg" data-caption="" data-size="normal" data-rawwidth="1280" data-rawheight="720" data-default-watermark-src="https://pic4.zhimg.com/50/v2-00ddb590761bbc4838783830e034cf7a_hd.jpg" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-1b045b9d356f74f92563c24285f63d0a_r.jpg"/></noscript><img src="https://pic3.zhimg.com/80/v2-1b045b9d356f74f92563c24285f63d0a_720w.jpg" data-caption="" data-size="normal" data-rawwidth="1280" data-rawheight="720" data-default-watermark-src="https://pic4.zhimg.com/50/v2-00ddb590761bbc4838783830e034cf7a_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="1280" data-original="https://pic3.zhimg.com/v2-1b045b9d356f74f92563c24285f63d0a_r.jpg" data-actualsrc="https://pic3.zhimg.com/50/v2-1b045b9d356f74f92563c24285f63d0a_hd.jpg" data-lazy-status="loading"></figure><p><b>一、称职的打野到底要做好哪些事情？</b></p><p><b>①抓人--创造以多打少的机会</b></p><p>打野和辅助是场上的游走位，前中期去抓谁？什么时候抓？基本都由打野决定。</p><p>打野的支援首先上是给予队友伤害方面的支持，其次就是两人可以分担防御塔的伤害，相互合作可以顺利完成越塔强杀。</p><p><b>②推塔 --防御塔是敌方野区的保护伞</b></p><p><b>一波GANK最理想的情况就是成功完成击杀，但能把对面“打回家”，某种意义上来说也算一次成功的GANK。</b></p><p>一座防御塔比一个人头要重要的多，每推一座防御塔，敌方的视野和防守范围就会缩小一部分。</p><p><b>其次摧毁一座防御塔全体能增加230点经验，两分钟暴君的经验加成为300左右（随时间成长），即等同于2/3条暴君。</b></p><p>因此四分钟前每推掉一座防御塔能带来半级左右的等级优势，即对于打野来说：防御塔＞控龙＞击杀＞反野。</p><p><b>③野区及公共资源的掌控</b></p><p>反野的意义在于压制敌方打野的经济和等级；控制暴君可以为队友提升经验和经济，前期更容易在线上打出优势。</p><p>黑暗暴君能增加队友的输出能力；主宰可以提供三路主宰先锋，提升己方的推进能力。</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/50/v2-8489c311e461709ddc1e0cabc59a9bf5_hd.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="452" data-default-watermark-src="https://pic4.zhimg.com/50/v2-2f649e838071e92eabc74bc77d12158c_hd.jpg" class="origin_image zh-lightbox-thumb" width="800" data-original="https://pic1.zhimg.com/v2-8489c311e461709ddc1e0cabc59a9bf5_r.jpg"/></noscript><img src="https://pic4.zhimg.com/80/v2-8489c311e461709ddc1e0cabc59a9bf5_720w.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="452" data-default-watermark-src="https://pic4.zhimg.com/50/v2-2f649e838071e92eabc74bc77d12158c_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="800" data-original="https://pic1.zhimg.com/v2-8489c311e461709ddc1e0cabc59a9bf5_r.jpg" data-actualsrc="https://pic4.zhimg.com/50/v2-8489c311e461709ddc1e0cabc59a9bf5_hd.jpg" data-lazy-status="loading"></figure><p>那么一个打野玩家如何做好这些事情呢？</p><p><b>关键就在于对敌方打野位置的把控，通过推断敌方打野的位置来创造时间差、人数差和空间差。</b></p><p>举个稍微夸张点的例子，假如给你开个全图外挂，让你玩打野能不能打出节奏？</p><p>很显然肯定可以，当你知道对面下路只有一人没有支援的时候，你就敢配合队友越塔强抓；</p><p>当你知道敌方大部分人都在暴君路时，你就敢直接开主宰。</p><p><b>所以也许你看过了很多攻略、咨询了不少打野大神，但你却依旧玩不好打野，核心问题就出在对位置感的把控不够。</b></p><p>你没有加入这部分思考就会出现：每次去Gank对面就躲塔下，反蹲半天也没有人来的情况。</p><p>而当你能猜到敌方打野的位置时，你的每一次GANK都会有收获，反蹲的成功率也会更高。</p><p><b>二、如何推测出敌方打野英雄的位置？</b></p><b><figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/50/v2-9587c5395dd95ffbdc30f1ea66fe4639_hd.jpg" data-caption="" data-size="normal" data-rawwidth="1280" data-rawheight="720" data-default-watermark-src="https://pic3.zhimg.com/50/v2-8e419e7f25d306c6e41738e0d296b59d_hd.jpg" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-9587c5395dd95ffbdc30f1ea66fe4639_r.jpg"/></noscript><img src="https://pic2.zhimg.com/80/v2-9587c5395dd95ffbdc30f1ea66fe4639_720w.jpg" data-caption="" data-size="normal" data-rawwidth="1280" data-rawheight="720" data-default-watermark-src="https://pic3.zhimg.com/50/v2-8e419e7f25d306c6e41738e0d296b59d_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="1280" data-original="https://pic2.zhimg.com/v2-9587c5395dd95ffbdc30f1ea66fe4639_r.jpg" data-actualsrc="https://pic2.zhimg.com/50/v2-9587c5395dd95ffbdc30f1ea66fe4639_hd.jpg" data-lazy-status="loading"></figure></b><p><b>方法①：开局需要辅助来判断敌方打野开局</b></p><p>确定敌方打野到底是什么BUFF开，实际上是需要辅助去做视野的，如果辅助没有这个意识只能靠猜。</p><p>由于“开局偷熊”套路的流行，大部分打野都会选择红BUFF或者熊开，因此没有获取到视野的情况下可以假定敌方红开抓下。</p><p><b>方法②：根据敌方打野第一波GANK路线反推</b></p><p>1分50秒左右，如果敌方打野在上路出现大概率就是蓝BUFF开，如果在下路出现就是红BUFF开。</p><p><b>那么游戏时间2分15秒-30秒期间，敌方打野就会出现在开局BUFF的位置。</b></p><p>刷第二圈野怪大约耗时50秒左右，你可以根据这个时间，实时判断对面打野的位置来找出多打少的机会。</p><p><b>方法③：根据敌方打野身上BUFF留存情况判断</b></p><p>有时候对面打野会在小地图上露头，此时通过拖屏查看战场情况的时候，记得留意一下他身上有什么Buff。</p><p><b>比如敌方打野带着队友准备强推上路一塔，通过拖屏你看见他身上只有一个红BUFF。</b></p><p>那么就代表敌方蓝BUFF已经或即将刷新了，此时你要么第一时间支援上路，要么直接进敌方蓝BUFF野区反野止损。</p><p><b>反过来说，如果他在没有反掉你家BUFF的情况下拥有双BUFF，那么你过去反野的这个动作就会扑空。</b></p><p><b>方法④：根据敌方辅助的位置判断</b></p><p>中高端局大部分辅助都是跟打野的，这点大家开局可以观察一下敌方辅助的习惯。</p><p><b>辅助英雄需要探视野所以会频繁在小地图出现，而野辅往往是绑定在一起的。</b></p><p>比如看到敌方辅助在下图河道草丛卡视野，那么就代表敌方打野大概率在蓝BUFF野区。</p><figure data-size="normal"><noscript><img src="https://pic4.zhimg.com/50/v2-0a271dafbf47c743eb37c266ac1044a6_hd.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="450" data-default-watermark-src="https://pic3.zhimg.com/50/v2-9e3659c229a496efd3f02fddab01a110_hd.jpg" class="origin_image zh-lightbox-thumb" width="800" data-original="https://pic4.zhimg.com/v2-0a271dafbf47c743eb37c266ac1044a6_r.jpg"/></noscript><img src="https://pic4.zhimg.com/80/v2-0a271dafbf47c743eb37c266ac1044a6_720w.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="450" data-default-watermark-src="https://pic3.zhimg.com/50/v2-9e3659c229a496efd3f02fddab01a110_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="800" data-original="https://pic4.zhimg.com/v2-0a271dafbf47c743eb37c266ac1044a6_r.jpg" data-actualsrc="https://pic4.zhimg.com/50/v2-0a271dafbf47c743eb37c266ac1044a6_hd.jpg" data-lazy-status="loading"></figure><p>只要能推测出对面打野的位置，那么主动权就在你手上，这也衍生出了打野的两种打法方向：</p><p><b>（1）己方野辅前期强势--针对型打法</b></p><p>常见的前期强势野辅组合：裴擒虎、百里玄策、刘备、雅典娜、鬼谷子、牛魔、东皇太一、苏烈</p><p>前期阵容占优的时候便可以主动出击，寻找本局比赛的突破口，一定要疯狂针对一路。</p><p><b>很多打野喜欢“雨露均沾”型打法，上路抓一次、然后下路抓一次，实际上这种打法的收益没有针对一路来得高。</b></p><p>选择了针对就一定要做到极致，第一波成功了抓掉射手，那么下一波就继续到红BUFF埋伏，连抓两次就能让他完全守不住附近野区。</p><p><b>（2）己方野辅前期劣势--空间OR反蹲型打法</b></p><p>当你前期处于劣势时，一定要躲着敌方打野打，而这点就需要利用前面我们提到的判断敌方打野的位置。</p><p><b>比如你推测敌方打野在敌方红区，那你就尝试抓对面下路或者反对面蓝区，不要选择跟对手正面刚。</b></p><p>除此之外，当你能预估到敌方打野的GANK路线时，可以组织队友提前反蹲。</p><p><b>三、帮助你打出节奏的五个小技巧</b></p><p><b>（1）S14赛季打野开局思路</b></p><p><b>①控龙效率高的打野英雄</b></p><p>比如刘备、裴擒虎四级控龙速度快，以及韩信、孙悟空这一类铭文携带10夺萃开龙不会有损耗的打野。</p><p><b>在进入游戏加载页面的时候，首先看清楚是自己是蓝色方还是红色方。</b></p><p>己方处于蓝方那么暴君就在下路，打字让辅助帮忙看下魔种熊，蓝BUFF开顺着野区刷一圈到四级。</p><p><b>随后下路GANK一波，抓不死也无所谓只要把对面赶跑就行，然后迅速拿下第一条暴君。</b></p><figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/50/v2-5123e16cf7383cda3588cedb991f097d_hd.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="447" data-default-watermark-src="https://pic1.zhimg.com/50/v2-0ae2ee018e6075b61e2d3717eda12a88_hd.jpg" class="origin_image zh-lightbox-thumb" width="800" data-original="https://pic4.zhimg.com/v2-5123e16cf7383cda3588cedb991f097d_r.jpg"/></noscript><img src="https://pic1.zhimg.com/80/v2-5123e16cf7383cda3588cedb991f097d_720w.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="447" data-default-watermark-src="https://pic1.zhimg.com/50/v2-0ae2ee018e6075b61e2d3717eda12a88_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="800" data-original="https://pic4.zhimg.com/v2-5123e16cf7383cda3588cedb991f097d_r.jpg" data-actualsrc="https://pic1.zhimg.com/50/v2-5123e16cf7383cda3588cedb991f097d_hd.jpg" data-lazy-status="loading"></figure><p><b>这样己方上单会比对面射手更快到达四级，上路的压力不会那么大，这种开局节奏思路比抓人来的更加稳定一些。</b></p><p>如果处于红方暴君就在上路，那么就魔种熊开局刷一圈抓上路，打法思路是一样的只是换了个野怪点开局。</p><p><b>②控龙效率低、但GANK能力强的打野</b></p><p>比如赵云、娜可露露四级开龙血量损耗都是非常大的，一旦对面过来抢就会非常危险。</p><p>包括阿轲、兰陵王、百里玄策这几位前期抓人成功率极高的打野，全部建议魔种熊开局，然后第一波GANK抓上路。</p><p><b>（2）四个最容易GANK成功的时间点</b></p><p>打野想要提高GANK和反蹲的成功率，关键在于看着兵线抓，大家要记住兵线交汇的时候就是最好的抓人时机。</p><p><b>反过来说在没有兵线的时间段抓人，你会发现对面一直躲在塔下，蹲了半天也蹲不到人。</b></p><p>兵线每33秒刷新一次，双方兵线的行进位置是对称的，这点大家可以自己关注小地图。</p><figure data-size="normal"><noscript><img src="https://pic3.zhimg.com/50/v2-c3ab687e93682c2209ac2c1e6a6432b0_hd.jpg" data-caption="" data-size="normal" data-rawwidth="628" data-rawheight="298" data-default-watermark-src="https://pic1.zhimg.com/50/v2-3cf8ffff4230cca90208c0f068ef0e42_hd.jpg" class="origin_image zh-lightbox-thumb" width="628" data-original="https://pic1.zhimg.com/v2-c3ab687e93682c2209ac2c1e6a6432b0_r.jpg"/></noscript><img src="https://pic3.zhimg.com/80/v2-c3ab687e93682c2209ac2c1e6a6432b0_720w.jpg" data-caption="" data-size="normal" data-rawwidth="628" data-rawheight="298" data-default-watermark-src="https://pic1.zhimg.com/50/v2-3cf8ffff4230cca90208c0f068ef0e42_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="628" data-original="https://pic1.zhimg.com/v2-c3ab687e93682c2209ac2c1e6a6432b0_r.jpg" data-actualsrc="https://pic3.zhimg.com/50/v2-c3ab687e93682c2209ac2c1e6a6432b0_hd.jpg" data-lazy-status="loading"></figure><p><b>边路最容易GANK成功的时间点是：第三、四、六和七波兵线汇合时间，分别对应：1分40秒、2分13秒，3分19秒和3分53秒。</b></p><p>在这四个时间点即将到来的前十秒，如果你不知道该做什么事情，请迅速赶去边路反蹲。</p><p><b>如下图所示：第七波兵线即将汇合，3分45秒我带着辅助到上路反蹲。</b></p><figure data-size="normal"><noscript><img src="https://pic1.zhimg.com/50/v2-f2c832a14de101056d87fd3a6559f694_hd.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="450" data-default-watermark-src="https://pic1.zhimg.com/50/v2-21041a71ad9d05e96b6c8dd5b8131754_hd.jpg" class="origin_image zh-lightbox-thumb" width="800" data-original="https://pic3.zhimg.com/v2-f2c832a14de101056d87fd3a6559f694_r.jpg"/></noscript><img src="https://pic1.zhimg.com/80/v2-f2c832a14de101056d87fd3a6559f694_720w.jpg" data-caption="" data-size="normal" data-rawwidth="800" data-rawheight="450" data-default-watermark-src="https://pic1.zhimg.com/50/v2-21041a71ad9d05e96b6c8dd5b8131754_hd.jpg" class="origin_image zh-lightbox-thumb lazy" width="800" data-original="https://pic3.zhimg.com/v2-f2c832a14de101056d87fd3a6559f694_r.jpg" data-actualsrc="https://pic1.zhimg.com/50/v2-f2c832a14de101056d87fd3a6559f694_hd.jpg" data-lazy-sta... (10024 total length)',
          createTime: "2020-06-05T21:26:46",
          lastUpdateTime: null,
          likeCount: 1,
          collectCount: 0,
          username: "admin",
          introduction: "a coder",
          avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
        },
        {
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
        {
          id: 6,
          userId: 4,
          questionId: 1,
          content:
            '<p>我不玩<br />\n<img src="http://120.25.212.67:8205/images/YuanFuYan_3af6ed535f511c9af275a6e4d130e455fbe_hd.jpg" alt="6ed535f511c9af275a6e4d130e455fbe_hd.jpg" /></p>\n<hr />\n<p>这是一条分界线</p>\n\\SPLIT\\我不玩\n![6ed535f511c9af275a6e4d130e455fbe_hd.jpg](http://120.25.212.67:8205/images/YuanFuYan_3af6ed535f511c9af275a6e4d130e455fbe_hd.jpg)\n\n------\n这是一条分界线\n\n\n',
          createTime: "2020-06-09T21:27:17",
          lastUpdateTime: "2020-06-25T16:48:44",
          likeCount: 4,
          collectCount: 3,
          username: "YuanFuYan",
          introduction: "技术资深带佬",
          avatarUrl: "http://120.25.212.67:8205/images/admin_6f7cap.png"
        }
      ]
    };
  },
  mounted() {
    this.requestQuestion();
    //初始化回答列表
    this.requestAnswer(this.page_num);

    // 增加监听页面滑动事件
    window.addEventListener("scroll", this.handleScroll);
    // 评论吸底效果
    // window.addEventListener("scroll", this.initHeight);

    for (var i = 0; i < this.answer_list.length; i++) {
      console.log("hello");
      this.answer_list[i]["isFixed"] = false;
      this.answer_list[i]["t_isFixed"] = false;
      this.answer_list[i]["p_top"] = 0;
      this.answer_list[i]["offsetTop"] = 0;
    }

    this.$nextTick(() => {});
  },
  methods: {
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
          res;
          this.total_page_num = res.data.data.pages;
          this.num_per_page = res.data.data.size;
          this.total_answer_num = res.data.data.total;

          this.new_answer = res.data.data.records;
          for (var i = 0; i < this.new_answer.length; i++) {
            console.log("hello");
            this.new_answer[i]["isFixed"] = false;
            this.new_answer[i]["t_isFixed"] = false;
            this.new_answer[i]["p_top"] = 1;
            this.new_answer[i]["offsetTop"] = 1;
          }
          this.answer_list = this.answer_list.concat(this.new_answer);
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
    gotoHello() {
      this.$vuetify.goTo("#hello", {});
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
        let header = document.getElementById(cm_id + "0");
        let header1 = document.getElementById(cm_id);
        let header2 = document.getElementById(cm_id + "1");

        if (this.answer_list[i]["t_isFixed"] == false) {
          this.answer_list[i]["p_top2"] = header2.offsetTop;
        }
        // 防止抖动
        if (this.answer_list[i]["isFixed"] == false) {
          this.answer_list[i]["p_top"] = header.offsetTop;
          this.answer_list[i]["offsetTop"] = header1.offsetTop;
        }
      }

      for (var j = 0; j < this.answer_list.length; j++) {
        let offsetTop = this.answer_list[j]["offsetTop"];
        let p_top = this.answer_list[j]["p_top"];
        let p_top2 = this.answer_list[j]["p_top2"];
        // this.answer_list[j]["isFixed"]
        let res0 =
          this.scrollTop + this.clientHeight < offsetTop + p_top  &&
          p_top + 600 < this.scrollTop + this.clientHeight
            ? true
            : false;
        let res1 =
          ((p_top2 + p_top) < this.scrollTop) &&
          p_top + offsetTop > this.scrollTop + this.clientHeight
            ? true
            : false;
        // if (res1 == true) console.log("hello");
        // console.log(res0);
        // console.log(res1);
        // console.log("hello");
        
        this.$set(this.answer_list[j], "t_isFixed", res1);
        this.$set(this.answer_list[j], "isFixed", res0);
      }
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
  z-index: 999;
}
.top_isFixed {
  /* color: red */
  position: fixed;
  top: 0;
  color: darkblue;
  z-index: 999;
}
</style>