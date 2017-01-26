<template>
  <div class="task-input">
    <textarea
      rows="1"
      ref="textarea"
      :value="task.body"
      :class="{'task-completed': task.completion }"
      :active="active"
      @blur="saveActiveList"
      @focus="selectTask(task)"
      @input="updateTaskBody"
      @keydown.esc.prevent="deselectTask"
      @keydown.enter.prevent="createOrSplitTask"
      @keydown.up.prevent="selectPreviousTask"
      @keydown.down.prevent="selectNextTask"
      @keydown.delete="removeCharOrJoinTasks"
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
    }
  },
  computed: {
    ...mapGetters(['activeTask', 'caretOffset']),
    active () {
      const isActive = this.activeTask === this.task

      this.$nextTick(() => {
        const el = this.$refs.textarea
        autosize.update(el)

        if (isActive) {
          el.focus()
          if (this.caretOffset !== 0) {
            const position = el.value.length - this.caretOffset
            el.setSelectionRange(position, position)
            this.$store.dispatch('setCaretOffset', 0)
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
      'saveActiveList', 'deselectTask', 'updateTask', 'createTask', 'joinTasks',
      'selectTask', 'selectPreviousTask', 'selectNextTask'
    ]),
    deselectTask () {
      this.$refs.textarea.blur()
      this.deselectTask()
    },
    updateTaskBody: function (event) {
      this.updateTask({ body: event.target.value })
    },
    updateTaskCompletion () {
      this.updateTask({ completion: !this.task.completion })
    },
    createOrSplitTask () {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0
      const hasBody = this.task.body.length > 0

      if (isCaretAtBeginning && hasBody) {
        this.createTask({ atIndex: 0 })
      } else {
        const slice = this.task.body.slice(el.selectionStart)
        this.task.body = this.task.body.slice(0, el.selectionStart)
        this.createTask({ body: slice, offset: slice.length })
      }
    },
    removeCharOrJoinTasks (event) {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0

      if (isCaretAtBeginning) {
        event.preventDefault()
        this.joinTasks({ offset: this.task.body.length })
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
