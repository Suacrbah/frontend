<template>
  <v-card max-width="10000px" class="mx-auto">
    <v-dialog v-model="dialog" scrollable max-width="1000px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-2" color="yellow lighten-1">
          <v-icon>mdi-thumb-up</v-icon>点赞
        </v-btn>

        <v-btn class="mx-2" max-width="90px" color="blue lighten-3" v-on="on" v-bind="attrs">
          <v-icon>mdi-message-text</v-icon>评论
        </v-btn>

        <v-btn class="mx-2" color="green accent-3">
          <v-icon>mdi-star</v-icon>收藏
        </v-btn>
      </template>
      <v-card>
        <v-card-title>评论</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list v-for="(comment, index) in comments_tree" :key="index">
            <v-row>
              <v-list-group no-action style="width: 900px">



                <template v-slot:activator>
                  <v-list-item-avatar>
                    <v-img :src="comments[comment.first_cm_id].avatarUrl"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="comments[comment.first_cm_id].username"></v-list-item-title>

                    <v-list-item-title v-text="comments[comment.first_cm_id].content"></v-list-item-title>
                  </v-list-item-content>
                </template>




                <v-list-item v-for="(subComment ,index2) in comment.second_cm_array" :key="index2">
                  <v-list-item-avatar>
                    <v-img :src="subComment.avatarUrl"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="subComment.content"></v-list-item-title>
                  </v-list-item-content>
                  <v-btn color="blue darken-1" text @click="replyComment(subComment.userId, subComment.username)">回复</v-btn>
                </v-list-item>



              </v-list-group>
              <v-btn color="blue darken-1" text @click="replyComment(comments[comment.first_cm_id].userId, comments[comment.first_cm_id].username)">回复</v-btn>
            </v-row>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="show_text_field = true">添加评论</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
        </v-card-actions>
        <v-text-field :label="'回复'+r_username" v-model="comment_value" v-if="show_text_field"></v-text-field>
        <v-btn v-if="show_text_field" max-width="90px" color="blue lighten-3">提交</v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script>
export default {  
  methods: {
    replyComment(user_id, user_name) {
      this.show_text_field = true;
      console.log(user_name);

      this.r_userid = user_id;
      this.r_username = user_name;
    },

    submitReply(){
      
    }
  },

  data() {
    return {
      comment_value:"",
      show_text_field: false,

      r_userid:"",
      r_username:"",
      dialogm1: "",
      dialog: false,
      comments: {
        "1": {
          id: 1,
          userId: 1,
          answerId: 1,
          content: "这篇回答看起来最舒服啊哈哈",
          replyToId: null,
          username: "admin",
          avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
        },
        "2": {
          id: 2,
          userId: 2,
          answerId: 1,
          content: "回复",
          replyToId: 1,
          username: "LiGuo",
          avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
        },
        "3": {
          id: 3,
          userId: 1,
          answerId: 1,
          content: "这是回复2",
          replyToId: null,
          username: "admin",
          avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
        },
        "4": {
          id: 4,
          userId: 1,
          answerId: 1,
          content: "回复的回复",
          replyToId: 2,
          username: "admin",
          avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
        }
      },
      comments_tree: [
        {
          first_cm_id: "1",
          second_cm_array: [
            {
              id: 2,
              userId: 2,
              answerId: 1,
              content: "回复",
              replyToId: 1,
              username: "LiGuo",
              avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
            },
            {
              id: 4,
              userId: 1,
              answerId: 1,
              content: "回复的回复",
              replyToId: 2,
              username: "admin",
              avatarUrl: "http://120.25.212.67:8205/images/admin1.png"
            }
          ]
        },

        {
          first_cm_id: "3",
          second_cm_array: []
        }
      ]
    };
  }
};
</script>