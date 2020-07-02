<template>
  <v-card>
    <mavon-editor v-model="value" @imgAdd="$imgAdd" ref="md" @change="changeText" />

    <v-btn @click="submit">提交</v-btn>
    <v-btn @click="exit">放弃</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "editor",
  data() {
    return {
      img_file: {},
      Text: "",
      Text_html: "",
      value: "",

      question_id: 0,
    };
  },
  mounted() {
    //获得当前url
    console.log(this.$route.params);
    // console.log(this.$route.path);
    // console.log(window.location.href);

    var array = window.location.href.split("/");
    this.question_id = array[array.length - 2];
    if(this.$route.params.answer){
      this.value = this.$route.params.answer;
    }
  },
  methods: {
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },

    changeText(value, render) {
      this.Text = value;
      this.Text_html = render;
    },

    //提交表单
    submit() {
      let formdata = new FormData();

      //添加所有图片到formdata
      for (var _img in this.img_file) {
        formdata.append("files", this.img_file[_img]);
        // console.log("abc");
        // console.log(this.img_file[_img]);
        // console.log(formdata);
      }

      // const _this = this;
      if (Object.keys(this.img_file).length > 0) {  //如果上传了图片
        //准备发送图片
        console.log("准备发送图片");
        this.$axios
          .post("/answer/image/upload", formdata, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            // console.log(res.data);
            let img_url_dict = res.data.data;
            // console.log(img_url_dict);
            for (var pos in img_url_dict) {
              // console.log(pos);
              // console.log(img_url_dict[pos]);
              this.$refs.md.$img2Url(
                pos.toString(),
                img_url_dict[pos]
              );
            }

            console.log("发送图片完成");
            // 发送 回答  文本源码
            let formdata2 = new FormData();
            // console.log(this.Text);
            // console.log(this.Text_html);
            formdata2.append(
              "content",
              this.Text_html + "\\SPLIT\\" + this.Text
            );
            this.$axios
              .post("/answer/add/" + this.question_id, formdata2, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              .then(res => {
                console.log("发送文本完成");
                res;
                // console.log(res.data);
                this.$router.replace("/question/" + this.question_id);
              })
              .catch(e => {
                console.log(e);
                this.errors.push(e);
              });
          })
          .catch(e => {
            console.log(e);
            this.errors.push(e);
          });
      } else {
        let formdata2 = new FormData();
        // console.log(this.Text);
        // console.log(this.Text_html);
        formdata2.append("content", this.Text_html + "\\SPLIT\\" + this.Text);
        this.$axios
          .post("/answer/add/" + this.question_id, formdata2, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            // console.log(res.data);
            res;
            this.$router.replace("/question/" + this.question_id);
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    },
    exit(){
      this.$router.push({name:"QuestionDetail", params:{questionId:this.question_id}})
    }
  }
};
</script>

<style scoped>
</style>