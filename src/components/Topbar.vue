<template>
  <div class="container">
    <i class="icon ion-ios-arrow-back"></i>
    <span class="week-name">Week {{ weekOfYear }}</span>
    {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
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

  .container {
    font-size: var(--font-large);
    margin-bottom: var(--spacing);
  }

  .week-name {
    color: var(--color-primary);
  }

  .icon {
    color: var(--color-primary);
  }

  .ion-ios-arrow-back {
    margin-right: var(--spacing);
  }

  .ion-ios-arrow-forward {
    margin-left: var(--spacing);
  }
</style>
