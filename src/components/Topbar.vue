<template>
  <div>
    <div class="titlebar" v-if="isMac"></div>
    <div class="topbar" :style="{paddingTop: isMac && 0}">
      <i class="icon icon-chevron-left" @click="showPreviousWeek"></i>
      <div class="topbar-week" @click="showPreviousWeek" v-cloak>
        {{ year }} - {{ weekOfYear }}
      </div>
      <div class="topbar-date" @click="showNextWeek" v-cloak>
        {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
      </div>
      <i class="icon icon-chevron-right" @click="showNextWeek"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import platform from 'platform'

export default {
  name: 'topbar',
  created () {
    this.setTimeline()
  },
  computed: {
    ...mapGetters(['timeline']),
    isMac () {
      return platform.os.family === 'Darwin'
    },
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
@import '../variables.css';

.topbar {
  display: flex;
  align-items: center;
  padding: var(--spacing-unit);
  font-size: var(--font-large);
}

.titlebar {
  height: calc(var(--spacing-unit) * 2);
  -webkit-app-region: drag;
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
