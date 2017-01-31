<template>
  <div class="task-input">
    <textarea
      rows="1"
      ref="textarea"
      :value="task.body"
      :class="{'task-completed': task.completion }"
      :active="isActive"
      @blur="blurTask"
      @focus="selectTask({ day, task })"
      @input="updateTaskBody"
      @keydown.esc.prevent="blurTask"
      @keydown.enter.prevent="splitTask"
      @keydown.up.prevent="selectPreviousTask"
      @keydown.down.prevent="selectNextTask"
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
    splitTask () {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0
      const hasBody = this.task.body.length > 0

      if (isCaretAtBeginning && hasBody) {
        this.createTask({ day: this.day })
      } else {
        const slice = this.task.body.slice(el.selectionStart)
        this.task.body = this.task.body.slice(0, el.selectionStart)
        this.createTask({ day: this.day, body: slice, caretOffset: slice.length })
      }
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
