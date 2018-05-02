<template>
  <span>
    <input type="checkbox" id="hide-option" v-model="checked">
    <label for="hide-option">Hide completed tasks</label>
  </span>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'settings-hide',
  computed: {
    ...mapGetters(['hideCompleted']),
    checked: {
      get () {
        return this.hideCompleted
      },
      set (hideCompleted) {
        this.setHideCompleted(hideCompleted)
      }
    }
  },
  methods: {
    ...mapMutations(['setHideCompleted'])
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
@import '../../variables.css';

/* TODO This style could actually be moved to the settings component to use the same styling for all future options. */

:root {
  --checkbox-size: 20px;
  --checkbox-inner-size: calc(var(--checkbox-size) - 2px);
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}

[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

[type="checkbox"]:not(:checked) + label::before,
[type="checkbox"]:checked + label::before {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  content: '';
  background: #fff;
  border: 1px solid #fff;
  border-radius: calc(var(--checkbox-size) / 2);
}

[type="checkbox"]:not(:checked) + label::after,
[type="checkbox"]:checked + label::after {
  position: absolute;
  top: 1px;
  left: 1px;
  display: block;
  width: var(--checkbox-inner-size);
  height: var(--checkbox-inner-size);
  content: '';
  border-radius: calc(var(--checkbox-inner-size) / 2);
  transition: all var(--transition-duration);
}

[type="checkbox"]:not(:checked) + label::after {
  background: #fff;
  border: 1px solid var(--color-primary);
}

[type="checkbox"]:checked + label::after {
  background: var(--color-primary);
  border: 1px solid #fff;
}
</style>
