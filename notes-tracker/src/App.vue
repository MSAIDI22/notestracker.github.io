<template>
  <div id="app">
    <Header />
    <TodoItems/>
  </div>
</template>

<script> 
import TodoItems from './components/TodoItems.vue'
import Header from './components/layout/Header.vue'


export default {
  name:'App',
  components:{
    TodoItems,
    Header
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  width:100%;
}

*{
  box-sizing: border-box;
}

</style>
