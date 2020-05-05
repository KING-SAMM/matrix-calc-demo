<template>
    <v-content>
      <Nav /> 
      <Matrix3x3 />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Matrix3x3 from '@/components/Matrix3x3.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'matrix3x3',
  components: {
    Matrix3x3,
    Nav
  }
}
</script>