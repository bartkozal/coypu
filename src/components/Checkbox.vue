<template>
  <div>
    <div class="checkbox" @click="checkbox = !checkbox">
      <transition name="transition">
        <div class="checkbox-inner" v-if="value"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      checkbox: {
        get () {
          return this.value
        },
        set (newValue) {
          this.$emit('input', newValue)
        }
      }
    }
  }
</script>

<style scoped>
  @import '../defaults.css';

  :root {
    --size: 20px;
  }

  .checkbox {
    position: relative;
    width: var(--size);
    height: var(--size);
    display: block;
    float: left;
    margin-right: var(--spacing);
    border-radius: 50%;
    border: 1px solid var(--color-secondary);
  }

  .checkbox-inner {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(var(--size) - 4px);
    height: calc(var(--size) - 4px);
    display: block;
    border-radius: 50%;
    background-color: var(--color-secondary);
  }

  .transition-enter-active, .transition-leave-active {
    transition: all var(--transition-duration);
  }
  .transition-enter, .transition-leave-active {
    opacity: 0;
    transform: scale(.6);
  }
</style>
