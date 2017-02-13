<template>
  <div>
    <topbar></topbar>
    <transition :name="transitionName" mode="out-in">
      <component :is="List" :key="listKey"></component>
    </transition>
    <settings></settings>
  </div>
</template>

<script>
import moment from 'moment'
import Topbar from 'components/Topbar'
import List from 'components/List'
import Settings from 'components/Settings'
import { mapGetters, mapActions } from 'vuex'
import { migrate } from './store/db'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['listKey', 'timelineTransition', 'calendarLocale']),
    transitionName () {
      return `${this.timelineTransition}-list`
    }
  },
  watch: {
    calendarLocale (newLocale) {
      moment.locale(newLocale)
      this.setTimeline()
    }
  },
  beforeCreate () {
    migrate()
  },
  created () {
    moment.locale(this.calendarLocale)
  },
  data () {
    return {
      List
    }
  },
  components: {
    Topbar,
    Settings
  },
  methods: mapActions(['setTimeline'])
}
</script>

<style src="normalize.css"></style>
<style>
@import 'defaults.css';

@font-face {
  font-family: 'Clear Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Clear Sans'), local('ClearSans'), url('assets/ClearSans-Regular.ttf');
}

body {
  padding: var(--spacing);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: var(--font-stack);
  font-size: var(--font-base);
  line-height: var(--font-leading);
  color: var(--color-text);
}

[v-cloak] {
  display: none;
}

.icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  font-style: normal;
  cursor: pointer;
  background-repeat: no-repeat;
}

.icon-chevron-left {
  background-image: url('assets/icon-chevron-left.svg');
}

.icon-chevron-right {
  background-image: url('assets/icon-chevron-right.svg');
}

.icon-settings {
  background-image: url('assets/icon-settings.svg');
}

.icon-settings-active {
  background-image: url('assets/icon-settings-active.svg');
}

.icon-close {
  background-image: url('assets/icon-close.svg');
}
</style>
