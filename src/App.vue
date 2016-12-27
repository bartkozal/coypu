<template>
  <div>
    <topbar></topbar>
    <list></list>
  </div>
</template>

<script>
import Topbar from 'components/topbar'
import List from 'components/list'

export default {
  name: 'app',
  components: {
    Topbar,
    List
  }
}
</script>

<style>
</style>
