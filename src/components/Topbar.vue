<template>
  <div class="topbar">
    <i class="icon ion-ios-arrow-back" @click="previousWeek"></i>
    <div class="topbar-week" v-cloak>Week {{ weekOfYear }}</div>
    <div v-cloak>{{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}</div>
    <i class="icon ion-ios-arrow-forward" @click="nextWeek"></i>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'topbar',
  created () {
    this.$store.commit('setActiveDate', moment().format())
  },
  computed: {
    activeDate () {
      return this.$store.getters.activeDate
    },
    weekOfYear () {
      return moment(this.activeDate).format('w')
    },
    startOfWeek () {
      return moment(this.activeDate).startOf('week').format('D')
    },
    endOfWeek () {
      return moment(this.activeDate).endOf('week').format('D')
    },
    currentMonth () {
      return moment(this.activeDate).format('MMMM')
    }
  },
  methods: {
    previousWeek () {
      const previousWeek = moment(this.activeDate).subtract({ weeks: 1 }).format()
      this.$store.commit('setActiveDate', previousWeek)
    },
    nextWeek () {
      const nextWeek = moment(this.activeDate).add({ weeks: 1 }).format()
      this.$store.commit('setActiveDate', nextWeek)
    }
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  .topbar {
    font-size: var(--font-large);
    margin-bottom: var(--spacing);
    display: flex;
    align-items: flex-end;
  }

  .topbar-week {
    flex-grow: 1;
    color: var(--color-primary);
  }

  .icon {
    color: var(--color-primary);
    font-size: calc(var(--font-large) - 2px);
    cursor: pointer;
  }

  .ion-ios-arrow-back {
    padding-right: var(--spacing);
  }

  .ion-ios-arrow-forward {
    padding-left: var(--spacing);
  }
</style>
