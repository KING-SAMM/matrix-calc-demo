<template>

    <v-content>
      <Sidebar /> 
      <Logarithm />
    </v-content>

</template>

<script>
// @ is an alias to /src
import Logarithm from '@/components/Logarithm.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'logarithm',
  components: {
    Logarithm,
    Sidebar
  }
}
</script>