<template>
  <div>
    &lt;
    Week {{ weekOfYear }}
    {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
    &gt;
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