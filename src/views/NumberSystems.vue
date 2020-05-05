<template>

    <v-content>
      <NSNav /> 
      <NumberSystems />
    </v-content>

</template>

<script>
// @ is an alias to /src
import NumberSystems from '@/components/NumberSystems.vue'
import NSNav from '@/components/NSNav.vue'

export default {
  name: 'numbersystems',
  components: {
    NumberSystems,
    NSNav
  }
}
</script>