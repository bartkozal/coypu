<template>
  <div class="topbar">
    <i class="icon icon-chevron-left" @click="showPreviousWeek"></i>
    <div class="topbar-week" @click="showPreviousWeek" v-cloak>
      {{ year }} - {{ weekOfYear }}
    </div>
    <div class="topbar-date" @click="showNextWeek" v-cloak>
      {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
    </div>
    <i class="icon icon-chevron-right" @click="showNextWeek"></i>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'topbar',
  created () {
    this.setTimeline()
  },
  computed: {
    ...mapGetters(['timeline']),
    year () {
      return this.timeline.format('YYYY')
    },
    weekOfYear () {
      return this.timeline.format('w')
    },
    startOfWeek () {
      return this.timeline.startOf('week').format('D')
    },
    endOfWeek () {
      return this.timeline.endOf('week').format('D')
    },
    currentMonth () {
      return this.timeline.format('MMMM')
    }
  },
  methods: {
    ...mapActions(['setTimeline']),
    showPreviousWeek () {
      const previousWeek = this.timeline.subtract({ weeks: 1 }).format()
      this.setTimeline(previousWeek)
    },
    showNextWeek () {
      const nextWeek = this.timeline.add({ weeks: 1 }).format()
      this.setTimeline(nextWeek)
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
