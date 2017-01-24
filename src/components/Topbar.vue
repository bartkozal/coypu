<template>
  <div class="topbar">
    <i class="icon icon-chevron-left ion-ios-arrow-back" @click="previousWeek"></i>
    <div class="topbar-week" @click="previousWeek" v-cloak>
      {{ year }} w{{ weekOfYear }}
    </div>
    <div class="topbar-date" @click="nextWeek" v-cloak>
      {{ startOfWeek }} - {{ endOfWeek }} {{ currentMonth }}
    </div>
    <i class="icon icon-chevron-right ion-ios-arrow-forward" @click="nextWeek"></i>
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
    ...mapGetters(['activeDate']),
    year () {
      return moment(this.activeDate).format('YYYY')
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
    ...mapActions(['setList']),
    previousWeek () {
      const previousWeek = moment(this.activeDate).subtract({ weeks: 1 }).format()
      this.setList(previousWeek)
    },
    nextWeek () {
      const nextWeek = moment(this.activeDate).add({ weeks: 1 }).format()
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

  .icon {
    color: var(--color-primary);
    font-size: calc(var(--font-large) - 2px);
    cursor: pointer;
  }

  .icon-chevron-left {
    padding-right: var(--spacing);
  }

  .icon-chevron-right {
    padding-left: var(--spacing);
  }
</style>
