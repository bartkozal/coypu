<template>
  <div>
    <topbar></topbar>
    <transition :name="transitionName" mode="out-in">
      <component :is="List" :key="activeList"></component>
    </transition>
    <settings></settings>
  </div>
</template>

<script>
import moment from 'moment'
import Topbar from 'components/Topbar'
import List from 'components/List'
import Settings from 'components/Settings'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['activeList', 'timelineTransition', 'calendar']),
    transitionName () {
      return `${this.timelineTransition}-list`
    }
  },
  watch: {
    calendar (newCalendar) {
      moment.locale(newCalendar)
    }
  },
  created () {
    moment.locale(this.calendar)
  },
  data () {
    return {
      List
    }
  },
  components: {
    Topbar,
    Settings
  }
}
</script>

<style src="normalize.css"/>

<style>
  @import 'defaults.css';

  @font-face {
    font-family: 'Clear Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Clear Sans'), local('ClearSans'), url('assets/ClearSans-Regular.ttf');
  }

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

  .icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-repeat: no-repeat;
    font-style: normal;
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
