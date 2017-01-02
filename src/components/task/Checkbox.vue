<template>
  <div class="task-checkbox" @click="completion = !completion">
    <transition name="transition">
      <div class="task-checkbox-inner" v-if="completion"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'task-checkbox',
    props: {
      task: {
        required: true
      }
    },
    computed: {
      completion: {
        get () {
          return this.task.completion
        },
        set (newValue) {
          this.$store.commit('updateTaskCompletion', { task: this.task, completion: newValue })
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../defaults.css';

  :root {
    --size: 20px;
  }

  .task-checkbox {
    position: relative;
    min-width: var(--size);
    height: var(--size);
    margin-top: 2px;
    margin-right: var(--spacing);
    border-radius: 50%;
    border: 1px solid var(--color-secondary);
  }

  .task-checkbox-inner {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(var(--size) - 4px);
    height: calc(var(--size) - 4px);
    display: block;
    border-radius: 50%;
    background-color: var(--color-primary);
  }

  .transition-enter-active,
  .transition-leave-active {
    transition: all var(--transition-duration);
  }

  .transition-enter,
  .transition-leave-active {
    opacity: 0;
    transform: scale(.6);
  }
</style>
