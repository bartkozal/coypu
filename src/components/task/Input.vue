<template>
  <div>
    <div v-if="active">
      <input
        ref="input"
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
  computed: {
    active: {
      get () {
        return this.$data._active
      },
      set (newValue) {
        this.$data._active = newValue
        if (newValue) {
          this.$nextTick(() => this.$refs.input.focus())
        }
      }
    }
  },
  methods: {
    updateValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  data () {
    return {
      _active: false
    }
  }
}
</script>

<style>
  @import '../../defaults.css';

  input {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    outline: 0;
    font-family: var(--font-stack);
    line-height: var(--font-leading);
    color: lightgrey;
    width: 50%;
  }
</style>
