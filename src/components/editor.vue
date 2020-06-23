<template>
  <div>
    <mavon-editor @imgAdd="$imgAdd" ref="md" @change="changeText" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: "editor",
  data() {
    return {
      img_file: {},
      Text: "",
      Text_html: "",
      answer_id: 0
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },

    changeText(value, render) {
      // console.log(value);
      // console.log(render);

      this.Text = value;
      this.Text_html = render;
    },

    submit() {
      let formdata = new FormData();

      for (var _img in this.img_file) {
        //console.log(_img);
        formdata.append("files", this.img_file[_img]);
      }

      // console.log(formdata);

      var _this = this;
      var arr = Object.keys(this.img_file);
      console.log(arr);
      console.log(arr.length);
      if (arr.length > 0) {
        console.log("准备发送图片");
        this.$axios
          .post("/answer/image/upload", formdata, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            console.log(res.data);
            for (var img_url in res.data.data) {
              _this.$refs.md.$img2Url(
                (+img_url + 1).toString(),
                res.data.data[img_url]
              );
            }

            // 发送 回答  文本源码

            let formdata2 = new FormData();
            formdata2.append("content", this.Text_html);
            this.$axios
              .post("/answer/add/1", formdata2, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              .then(res => {
                console.log(res.data);
              })
              .catch(e => {
                this.errors.push(e);
              });
          })
          .catch(e => {
            this.errors.push(e);
          });
      } else {
        let formdata2 = new FormData();
        formdata2.append("content", this.Text_html);
        this.$axios
          .post("/answer/add/1", formdata2, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>