<template>
  <div>
    <div v-if="active">
      <input
        type="text"
        :value="value"
        @blur="active = false"
        @input="updateValue($event.target.value)"
      />
    </div>
    <div v-else @click="active = true">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-input',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>

<style>
  @import '../../defaults.css';

  input {
    border: 0;
    background-color: transparent;
    outline: 0;
    font-family: var(--font-stack);
    color: lightgrey;
    width: 50%;
  }
</style>
