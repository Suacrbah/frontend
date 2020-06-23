<template>
  <p>{{ name }}</p>
</template>

<script>
export default {
  name: 'BlogPost',
  props: {
    name: {
      type: String,
      default: 'Hello',
    }
  }
}
</script>