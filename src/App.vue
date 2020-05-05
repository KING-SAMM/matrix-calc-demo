<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, 'Times New Roman', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.page {
  position: relative;
  width: inherit;
}

/*
.router-anim-enter-active {
  animation: coming 1s;
  animation-delay: 2;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 1s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translate3d(-50px);
    opacity: 0;
  }
  to {
    transform: translate3d(0);
    opacity: 1;
  }
}
*/
</style>
