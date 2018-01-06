<template>
  <div class="settings-key">
    <div class="has-key">
      <div class="key" v-for="(keycap, index) in keys" :key="index">
        <div class="key-modifier" v-if="atOnce && index > 0">+</div>
        <div class="key-caption"> {{ keycap }}</div>
      </div>
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
      return this.keycap.split(/ (?:or|and) /)
    }
  },
  data () {
    return {
      atOnce: /and/.test(this.keycap)
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
  display: flex;
  flex-basis: 45%;
}

.key {
  display: flex;
}

.key + .key {
  margin-left: 10px;
}

.key-caption,
.key-modifier {
  min-width: 20px;
  text-align: center;
}

.key-caption {
  padding: 8px 12px;
  font-family: BlinkMacSystemFont, "Clear Sans", sans-serif;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 2px white;
}

.key-modifier {
  padding: 8px 4px;
  margin-left: -10px;
}
</style>
