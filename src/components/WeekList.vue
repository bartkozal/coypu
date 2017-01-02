<template>
  <div>
    <div v-for="(tasks, date) in weekList">
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
import inRange from 'lodash/inrange'
import Task from 'components/Task'

export default {
  name: 'week-list',
  components: {
    Task
  },
  computed: {
    weekList () {
      return this.$store.getters.weekList
    }
  },
  methods: {
    dayOfWeek (date) {
      return moment(date).format('dddd - Do')
    },
    focus (index) {
      if (inRange(index, 0, this.tasksCount)) {
        // this -> Task -> TaskInput -> focus input
        this.$children[index].$children[1].focusTask()
      }
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
