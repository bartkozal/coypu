<template>
  <div>
    <div v-for="(tasks, date) in week">
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
import moment from 'moment'
import TaskCheckbox from 'components/Task/Checkbox'
import TaskInput from 'components/Task/Input'

export default {
  name: 'list',
  components: {
    TaskCheckbox,
    TaskInput
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
