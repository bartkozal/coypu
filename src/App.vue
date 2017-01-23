<template>
  <div>
    <topbar></topbar>
    <transition :name="transitionName" mode="out-in">
      <component :is="List" :key="activeList"></component>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import Topbar from 'components/Topbar'
import List from 'components/List'
import PouchDB from 'pouchdb'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['activeList', 'timelineTransition']),
    transitionName () {
      return `${this.timelineTransition}-list`
    }
  },
  created () {
    moment.locale('en-gb')
    if (process.env.NODE_ENV === 'development') {
      window.PouchDB = PouchDB
    }
  },
  data () {
    return {
      List
    }
  },
  components: {
    Topbar
  }
}
</script>

<style src="normalize.css"/>

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

  .previous-list-enter,
  .next-list-leave-to {
    transform: translateX(-10%);
  },

  .next-list-enter,
  .previous-list-leave-to {
    transform: translateX(10%);
  }

  .previous-list-enter-to,
  .previous-list-leave,
  .next-list-enter-to,
  .next-list-leave {
    transform: translateX(0);
    opacity: 1;
  }

  .previous-list-enter,
  .next-list-enter,
  .previous-list-leave-to,
  .next-list-leave-to {
    opacity: 0;
  }

  .previous-list-enter-active,
  .previous-list-leave-active,
  .next-list-enter-active,
  .next-list-leave-active {
    transition: all var(--transition-duration) ease-in-out;
  }
</style>
