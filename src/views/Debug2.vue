<template>
  <div class="box" v-for:>
    <v-card class="mx-auto box">
      {{isFixed}}
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h3>快下来</h3>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <div class="box_fixed" :id="a_id[0]" :class="{'is_fixed' : isFixed[0].id}">我是来测试的、哇咔咔</div>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
      <h4>1</h4>
    </v-card>
    <v-card class="box">
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <!-- <div class="box_fixed" id="boxFixed2" :class="{'is_fixed' : isFixed}">hahaahahh</div> -->
      <div class="box_fixed" :id="a_id[1]" :class="{'is_fixed2':isFixed[1].id}">hahaahahh</div>
      <!-- <div class="box_fixed" :id="a_id[1]" :class="{'is_fixed':true}">hahaahahh</div> -->
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
      <h4>2</h4>
    </v-card>
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      // isFixed: false,
      // offsetTop: 0,
      // clientHeight: 0,
      // p_top: 0,
      // p_height: 0,
      // scrollTop: 0,
      
      isFixed: [{jj: "aa"},{jj: "aa"}],
      offsetTop: [],
      p_top: [],
      // p_height: [],
      clientHeight: 0,
      scrollTop: 0,
      a_id: [1, 2],

      test:[
        {value: 1}
      ],
  }},
  mounted() {

    this.scrollTop = 0;

    for (var i = 0; i < this.a_id.length; i++) {
      // this.isFixed.push({id:false});
      // this.isFixed[i].id = false;
      this.isFixed[i]['id'] = false;
      this.offsetTop.push(0);
      this.p_top.push(0);
    } 
    console.log(this.isFixed[1]['id'])
    
    window.addEventListener("scroll", this.initHeight);
    // this.$nextTick(() => {
    //   let header = document.getElementById("boxFixed2");
    //   this.offsetTop = header.offsetTop;
    //   // this.offsetTop = document.querySelector("#boxFixed2").offsetTop;
    //   this.clientHeight = document.documentElement.clientHeight;
    //   this.p_top = header.offsetParent.offsetTop;
    // });
    this.$nextTick(() => {
      this.clientHeight = document.documentElement.clientHeight;

      for (var i = 0; i < this.a_id.length; i++) {
        let header = document.getElementById(this.a_id[i]);
        // let header = document.getElementById("boxFixed2");
        this.p_top[i] = header.offsetParent.offsetTop;
        this.offsetTop[i] = header.offsetTop;
        // this.offsetTop = document.querySelector("#boxFixed2").offsetTop;
      }
    });
  },
  methods: {
    initHeight() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      for(var i = 0; i<this.a_id.length; i++){
        this.isFixed[i]['id'] =
        (((this.scrollTop + this.clientHeight) < (this.offsetTop[i] + this.p_top[i])) &&
        (this.p_top[i] < (this.scrollTop + this.clientHeight)))
        // (this.p_top < this.scrollTop ))
          ? true
          : false;
      }
      // this.isFixed[0] = true;
      // this.isFixed[1] = true;
      
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight);
  }

}
</script>

<style scoped>
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
.box_fixed2 {
  width: 500px;
  height: 40px;
  border: 2px dashed pink;
  border-radius: 20px;
  margin: 0 auto;
  line-height: 40px;
  background: #eeeeee;
  /* position: absolute; */
}
.is_fixed {
  position: fixed;
  bottom: 0;
  /* z-index: 999; */
}
.is_fixed2 {
  position: fixed;
  bottom: 0;
  /* z-index: 999; */
}
</style>