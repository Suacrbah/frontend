<template>
  <app-bar/>
  
</template>

<script>
  export default {
    name: 'personalPage',
    components:{
      AppBar: () => import ("@/components/AppBar"),

    },
    data () {
      return {
        
      }
    },
  }
</script>