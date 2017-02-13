<template>
  <div class="task-checkbox" @click="toggleTask(task)">
    <transition name="transition">
      <div class="task-checkbox-inner" v-if="task.completion"></div>
    </transition>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'task-checkbox',
    props: {
      task: {
        required: true
      }
    },
    methods: {
      ...mapActions(['toggleTask'])
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
    border: 1px solid var(--color-secondary);
    border-radius: 50%;
  }

  .task-checkbox-inner {
    position: absolute;
    top: 2px;
    left: 2px;
    display: block;
    width: calc(var(--size) - 4px);
    height: calc(var(--size) - 4px);
    background-color: var(--color-primary);
    border-radius: 50%;
  }

  .transition-enter-active,
  .transition-leave-active {
    transition: all var(--transition-duration);
  }

  .transition-enter,
  .transition-leave-active {
    opacity: 0;
    transform: scale(0.6);
  }
</style>
