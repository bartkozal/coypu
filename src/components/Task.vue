<template>
  <div class="task">
    <task-checkbox :task="task"></task-checkbox>
    <task-input :day="day" :task="task"></task-input>
  </div>
</template>

<script>
import TaskCheckbox from 'components/Task/Checkbox'
import TaskInput from 'components/Task/Input'

export default {
  name: 'task',
  props: {
    task: {
      required: true
    },
    day: {
      required: true
    }
  },
  components: {
    TaskCheckbox,
    TaskInput
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  .task {
    display: flex;
    align-items: flex-start;
  }
</style>
