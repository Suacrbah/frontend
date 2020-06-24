<template>
  <v-card max-width="10000px" class="mx-auto">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-card-actions text max-width="900px" class="mx-auto">
          <div>
            <v-btn @click="thumb_up()" class="ma-2" color="orange">
              <v-icon>mdi-thumb-up</v-icon>点赞
            </v-btn>
            <v-btn @click="collection()" color="indigo">
              <v-icon>mdi-star</v-icon>收藏
            </v-btn>
          </div>
          <v-expansion-panel-header expand-icon><v-icon>mdi-message-text</v-icon>评论</v-expansion-panel-header>
        </v-card-actions>
        <v-expansion-panel-content>
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-snackbar
      :timeout="2000"
      v-model="snackbar"
      top
      color="success"
    >
      {{ msg }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      snackbar: false,
      msg: '',
      panel: [],
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
      this.$axios.get('/like_answer/' + this.id, {
          headers: {
              "Authorization": localStorage.getItem("token") // localStorage.getItem("token")
          }
      }).then(res => {
        _this.snackbar = true;
        _this.msg = res.data.msg;
      }).catch(e => {this.errors.push(e);});
    },
    collection() {
      const _this = this;
      this.$axios.get('/collection/' + this.id, {
          headers: {
              "Authorization": localStorage.getItem("token") // localStorage.getItem("token")
          }
      }).then(res => {
        _this.snackbar = true;
        _this.msg = res.data.msg;
      }).catch(e => {this.errors.push(e);});
    },
  }
};
</script>