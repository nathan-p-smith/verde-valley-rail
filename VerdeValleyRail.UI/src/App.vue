<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>    
    <div>
      <nav>        
        <RouterLink to="/Trips">Trips</RouterLink>        
      </nav>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">


  header{
    
    $height: 50px;
    
    display: block;
    background-color: red;
    height: $height;
    line-height: $height;
    padding: 0 20px;
    margin-bottom: 10px;

    a{
      color: #fff;
      font-weight: bold;
      text-decoration: none;
    }

  }

</style>
