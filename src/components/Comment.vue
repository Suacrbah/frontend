<template>
  <v-card max-width="10000px" class="mx-auto">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-btn @click="thumb_up()" class="ma-2" color="yellow lighten-1">
          <v-icon>mdi-thumb-up</v-icon>点赞
        </v-btn>
        <v-btn @click="collection()" color="green accent-3">
          <v-icon>mdi-star</v-icon>收藏
        </v-btn>
        <v-btn class="mx-2" max-width="90px" color="blue lighten-3" @click="displayComment">
          <v-expansion-panel-header expand-icon>
            <v-icon>mdi-message-text</v-icon>评论
          </v-expansion-panel-header>
        </v-btn>

        <!-- <v-expansion-panel-content>
          <v-list>
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" no-action>
              <template v-slot:activator>
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="subItem in item.items" :key="subItem.title">
                <v-list-item-avatar>
                  <v-img :src="subItem.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-expansion-panel-content> -->



        <v-expansion-panel-content>
          <v-list>
            <v-list-group v-for="(comment, index) in comments_tree" :key="index"  no-action>
              <template v-slot:activator>
                <v-list-item-avatar>
                  <v-img :src="comments[comment.first_cm_id].avatarUrl"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="comments[comment.first_cm_id].username"></v-list-item-title>

                  <v-list-item-title v-text="comments[comment.first_cm_id].content"></v-list-item-title>

                </v-list-item-content>
              </template>


              <v-list-item v-for="(subComment ,index2) in comment.second_cm_array"  :key="index2">
                <v-list-item-avatar>
                  <v-img :src="subComment.avatarUrl"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="subComment.content"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>
          </v-list>
        </v-expansion-panel-content>





      </v-expansion-panel>
    </v-expansion-panels>

    <v-snackbar :timeout="2000" v-model="snackbar" top color="success">{{ msg }}</v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      snackbar: false,
      msg: "",
      panel: [],
      comments: {},
      comments_tree: [],
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Attractions",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Dining",
          active: true,
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "Breakfast & brunch"
            },
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "New American"
            },
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "Sushi"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Education",
          active:true,
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Family",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Health",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Office",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Promotions",
          items: [
            {
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              title: "List Item"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // Create an array the length of our items
    // with all values as true
    all() {
      this.panel = [...Array(this.items).keys()].map((k, i) => i);
    },
    // Reset the panel
    none() {
      this.panel = [];
    },
    thumb_up() {
      const _this = this;
      this.$axios
        .get("/like_answer/" + this.id, {
          headers: {
            Authorization: localStorage.getItem("token") // localStorage.getItem("token")
          }
        })
        .then(res => {
          _this.snackbar = true;
          _this.msg = res.data.msg;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    collection() {
      const _this = this;
      this.$axios
        .get("/collection/" + this.id, {
          headers: {
            Authorization: localStorage.getItem("token") // localStorage.getItem("token")
          }
        })
        .then(res => {
          _this.snackbar = true;
          _this.msg = res.data.msg;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    displayComment() {
      this.comments_tree=[];
      this.comments={};
      this.$axios
        .get("/comment/answer/" + this.id, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res.data);
          for (var key in res.data.data) {
            // console.log(key);
            //this.comments_tree[key] = res.data.data[key];
            var tmp_dict = {};
            tmp_dict["first_cm_id"]=key;
            tmp_dict["second_cm_array"]=[];
            for (var ele in res.data.data[key]) {
              var ret = res.data.data[key][ele];
              this.comments[ret.id] = ret;

              if(ret.id!=key){
                tmp_dict["second_cm_array"].push(ret);
              }
            }
            this.comments_tree.push(tmp_dict);
          }
          console.log("comments");
          console.log(this.comments);
          console.log("comments_tree");
          console.log(this.comments_tree);

          for(var comment in this.comments_tree){
            console.log(typeof(comment));
            console.log(comment);
            console.log(this.comments_tree[comment].first_cm_id);//一级评论
            console.log(this.comments_tree[comment].second_cm_array); // 二级评论的数组

            for(var subComment in this.comments_tree[comment].second_cm_array){ // 二级评论
              console.log(this.comments_tree[comment].second_cm_array[subComment]);
            }
          }


        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>