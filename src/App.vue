<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    AddSmoothie,
    EditSmoothie,
    Navbar
  }
}
</script>

<style>
#app {
  
}
</style>
