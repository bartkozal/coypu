<template>
  <div>
    <div v-if="active">
      <input
        ref="input"
        type="text"
        :value="value"
        @blur="active = false"
        @input="updateValue"
        @keyup.enter="addNewTask"
        @keyup.up="focusPreviousTask"
        @keyup.down="focusNextTask"
        @keydown.delete="removeTask"
      />
    </div>
    <div v-else @click="active = true">
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
    addNewTask () {
      console.debug('Add new task')
    },
    focusPreviousTask () {
      console.debug('Focus previous task')
    },
    focusNextTask () {
      console.debug('Focus next task')
    },
    removeTask (event) {
      const isInputEmpty = trim(event.target.value).length === 0
      if (isInputEmpty) { console.debug('Remove task') }
    }
  },
  data () {
    return {
      _active: false
    }
  }
}
</script>

<style>
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
