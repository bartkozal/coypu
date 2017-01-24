<template>
  <div>
    <transition name="transition">
      <div class="settings-view" v-if="isActive">
        <i class="icon icon-close" @click="isActive = false"></i>
        <settings-key keycap="Enter">Add new task</settings-key>
        <settings-key keycap="Backspace">Remove task</settings-key>
        <settings-key keycap="Tab">Complete task</settings-key>
        <settings-key keycap="↑ or ↓">Jump between tasks</settings-key>
      </div>
    </transition>
    <i class="icon" @click="isActive = !isActive"
      :class="isActive ? 'icon-settings-active' : 'icon-settings'"></i>
  </div>
</template>

<script>
import SettingsKey from 'components/Settings/Key'

export default {
  name: 'settings',
  data () {
    return {
      isActive: false
    }
  },
  components: {
    SettingsKey
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  .icon-close {
    position: fixed;
    top: var(--spacing);
    right: var(--spacing);
  }

  .icon-settings,
  .icon-settings-active {
    position: fixed;
    bottom: var(--spacing);
    right: var(--spacing);
    z-index: var(--z-settings-icon);
  }

  .settings-view {
    position: fixed;
    padding: calc(var(--spacing) * 2);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-settings-view);
    background-color: var(--color-primary);
    font-size: 16px;
  }

  .transition-enter,
  .transition-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .transition-enter-to,
  .transition-leave {
    transform: translateY(0);
    opacity: 1;
  }

  .transition-enter-active,
  .transition-leave-active {
    transition: all var(--transition-duration);
  }
</style>
