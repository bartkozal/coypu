<template>
  <div>
    <div v-for="(tasks, date) in list">
      <span class="day-name">{{ dayOfWeek(date) }}</span>
      <ul class="list">
        <li v-for="task in tasks">
          <task-checkbox v-model="task.completion"></task-checkbox>
          <task-input v-model="task.body"></task-input>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import TaskCheckbox from 'components/task/Checkbox'
import TaskInput from 'components/task/Input'

export default {
  name: 'list',
  components: {
    TaskCheckbox,
    TaskInput
  },
  computed: {
    list () {
      return groupBy(this.tasks, 'date')
    }
  },
  methods: {
    dayOfWeek (date) {
      return moment(date).format('dddd')
    }
  },
  data () {
    return {
      tasks: [
        {
          body: 'go to gym',
          completion: true,
          date: '2016-12-27'
        },
        {
          body: 'pay tax for November',
          completion: true,
          date: '2016-12-27'
        },
        {
          body: 'take yoga lesson',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: 'call mum',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: 'lunch with bruh',
          completion: false,
          date: '2016-12-28'
        },
        {
          body: 'go to gym',
          completion: true,
          date: '2016-12-28'
        },
        {
          body: 'update webpage',
          completion: true,
          date: '2016-12-28'
        },
        {
          body: 'buy a birthday gift for LS',
          completion: false,
          date: '2016-12-28'
        }
      ]
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
