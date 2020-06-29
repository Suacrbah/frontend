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

      <v-card class="mt-n14 ml-10" width="164" elevation="0">
        <!-- <v-card class="px-1 py-1" @click="changeAvatar()">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg">
            <v-overlay absolute :value="true">
              <v-file-input multiple hide-input label="File input"><span> 编辑头像</span></v-file-input>
            </v-overlay>
          </v-img>
        </v-card>-->
        <v-card class="px-1 py-1">
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

        <v-container fluid>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">性别</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-select
          :items="items"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">一句话介绍</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">居住地</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">所在行业</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">职业经历</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">教育经历</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader style="color: black">个人简介</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>

      <v-card-actions>
        <v-btn color="orange" text @click="submit()">Submit</v-btn>
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
      items: ['男', '女'],
      userInfo: {},
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
        console.log(this.userInfo);

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
    },
    submit() {
      // 单独上传头像（后端将头像url更新）
      this.$axios
        .post("/avatar/upload/", this.formData, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          res;
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
      
      
      // 更新用户信息
      let formData2 = new FormData();

      formData2.append("username", this.userInfo.avatarUrl);
      formData2.append("email", this.userInfo.email);
      formData2.append("gender", this.userInfo.gender);
      formData2.append("gender", this.userInfo.gender);
      formData2.append("introduction", this.userInfo.introduction);
      formData2.append("phonenumber", this.userInfo.phonenumber);
      formData2.append("postition", this.userInfo.postition);
      formData2.append("career", this.userInfo.career);
      formData2.append("education", this.userInfo.education);

      this.$axios
        .post("/user/update/", formData2, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          // res;
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }
  }
};
</script>
