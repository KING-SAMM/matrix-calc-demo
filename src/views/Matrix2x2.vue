<template>

    <v-content>
      <Sidebar /> 
      <Matrix2x2 />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Matrix2x2 from '@/components/Matrix2x2.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'matrix2x2',
  components: {
    Matrix2x2,
    Sidebar
  }
}
</script>