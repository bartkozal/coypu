<template>
  <div>
    <div v-if="active">
      <input
        ref="input"
        type="text"
        :value="value"
        @input="updateValue"
        @blur="updateTask"
        @keyup.enter="createTask"
        @keyup.up="focusPreviousTask"
        @keyup.down="focusNextTask"
        @keydown.delete="removeTask">
    </div>
    <div v-else @click="focusTask">
      {{ value }}
    </div>
  </div>
</template>

<script>
import trim from 'lodash/trim'

export default {
  name: 'task-input',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created () {
    this.lastValue = this.value
  },
  computed: {
    active: {
      get () {
        return this.$data._active
      },
      set (newValue) {
        this.$data._active = newValue
        if (newValue) {
          this.$nextTick(() => this.$refs.input.focus())
        }
      }
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    },
    updateTask () {
      const isValueNew = this.value !== this.lastValue
      const isEmpty = trim(this.value).length === 0

      if (isValueNew && !isEmpty) {
        this.$emit('update-task', this.value)
        this.lastValue = this.value
      }
      this.active = false
    },
    createTask () {
      this.$emit('create-task')
    },
    focusTask () {
      this.$emit('focus-task')
      this.active = true
    },
    focusPreviousTask () {
      this.$emit('focus-previous-task')
    },
    focusNextTask () {
      this.$emit('focus-next-task')
    },
    removeTask () {
      const isEmpty = trim(this.value).length === 0
      if (isEmpty) { this.$emit('remove-task') }
    }
  },
  data () {
    return {
      lastValue: '',
      _active: false
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
