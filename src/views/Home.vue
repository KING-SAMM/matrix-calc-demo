<template>
  <div class="home w3-animate-opacity">
    <!--<img alt="App logo" src="../assets/main_img.png">-->
    <Home msg="Welcome to Your Vue.js App"/>
    <HomeNav />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import HomeNav from '@/components/HomeNav.vue'

export default {
  name: 'home',
  components: {
    Home,
    HomeNav
  }
}
</script>
