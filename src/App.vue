<template>
  <div>
    <topbar></topbar>
    <list></list>
  </div>
</template>

<script>
import moment from 'moment'
import Topbar from 'components/Topbar'
import List from 'components/List'
import PouchDB from 'pouchdb'

export default {
  name: 'app',
  created () {
    moment.locale('en-gb')
    if (process.env.NODE_ENV === 'development') {
      window.PouchDB = PouchDB
    }
  },
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
  @import 'defaults.css';

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: var(--spacing);
    font-family: var(--font-stack);
    font-size: var(--font-base);
    line-height: var(--font-leading);
    color: var(--color-text);
  }

  [v-cloak] {
    display: none;
  }
</style>
