<template>
  <div>
    <div v-for="(tasks, date) in week">
      <span class="day-name">{{ dayOfWeek(date) }}</span>
      <ul class="list">
        <li v-for="task in tasks">
          <task :task="task" :date="date"></task>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Task from 'components/Task'

export default {
  name: 'week-list',
  components: {
    Task
  },
  computed: {
    week () {
      return this.$store.getters.currentWeek
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

  .list {
    list-style: none;
    padding-left: 0;
  }

  .list > li + li {
    margin-top: 6px;
  }

  .day-name {
    font-size: var(--font-large);
  }
</style>
