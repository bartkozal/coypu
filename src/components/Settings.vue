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
  right: var(--spacing);
  bottom: var(--spacing);
  z-index: var(--z-settings-icon);
}

.settings-view {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-settings-view);
  padding: calc(var(--spacing) * 2);
  font-size: var(--font-settings);
  color: white;
  background-color: var(--color-primary);
}

.settings-view-section {
  margin-bottom: calc(var(--spacing) * 3);
  text-align: center;
}

.settings-view-heading {
  margin-bottom: var(--spacing);
  font-size: var(--font-settings);
  font-weight: normal;
}

.transition-enter,
.transition-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.transition-enter-to,
.transition-leave {
  opacity: 1;
  transform: translateY(0);
}

.transition-enter-active,
.transition-leave-active {
  transition: all var(--transition-duration);
}
</style>
