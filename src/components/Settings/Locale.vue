<template>
  <select>
    <option>English (GB)</option>
  </select>
</template>

<script>
export default {
  name: 'settings-locale'
}
</script>

<style scoped>
  @import '../../defaults.css';

  select {
    width: 50%;
    padding: 4px 10px 6px;
    appearance: none;
    color: white;
    border: 1px solid white;
    background-color: transparent;
    background-image: url('../../assets/bg-select.svg');
    background-repeat: no-repeat;
    background-position: center right 10px;
    font-family: var(--font-stack);
    font-size: var(--font-settings);
  }

  select:focus {
    outline: none;
  }
</style>
