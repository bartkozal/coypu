<template>
  <div>
    <topbar></topbar>
    <week></week>
  </div>
</template>

<script>
import Topbar from 'components/Topbar'
import Week from 'components/Week'

export default {
  name: 'app',
  components: {
    Topbar,
    Week
  }
}
</script>

<style src="normalize.css"/>
<style src="clear-sans-webfont/css/clear-sans.css"/>
<style src="ionicons/dist/css/ionicons.css"/>

<style>
  @import 'defaults.css';

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: var(--spacing);
    font-family: var(--font-stack);
    font-size: var(--font-base);
    line-height: var(--font-leading);
  }
</style>
