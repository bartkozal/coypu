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
  @import '../../variables.css';

  :root {
    --checkbox-size: 21px;
    --checkbox-inner-size: calc(var(--checkbox-size) - 6px);
  }

  .task-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--checkbox-size);
    height: var(--checkbox-size);
    margin-top: 2px;
    margin-right: var(--spacing-unit);
    border: 1px solid var(--color-secondary);
    border-radius: 50%;
  }

  .task-checkbox-inner {
    display: block;
    width: var(--checkbox-inner-size);
    height: var(--checkbox-inner-size);
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
