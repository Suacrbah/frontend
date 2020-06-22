<template>
  <!-- 笔记本应用 -->
  <div id="notebook">
    <!-- 主面板 -->
    <section class="main">
      <textarea v-model="content"></textarea>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "This is a note."
    };
  }
};
</script>