<template>
  <div class="task-input">
    <div v-show="active">
      <textarea
        rows="1"
        ref="textarea"
        :value="task.body"
        @focus="autosizeTextarea"
        @input="updateTask"
        @keyup.enter="createTask"
        @keyup.up="focusPreviousTask"
        @keyup.down="focusNextTask"
        @keydown.delete="removeTask">
      </textarea>
    </div>
    <div class="textarea-mock" v-show="!active" @click="focusTask">
      {{ task.body }}
    </div>
  </div>
</template>

<script>
import trim from 'lodash/trim'
import autosize from 'autosize'

export default {
  name: 'task-input',
  mounted () {
    autosize(this.$refs.textarea)
  },
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
      if (isActive) { this.$nextTick(() => this.$refs.textarea.focus()) }
      return isActive
    }
  },
  methods: {
    autosizeTextarea () {
      autosize.update(this.$refs.textarea)
    },
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

  .task-input {
    flex-grow: 1;
  }

  .textarea-mock {
    width: 100%;
    cursor: text;
    min-height: 25px; /* rounded calc(var(--font-base) * var(--font-leading)) */
  }

  textarea {
    display: block;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    outline: 0;
    font-family: var(--font-stack);
    line-height: var(--font-leading);
    width: 100%;
    resize: none;
    overflow: auto;
  }
</style>
