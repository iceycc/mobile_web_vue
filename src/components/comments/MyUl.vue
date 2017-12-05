<template>
  <div>
    <ul>
      <!--  -->
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  export default{
    name:'my-ul',
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  ul{
    overflow: hidden;
  }
</style>
