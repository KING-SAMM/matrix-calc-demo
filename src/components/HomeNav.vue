<template>
    <div id="nav">
      <div class="overlay">
      <router-link to="/matrix2x2" class="grid-items" @click="showMatrixBar = !showMatrixBar"><p class="white--text"><v-icon color="white" style="font-size: 60px;" class="icon">apps</v-icon><br>Matrices</p></router-link> 
      <router-link to="/vector" class="grid-items"><p class="white--text"><v-icon color="white" style="font-size: 60px;" class="icon">swap_horiz</v-icon><br>Vectors</p></router-link> 
      <router-link to="/logarithm" class="grid-items"><p class="white--text"><v-icon color="white" style="font-size: 60px;">call_made</v-icon><br>Logarithms</p></router-link> 
      <router-link to="/numbersystems" class="grid-items" @click="showNumberSystemsBar = !showNumberSystemsBar"><p class="white--text"><v-icon color="white" style="font-size: 60px;">timer_3</v-icon><br>Number Systems</p></router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: 'HomeNav'
}
</script>
<style scoped>
  #nav {
    background-image: url('../assets/mobile-grid_90.jpg');
  }
  .overlay {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: rgba(50, 50, 50, 0.8); 
    height: 100vh;
  }

  .grid-items {
    display: flex;
    background-color: transparent;
    border: 2px solid rgba(230, 230, 230, 0.8);
    font-size: 20px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
</style>