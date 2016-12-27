<template>
  <div>
    <i class="icon ion-ios-arrow-back"></i>
    Week {{ weekOfYear }}
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

<style>

</style>