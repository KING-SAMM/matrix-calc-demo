<template>
    <v-content>
      <Nav /> 
      <Vector />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Vector from '@/components/Vector.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'vector',
  components: {
    Vector,
    Nav
  }
}
</script>