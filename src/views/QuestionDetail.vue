<template>
  <div>
  <ques-des></ques-des>
  <comment />
  <!-- <v-div></v-div> -->
  <!-- <test></test> -->
  </div>
</template>

<script>
export default {
  name: "QuestionDetail",
  components:{
    QuesDes:() => import("@/components/questionDes"),
    Comment:() => import("@/components/Comment"),
    // test:() => import("@/components/test"),
  }
};
</script>

<style scoped>

</style>