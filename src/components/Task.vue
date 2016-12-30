<template>
  <div>
    <task-checkbox v-model="task.completion"></task-checkbox>
    <task-input
      v-model="task.body"
      v-on:focus-task="focus"
      v-on:update-task="update"
      v-on:create-task="create"
      v-on:focus-previous-task="focusPrevious"
      v-on:focus-next-task="focusNext"
      v-on:remove-task="remove">
    </task-input>
  </div>
</template>

<script>
import TaskCheckbox from 'components/Task/Checkbox'
import TaskInput from 'components/Task/Input'

// TODO: checkbox - check/uncheck
export default {
  name: 'task',
  props: {
    task: {
      required: true
    }
  },
  computed: {
    index () {
      return this.$store.getters.indexOfTask(this.task)
    }
  },
  methods: {
    focus () {
      this.$store.commit('setActiveTask', this.index)
    },
    update (newValue) {
      this.$store.commit('updateActiveTaskBody', newValue)
    },
    create () {
      this.$store.commit('createTaskNextToActiveTask')
      this.focusNext()
    },
    remove () {
      this.$store.commit('removeActiveTask')
      this.focusPrevious()
    },
    focusPrevious () {
      this.$emit('focus', this.index - 1)
    },
    focusNext () {
      this.$emit('focus', this.index + 1)
    }
  },
  components: {
    TaskCheckbox,
    TaskInput
  }
}
</script>
