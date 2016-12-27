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

<style src="normalize.css"/>
<style src="clear-sans-webfont/css/clear-sans.css"/>
<style src="ionicons/dist/css/ionicons.css"/>

<style>
  body {
    font-family: 'Clear Sans', sans-serif;
  }
</style>
