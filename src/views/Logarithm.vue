<template>

    <v-content>
      <Nav /> 
      <Logarithm />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Logarithm from '@/components/Logarithm.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'logarithm',
  components: {
    Logarithm,
    Nav
  }
}
</script>