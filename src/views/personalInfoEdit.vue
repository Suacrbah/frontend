<template>
  <div>
    <app-bar></app-bar>

    <v-card class="mx-auto" max-width="1000">
      <v-card>
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://pic1.zhimg.com/80/v2-e12dfbf5719f16830e25882c85661a5d_r.jpg"
        ></v-img>
      </v-card>

      <v-container>
        <v-row class="justify-start">
          <!-- //编辑头像 -->
          <v-card class="mt-n14 ml-10" width="164" elevation="0">
            <v-card class="px-1 py-1" v-ripple="{ center: true }">
              <image-input @input="uploadAvatar">
                <v-card slot="activator">
                  <v-img v-if="avatar==''" height="164px" width="164px" class="grey lighten-3">
                    <v-overlay absolute :value="true">
                      <div>
                        <v-icon>mdi-camera</v-icon>添加头像
                      </div>
                    </v-overlay>
                  </v-img>
                  <v-img v-else :src="avatar">
                    <v-overlay absolute :value="true">
                      <div>
                        <v-icon>mdi-camera</v-icon>编辑头像
                      </div>
                    </v-overlay>
                  </v-img>
                </v-card>
              </image-input>
            </v-card>
          </v-card>

          <v-card
            v-ripple="{ center: true }"
            flat
            class="text-h3 font-weight-medium ml-10"
          >{{ userInfo.username }}</v-card>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">性别</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-select :items="items" v-model="userInfo.gender" :placeholder="userInfo.gender"></v-select>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">电子邮箱</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.email"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">一句话介绍</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.introduction"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">居住地</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.postition"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">所在行业</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.industry"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">职业经历</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.career"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="2">
            <v-subheader style="color: black">教育经历</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="userInfo.education"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn color="orange" text @click="submit()">保存修改</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import AppBar from "../components/AppBar";
import ImageInput from "../components/AvatarUpload.vue";

export default {
  components: {
    AppBar,
    ImageInput: ImageInput
  },
  data() {
    return {
      items: ["男", "女"],
      userInfo: {},

      change_avatar: false, //记录用户是否修改头像
      avatar: "", //本地头像路径地址
      formData: Object
    };
  },
  created() {
    // 从sessionStorage获得用户信息
    // this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    // console.log(this.userInfo);

    //发送请求获得用户详细信息
    this.$axios
      .get("/user/getInfo/", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        // console.log(res);
        this.userInfo = res.data.data;
        // console.log(this.userInfo);

        this.avatar = this.userInfo.avatarUrl;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });
  },
  methods: {
    uploadAvatar(data) {
      this.avatar = data["imageURL"];
      this.formData = data["formData"];
      this.change_avatar = true;
    },
    submit() {
      // 单独上传头像（后端将头像url更新）
      if (this.change_avatar) {
        this.$axios
          .post("/avatar/upload/", this.formData, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(res => {
            // console.log(res)

            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            console.log(userInfo)
            userInfo["avatar_url"] = res.data.msg
            
            this.$store.commit("set_userInfo", userInfo)
          })
          .catch(e => {
            console.log(e);
            this.errors.push(e);
          });
      }

      this.$axios
        .post("/user/update/", this.userInfo, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
          console.log(res.data)
          res;
          // userInfo[]
          userInfo["introduction"] = res.data.data["introduction"]
          userInfo["email"] = res.data.data["email"]
          this.$store.commit("set_userInfo", userInfo)
          this.$router.push({
            name: "personalPage",
            params: {}
          });
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }
  }
};
</script>
