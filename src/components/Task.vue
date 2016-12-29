<template>
  <div>
    <task-checkbox v-model="task.completion"></task-checkbox>
    <task-input
      v-model="task.body"
      v-on:update-task="update"
      v-on:create-task="create"
      v-on:focus-previous-task="focusPrevious"
      v-on:focus-next-task="focusNext"
      v-on:remove-task="remove"
    ></task-input>
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
    date: {
      required: true
    }
  },
  methods: {
    update (value) {
      console.debug(`Update with ${value}`)
    },
    create () {
      console.debug(`Create`)
    },
    focusPrevious () {
      console.debug(`Focus previous`)
    },
    focusNext () {
      console.debug(`Focus next`)
    },
    remove () {
      console.debug(`Remove`)
    }
  },
  components: {
    TaskCheckbox,
    TaskInput
  }
}
</script>
