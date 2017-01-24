<template>
  <div class="settings-key">
    <div class="has-key">
      <div class="key" v-for="keycap in keys">{{ keycap }}</div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings-key',
  props: {
    keycap: {
      required: true,
      string: true
    }
  },
  computed: {
    keys () {
      return this.keycap.split(' or ')
    }
  }
}
</script>

<style scoped>
  .settings-key {
    color: white;
    display: flex;
    align-items: center;
  }

  .settings-key + .settings-key {
    margin-top: 12px;
  }

  .has-key {
    flex-basis: 40%;
  }

  .key {
    display: inline-block;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 0 2px white;
    min-width: 20px;
    text-align: center;
  }

  .key + .key {
    margin-left: 10px;
  }
</style>
