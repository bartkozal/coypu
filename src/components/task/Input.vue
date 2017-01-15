<template>
  <div class="task-input">
    <textarea
      rows="1"
      ref="textarea"
      :value="task.body"
      :class="{'task-completed': task.completion }"
      :active="active"
      @blur="blur"
      @focus="selectTask"
      @input="updateTaskBody"
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
import debounce from 'lodash/debounce'

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

      this.$nextTick(() => {
        const el = this.$refs.textarea
        autosize.update(el)
        el.setSelectionRange(el.value.length, el.value.length)

        if (isActive) { el.focus() }
      })

      return isActive
    }
  },
  methods: {
    blur: debounce(function () {
      this.$store.dispatch('saveActiveList')
    }, 200),
    deselectTask () {
      this.$refs.textarea.blur()
      this.$store.commit('selectTask', null)
    },
    updateTaskBody: debounce(function (event) {
      this.$store.dispatch('updateTask', { body: event.target.value })
    }, 200),
    updateTaskCompletion () {
      this.$store.dispatch('updateTask', { completion: !this.task.completion })
    },
    createTask () {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0
      const hasBody = this.task.body.length > 0

      if (isCaretAtBeginning && hasBody) {
        this.$store.commit('createTask', { atIndex: 0 })
      } else {
        const slice = this.task.body.slice(el.selectionStart)
        this.task.body = this.task.body.slice(0, el.selectionStart)
        this.$store.commit('createTask', { atIndex: 1, body: slice })
      }
    },
    removeCharOrJoinTask (event) {
      const el = this.$refs.textarea
      const isCaretAtBeginning = el.selectionStart === 0 && el.selectionEnd === 0

      if (isCaretAtBeginning) {
        event.preventDefault()
        this.$store.dispatch('joinTask')
      }
    },
    selectTask () {
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
