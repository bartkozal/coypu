<template>
  <div>
    <transition name="transition">
      <div class="settings-view" v-if="isActive">
        <i class="icon icon-close" @click="isActive = false"></i>

        <div class="settings-view-section">
          <h1 class="settings-view-heading">Calendar</h1>
          <settings-locale></settings-locale>
        </div>

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
import SettingsLocale from 'components/Settings/Locale'

export default {
  name: 'settings',
  data () {
    return {
      isActive: false
    }
  },
  components: {
    SettingsKey,
    SettingsLocale
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
    color: white;
    font-size: var(--font-settings);
  }

  .settings-view-section {
    text-align: center;
    margin-bottom: calc(var(--spacing) * 3);
  }

  .settings-view-heading {
    font-size: var(--font-settings);
    font-weight: normal;
    margin-bottom: var(--spacing);
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
