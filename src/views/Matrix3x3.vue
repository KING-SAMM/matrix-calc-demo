<template>
    <v-content>
      <Sidebar /> 
      <Matrix3x3 />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Matrix3x3 from '@/components/Matrix3x3.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'matrix3x3',
  components: {
    Matrix3x3,
    Sidebar
  }
}
</script>