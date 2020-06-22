<template>
  <ques-des></ques-des>
  <!-- <v-div></v-div> -->
  <!-- <test></test> -->
</template>

<script>
export default {
  name: "QuestionDetail",
  components:{
    QuesDes:() => import("@/components/questionDes"),
    // test:() => import("@/components/test"),
  }
};
</script>

<style scoped>

</style>