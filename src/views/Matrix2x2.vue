<template>

    <v-content>
      <Nav /> 
      <Matrix2x2 />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Matrix2x2 from '@/components/Matrix2x2.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'matrix2x2',
  components: {
    Matrix2x2,
    Nav
  }
}
</script>