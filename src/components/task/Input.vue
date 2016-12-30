<template>
  <div>
    <div v-if="active">
      <input
        type="text"
        ref="input"
        :value="task.body"
        @input="updateTask"
        @keyup.enter="createTask"
        @keyup.up="focusPreviousTask"
        @keyup.down="focusNextTask"
        @keydown.delete="removeTask">
    </div>
    <div v-else @click="focusTask">
      {{ task.body }}
    </div>
  </div>
</template>

<script>
import trim from 'lodash/trim'

export default {
  name: 'task-input',
  props: {
    task: {
      required: true
    }
  },
  computed: {
    activeTask () {
      return this.$store.getters.activeTask
    },
    active () {
      const isActive = this.activeTask === this.task
      if (isActive) { this.$nextTick(() => this.$refs.input.focus()) }
      return isActive
    }
  },
  methods: {
    updateTask (event) {
      this.$store.commit('updateTaskBody', event.target.value)
    },
    createTask () {
      this.$store.commit('createTask')
    },
    removeTask (event) {
      const isEmpty = trim(this.task.body).length === 0
      if (isEmpty) {
        event.preventDefault()
        this.$store.commit('removeTask')
      }
    },
    focusTask () {
      this.$store.commit('focusTask', this.task)
    },
    focusPreviousTask () {
      this.$store.commit('focusPreviousTask')
    },
    focusNextTask () {
      this.$store.commit('focusNextTask')
    }
  }
}
</script>

<style scoped>
  @import '../../defaults.css';

  input {
    border: 0;
    padding: 0;
    background-color: transparent;
    outline: 0;
    font-family: var(--font-stack);
    line-height: var(--font-leading);
  }
</style>
