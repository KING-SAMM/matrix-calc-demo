<template>

    <v-content>
      <Sidebar /> 
      <NumberSystems />
    </v-content>

</template>

<script>
// @ is an alias to /src
import NumberSystems from '@/components/NumberSystems.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'numbersystems',
  components: {
    NumberSystems,
    Sidebar
  }
}
</script>