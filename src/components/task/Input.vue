<template>
  <div class="task-input">
    <textarea
      rows="1"
      ref="textarea"
      :value="task.body"
      :class="{'task-completed': task.completion }"
      :active="active"
      @focus="selectTask"
      @blur="blur"
      @input="updateTask"
      @keydown.esc.prevent="deselectTask"
      @keydown.enter.prevent="createTask"
      @keydown.up.prevent="selectPreviousTask"
      @keydown.down.prevent="selectNextTask"
      @keydown.delete="removeCharOrJoinTask"
      @keydown.tab.prevent="updateTaskCompletion">
    </textarea>
  </div>
</template>

<script>
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
    blur () {
      this.$store.dispatch('saveActiveList')
    },
    deselectTask () {
      this.$store.commit('selectTask', null)
    },
    updateTask (event) {
      this.$store.commit('updateTaskBody', event.target.value)
    },
    updateTaskCompletion () {
      this.$store.commit('updateTaskCompletion', {
        task: this.task,
        completion: !this.task.completion
      })
    },
    createTask () {
      const isCaretAtBeginning = this.$refs.textarea.selectionStart === 0 &&
        this.$refs.textarea.selectionEnd === 0
      const hasBody = this.task.body.length > 0

      if (isCaretAtBeginning && hasBody) {
        this.$store.commit('createTask', { atIndex: 0 })
      } else {
        this.$store.commit('createTask', { atIndex: 1 })
      }
    },
    removeCharOrJoinTask (event) {
      const isCaretAtBeginning = this.$refs.textarea.selectionStart === 0 &&
        this.$refs.textarea.selectionEnd === 0

      if (isCaretAtBeginning) {
        event.preventDefault()
        this.$store.dispatch('joinTask')
      }
    },
    selectTask () {
      const el = this.$refs.textarea
      autosize.update(el)
      el.setSelectionRange(el.value.length, el.value.length)

      this.$store.commit('selectTask', this.task)
    },
    selectPreviousTask () {
      this.$store.commit('selectPreviousTask')
    },
    selectNextTask () {
      this.$store.commit('selectNextTask')
    }
  }
}
</script>

<style scoped>
  @import '../../defaults.css';

  .task-input {
    flex-grow: 1;
  }

  .task-completed {
    text-decoration: line-through;
    color: var(--color-muted);
  }

  .textarea-mock {
    width: 100%;
    cursor: text;
    min-height: var(--mock-size);
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
