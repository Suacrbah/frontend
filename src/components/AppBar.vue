<template>
  <v-app-bar  flat  app dark class="primary">
    <v-container class="mx-auto py-0">
      <v-row align="center"> 
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />
        <v-toolbar-title class="headline">
          <span class="font-weight-bold">BeHoo</span>
        </v-toolbar-title>

        <v-btn
          class="hidden-sm-and-down"
          text
          @click="toMain()"
        >
        首页
        </v-btn>

        <v-btn
        class="hidden-sm-and-down"
        text
        @click="onClick($event, link)"
        >
        发现
        </v-btn>

        <v-btn
        class="hidden-sm-and-down"
        text
        @click="onClick($event, link)"
        >
        推荐
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
            flat
            hide-details
            solo-inverted
            label="搜索"
            style="max-width: 300px;"
            v-model="q"
        />
        <v-btn dark icon @click="search()">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu bottom left :offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="toPage(i)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      items: [
        { title: '个人中心' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: '退出登录' },
      ],
      
    }
  },
  props:{
    q:String,

  },

  methods: {
    toMain() {
      this.$router.push("/main");
    },
    toPage(i) {
      if (i == 0) {
        this.$router.push("/personalpage");
      } else if (i == 3) {
        this.$router.push("/login");
      }
    },

    search(){

      let data = {
        query_key_word: this.q,
      };
      this.$emit('change_key_word', data); 
    }
  }
}
</script>