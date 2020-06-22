<template>
  <v-card
    class="mx-auto"
    max-width="1000px"
    outlined
  >
    <v-list-item three-line>
        
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Question Title</v-list-item-title>

        <div>
            <span v-if="!readMoreActivated">{{longText.slice(0, 200)}}   </span>
            <a class="" v-if="!readMoreActivated" @click="activateReadMore" >
            展开全部
            </a>
            <span v-if="readMoreActivated" v-html="longText"></span>
            <a class="" v-if="readMoreActivated" @click="disableReadMore">
            收起
            </a>
        </div>
        
        <v-list-item-subtitle>
            
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn text>关注问题</v-btn>
      <v-btn text>写回答</v-btn>
      <v-btn text>邀请回答</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: "QuesDes",
    data(){
        return {
            longText: `Brown skin girl
            Your skin just like pearls
            The best thing in the world
            Never trade you for anybody else
            Singin' brown skin girl
            Your skin just like pearls
            The best thing in the world
            I never trade you for anybody else, singin'
            She said she really grew up poor like me
            yeah
            So while I may not pretty boy, your heart is amiss
            Play it like a villain 'cause she caught in a wave
            Tonight I am walkin' away`,
            readMoreActivated: false
        }
    },
    mounted:{
        
    },
    methods: {
        activateReadMore(){
            this.readMoreActivated = true;
        },
        disableReadMore(){
            this.readMoreActivated = false;
        },
        // getQuInfo(){
        //     const  _this = this;
        //     this.$axios
        //         .get('')
        //         .then(res => {
        //             // _this.longText = res.data;
        //         })
        //     .catch(e => {this.errors.push(e)});
        // },
    }
}
</script>