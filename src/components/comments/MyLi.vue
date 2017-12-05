<template>
  <div>
    <li>
      <slot></slot>
    </li>
  </div>
</template>
<script>
  export default{
    name:'my-li',
    data(){
      return{}
    }
    
  }
</script>


<style scoped>
  li{
    float:left;
    height: 20%;
    line-height: 218px;
    width: 33%;
    text-align: center;
    /* position: relative; */
  }
</style>
