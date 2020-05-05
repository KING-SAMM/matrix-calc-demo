<template>
    <nav>
        <!-- Matrix toolbar -->
        <v-toolbar app dark class="indigo" height="50">
            <!--<v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <!--<v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>-->
            <v-icon @click="drawer = !drawer">menu</v-icon>
            <v-toolbar-title class="hidden-xs-only">
                <span class="font-weight-thin">Matrix</span>
                <span class="font-weight-bold">Calc</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/" class="links"><v-icon small>home</v-icon><br><span class="white--text iconText">Home</span></router-link>
            <router-link to="/matrix2x2" class="links"><v-icon small>widgets</v-icon><br><span class="white--text iconText">2X2</span></router-link>
            <router-link to="/matrix3x3" class="links"><v-icon small>apps</v-icon><br><span class="white--text iconText">3X3</span></router-link>
            <v-spacer></v-spacer>
            <v-icon>more_vert</v-icon>
        <!-- </v-container>-->
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="indigo">
            <br>
            <br>
            <router-link to="/logarithm"><p class="white--text"><v-icon color="white" style="float:left">call_made</v-icon>Logarithms</p></router-link>
            <router-link to="/matrix2x2"><p class="white--text"><v-icon color="white" style="float:left">apps</v-icon>Matrices</p></router-link>
            <router-link to="/numbersystems"><p class="white--text"><v-icon color="white" style="float:left">timer_3</v-icon>Number Systems</p></router-link>
            <router-link to="/vector"><p class="white--text"><v-icon color="white" style="float:left">swap_horiz</v-icon>Vectors</p></router-link>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    name: 'NSNav',
    data() {
        return {
            drawer: false
        }
    }
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
}

span.iconText {
    font-size: 12px;
}

p.white--text {
    margin: 10px;
}


</style>


