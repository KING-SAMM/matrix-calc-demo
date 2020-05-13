<template>
  <div>
    <v-toolbar dark class="indigo" dense>
        <v-icon v-b-toggle.sidebar-variant>menu</v-icon>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title class="hidden-xs-only">
            <span class="font-weight-thin">Matrix</span>
            <span class="font-weight-bold">Calc</span>
        </v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn icon>
            <router-link to="/" class="links"><v-icon style="color:white" small>home</v-icon><br><span class="white--text iconText">Home</span></router-link>
        </v-btn>
        <v-btn icon>
            <router-link to="/matrix2x2" class="links"><v-icon style="color:white" small>widgets</v-icon><br><span class="white--text iconText">2X2</span></router-link>
        </v-btn>
        <v-btn icon>
            <router-link to="/matrix3x3" class="links"><v-icon style="color:white" small>apps</v-icon><br><span class="white--text iconText">3X3</span></router-link>
        </v-btn>
    
      <v-spacer></v-spacer>
    </v-toolbar>

    <b-sidebar
        id="sidebar-variant" 
        title="Functions" 
        bg-variant="light" 
        text-variant="info"
        backdrop
        shadow

    >
      <div class="px-3 py-2">
        <router-link to="/logarithm" style="text-decoration:none"><p class="indigo--text"><v-icon color="indigo" style="float:left">call_made</v-icon>Logarithms</p></router-link>
        <router-link to="/matrix2x2" style="text-decoration:none"><p class="indigo--text"><v-icon color="indigo" style="float:left">apps</v-icon>Matrices</p></router-link>
        <router-link to="/numbersystems" style="text-decoration:none"><p class="indigo--text"><v-icon color="indigo" style="float:left">timer_3</v-icon>Number Systems</p></router-link>
        <router-link to="/vector" style="text-decoration:none"><p class="indigo--text"><v-icon color="indigo" style="float:left">swap_horiz</v-icon>Vectors</p></router-link>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style lang="scss" scoped>

#nav {
    display: inline-block;
    text-decoration: none;
    a {
        padding: 0px 10px;
        color: #ffffff;
        &.router-link-exact-active {
            color: #ffffff;
            font-weight: 800;
        }
    }
}

.indigo {
    margin: 0;
}

.links {
    padding: 20px;
    margin: 0 5px;
}

span.iconText {
    font-size: 12px;
}

p.white--text {
    margin: 10px;
}

nav {
    width: 100vw;
    margin: 0;
}
