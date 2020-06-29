<template>
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
</template>

<script>
  export default {
    data: () => ({
      items: ['男', '女'],
    }),
  }
</script>