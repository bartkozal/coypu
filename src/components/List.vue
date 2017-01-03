<template>
  <div>
    <div v-for="(tasks, date) in activeWeek">
      <span>{{ dayOfWeek(date) }}</span>
      <ul>
        <li v-for="task in tasks">
          <task :task="task"></task>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import filter from 'lodash/filter'
import tap from 'lodash/tap'
import moment from 'moment'
import 'moment-range'
import Task from 'components/Task'

export default {
  name: 'list',
  components: {
    Task
  },
  computed: {
    activeDate () {
      return this.$store.getters.activeDate
    },
    tasks () {
      return this.$store.getters.tasks
    },
    activeWeek () {
      const startOfWeek = moment(this.activeDate).startOf('week')
      const endOfWeek = moment(this.activeDate).endOf('week')

      return tap({}, (result) => {
        moment.range(startOfWeek, endOfWeek).by('days', moment => {
          const date = moment.format('YYYY-MM-DD')
          result[date] = filter(this.tasks, ['date', date])
        })
      })
    }
  },
  methods: {
    dayOfWeek (date) {
      return moment(date).format('dddd - Do')
    }
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  span {
    font-size: var(--font-large);
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li + li {
    margin-top: calc(var(--spacing) / 2);
  }
</style>
