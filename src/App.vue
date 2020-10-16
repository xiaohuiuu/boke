<template>
  <div id="app">
    
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>


<script>
export default {
  name:'app',
  methods:{
    
  },
  components:{

  }
}
</script>


<style lang="less">
@import url('./assets/base.css');
#app {
 width: 100%;

}


</style>
