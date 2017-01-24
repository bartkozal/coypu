<template>
  <div>
    <transition name="transition">
      <div class="settings-view" v-if="isActive">
        <i class="icon icon-close ion-ios-close-outline" @click="isActive = false"></i>
      </div>
    </transition>
    <i class="icon icon-settings ion-ios-settings"
      @click="isActive = !isActive"
      :class="{ 'icon-settings-active': isActive }"></i>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  .icon {
    font-size: calc(var(--font-large) * 1.2);
    cursor: pointer;
  }

  .icon-close {
    position: fixed;
    top: 10px;
    right: 10px;
    color: white;
  }

  .icon-settings {
    position: fixed;
    bottom: 10px;
    right: 10px;
    color: var(--color-primary);
    z-index: var(--z-settings-icon);
  }

  .icon-settings-active {
    color: white;
  }

  .settings-view {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-primary);
    z-index: var(--z-settings-view);
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
