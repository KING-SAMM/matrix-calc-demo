<template>
  <div>
    <Nav />
    <div class="page">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'about',
  components: {
    Nav
  }
}
</script>