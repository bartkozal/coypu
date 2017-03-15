<template>
  <div class="task-input" :class="{'task-completed': task.completion }">
    <textarea
      rows="1"
      ref="body"
      :value="task.body"
      :active="isActive"
      @focus="selectTask({ day, task, withFocus: true })"
      @input="updateTaskBody"
      @keydown.esc.prevent="blurTask"
      @keydown.enter.prevent="handleEnterKey"
      @keydown.up.prevent="selectPreviousTask"
      @keydown.down.prevent="selectNextTask"
      @keydown.left="handleLeftKey"
      @keydown.right="handleRightKey"
      @keydown.delete="removeTask"
      @keydown.tab.prevent="updateTaskCompletion">
    </textarea>
    <textarea
      rows="1"
      class="task-note"
      ref="note"
      v-show="task.note || task.note === ''"
      :value="task.note"
      @focus="selectTask({ day, task, withFocus: false })"
      @input="updateTaskNote"
      @keydown.delete="removeNote"
      @keydown.esc.prevent="blurNote"
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
    autosize(this.$refs.body)
    autosize(this.$refs.note)
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
    ...mapGetters(['activeTask', 'caretOffset', 'selectWithFocus']),
    isActive () {
      const isActive = this.activeTask === this.task

      this.$nextTick(() => {
        const el = this.$refs.body
        autosize.update(el)

        if (isActive) {
          if (this.selectWithFocus) { el.focus() }
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
      'saveTimeline', 'deselectTask', 'updateTask', 'createTask',
      'joinTasks', 'selectTask', 'selectPreviousTask', 'selectNextTask'
    ]),
    handleEnterKey (e) {
      e.shiftKey ? this.focusNote() : this.splitTask()
    },
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
      this.$refs.body.blur()
      this.deselectTask()
    },
    updateTaskBody (event) {
      this.updateTask({ body: event.target.value })
    },
    updateTaskCompletion () {
      this.updateTask({ completion: !this.task.completion })
    },
    updateTaskNote (event) {
      this.updateTask({ note: event.target.value })
    },
    moveCaretToStart (event) {
      const el = this.$refs.body

      if (event.shiftKey) {
        el.setSelectionRange(0, el.selectionEnd, 'backward')
      } else {
        el.setSelectionRange(0, 0)
      }
    },
    moveCaretToEnd (event) {
      const el = this.$refs.body

      if (event.shiftKey) {
        el.setSelectionRange(el.selectionEnd, this.task.body.length, 'forward')
      } else {
        el.setSelectionRange(this.task.body.length, this.task.body.length)
      }
    },
    splitTask () {
      const el = this.$refs.body
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
      const el = this.$refs.body
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0

      if (isCaretAtBeginning) {
        event.preventDefault()
        this.joinTasks({ caretOffset: this.task.body.length })
      }
    },
    focusNote () {
      if (!this.task.note) { this.updateTask({ note: '' }) }

      this.$nextTick(() => {
        const el = this.$refs.note
        autosize.update(el)
        el.focus()
        el.setSelectionRange(this.task.note.length, this.task.note.length)
      })
    },
    blurNote () {
      const el = this.$refs.body
      el.focus()
      el.setSelectionRange(this.task.body.length, this.task.body.length)
    },
    removeNote (e) {
      if (this.task.note.trim().length === 0) {
        e.preventDefault()
        this.updateTask({ note: null })
        this.blurNote()
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

.task-note {
  font-size: var(--font-small);
  color: var(--color-primary);
}

.task-completed > textarea {
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
