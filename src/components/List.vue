<template>
  <div>
    <div v-for="(tasks, date) in list">
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
import moment from 'moment'
import Task from 'components/Task'

export default {
  name: 'list',
  components: {
    Task
  },
  computed: {
    list () {
      return this.$store.getters.list
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
