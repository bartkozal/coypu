<template>
  <div class="topbar">
    <i class="icon ion-ios-arrow-back"></i>
    <div class="topbar-week">Week {{ weekOfYear }}</div>
    <div>{{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}</div>
    <i class="icon ion-ios-arrow-forward"></i>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'topbar',
  computed: {
    weekOfYear () {
      return moment().format('w')
    },
    startOfWeek () {
      return moment().startOf('week').format('D')
    },
    endOfWeek () {
      return moment().endOf('week').format('D')
    },
    currentMonth () {
      return moment().format('MMMM')
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
  }

  .ion-ios-arrow-back {
    padding-right: var(--spacing);
  }

  .ion-ios-arrow-forward {
    padding-left: var(--spacing);
  }
</style>
