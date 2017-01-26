<template>
  <div class="topbar">
    <i class="icon icon-chevron-left" @click="previousWeek"></i>
    <div class="topbar-week" @click="previousWeek" v-cloak>
      {{ year }} - {{ weekOfYear }}
    </div>
    <div class="topbar-date" @click="nextWeek" v-cloak>
      {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
    </div>
    <i class="icon icon-chevron-right" @click="nextWeek"></i>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'topbar',
  created () {
    this.setList(moment().format())
  },
  computed: {
    ...mapGetters(['activeDate', 'calendarLocale']),
    year () {
      return this.calendar().format('YYYY')
    },
    weekOfYear () {
      return this.calendar().format('w')
    },
    startOfWeek () {
      return this.calendar().startOf('week').format('D')
    },
    endOfWeek () {
      return this.calendar().endOf('week').format('D')
    },
    currentMonth () {
      return this.calendar().format('MMMM')
    }
  },
  methods: {
    ...mapActions(['setList']),
    calendar () {
      return moment(this.activeDate).locale(this.calendarLocale)
    },
    previousWeek () {
      const previousWeek = this.calendar().subtract({ weeks: 1 }).format()
      this.setList(previousWeek)
    },
    nextWeek () {
      const nextWeek = this.calendar().add({ weeks: 1 }).format()
      this.setList(nextWeek)
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
    cursor: pointer;
  }

  .topbar-date {
    cursor: pointer;
  }
</style>
