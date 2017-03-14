<template>
  <div class="task-input">
    <textarea
      rows="1"
      ref="textarea"
      :value="task.body"
      :class="{'task-completed': task.completion }"
      :active="isActive"
      @focus="selectTask({ day, task })"
      @input="updateTaskBody"
      @keydown.esc.prevent="blurTask"
      @keydown.enter.prevent="splitTask"
      @keydown.up.prevent="selectPreviousTask"
      @keydown.down.prevent="selectNextTask"
      @keydown.left="handleLeftKey"
      @keydown.right="handleRightKey"
      @keydown.delete="removeTask"
      @keydown.tab.prevent="updateTaskCompletion">
    </textarea>
  </div>
</template>

<script>
import autosize from 'autosize'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'task-input',
  mounted () {
    autosize(this.$refs.textarea)
  },
  props: {
    task: {
      required: true
    },
    day: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['activeTask', 'caretOffset']),
    isActive () {
      const isActive = this.activeTask === this.task

      this.$nextTick(() => {
        const el = this.$refs.textarea
        autosize.update(el)

        if (isActive) {
          el.focus()
          if (this.caretOffset !== 0) {
            const position = el.value.length - this.caretOffset
            el.setSelectionRange(position, position)
          } else {
            el.setSelectionRange(el.value.length, el.value.length)
          }
        }
      })

      return isActive
    }
  },
  methods: {
    ...mapActions([
      'saveTimeline', 'deselectTask', 'updateTask', 'createTask', 'joinTasks',
      'selectTask', 'selectPreviousTask', 'selectNextTask'
    ]),
    handleLeftKey (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        this.moveCaretToStart(e)
      }
    },
    handleRightKey (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        this.moveCaretToEnd(e)
      }
    },
    blurTask () {
      this.$refs.textarea.blur()
      this.deselectTask()
    },
    updateTaskBody: function (event) {
      this.updateTask({ body: event.target.value })
    },
    updateTaskCompletion () {
      this.updateTask({ completion: !this.task.completion })
    },
    moveCaretToStart (event) {
      const el = this.$refs.textarea

      if (event.shiftKey) {
        el.setSelectionRange(0, el.selectionEnd, 'backward')
      } else {
        el.setSelectionRange(0, 0)
      }
    },
    moveCaretToEnd (event) {
      const el = this.$refs.textarea

      if (event.shiftKey) {
        el.setSelectionRange(el.selectionEnd, this.task.body.length, 'forward')
      } else {
        el.setSelectionRange(this.task.body.length, this.task.body.length)
      }
    },
    splitTask () {
      const el = this.$refs.textarea
      const slice = this.task.body.slice(el.selectionStart)
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0

      this.task.body = this.task.body.slice(0, el.selectionStart)
      this.createTask({
        day: this.day,
        body: slice,
        caretOffset: slice.length,
        insertBefore: isCaretAtBeginning
      })
    },
    removeTask (event) {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0

      if (isCaretAtBeginning) {
        event.preventDefault()
        this.joinTasks({ caretOffset: this.task.body.length })
      }
    }
  }
}
</script>

<style scoped>
  @import '../../variables.css';

  .task-input {
    flex-grow: 1;
  }

  .task-completed {
    color: var(--color-muted);
    text-decoration: line-through;
  }

  textarea {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: auto;
    font-family: inherit;
    line-height: inherit;
    resize: none;
    background-color: transparent;
    border: 0;
    outline: 0;
  }
</style>
