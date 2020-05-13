<template>
    <v-content>
      <Sidebar /> 
      <Vector />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Vector from '@/components/Vector.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'vector',
  components: {
    Vector,
    Sidebar
  }
}
</script>