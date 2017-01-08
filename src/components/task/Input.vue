<template>
  <div class="task-input" :class="{'task-completed': task.completion }">
    <div v-show="active">
      <textarea
        rows="1"
        ref="textarea"
        :value="task.body"
        :class="{'task-completed': task.completion }"
        @focus="focus"
        @blur="blur"
        @input="updateTask"
        @keydown.enter.prevent="createTask"
        @keydown.up.prevent="selectPreviousTask"
        @keydown.down.prevent="selectNextTask"
        @keydown.delete="removeTask">
      </textarea>
    </div>
    <div class="textarea-mock" v-show="!active" @click="selectTask">
      {{ task.body }}
    </div>
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
    focus () {
      const el = this.$refs.textarea
      autosize.update(el)
      el.setSelectionRange(el.value.length, el.value.length)
    },
    blur () {
      this.$store.dispatch('saveActiveList')
    },
    updateTask (event) {
      this.$store.commit('updateTaskBody', event.target.value)
    },
    createTask () {
      this.$store.commit('createTask')
    },
    removeTask (event) {
      const isCaretAtBeginning = this.$refs.textarea.selectionStart === 0
      if (isCaretAtBeginning) {
        event.preventDefault()
        this.$store.commit('removeTask')
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
