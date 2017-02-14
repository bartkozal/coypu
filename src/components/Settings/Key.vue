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
  display: flex;
  align-items: center;
  color: white;
}

.settings-key + .settings-key {
  margin-top: 12px;
}

.has-key {
  flex-basis: 40%;
}

.key {
  display: inline-block;
  min-width: 20px;
  padding: 8px 12px;
  font-family: BlinkMacSystemFont, "Clear Sans";
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 2px white;
}

.key + .key {
  margin-left: 10px;
}
</style>
