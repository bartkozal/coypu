import Vue from 'vue'
import SettingsKey from 'components/Settings/Key.vue'

const ctor = ({ keycap }) => {
  return new Vue({
    extends: SettingsKey,
    propsData: { keycap }
  })
}

describe('keys', () => {
  test('return single key for one word keycap', () => {
    const vm = ctor({ keycap: 'Enter' })
    expect(vm.keys).toEqual(['Enter'])
  })

  test('return multiple keys for keycap with "or"', () => {
    const vm = ctor({ keycap: 'Down or Up' })
    expect(vm.keys).toEqual(['Down', 'Up'])
  })

  test('return multiple keys for keycap with "and"', () => {
    const vm = ctor({ keycap: 'Shift and T' })
    expect(vm.keys).toEqual(['Shift', 'T'])
  })
})

describe('atOnce', () => {
  test('return false for one word keycap', () => {
    const vm = ctor({ keycap: 'Enter' })
    expect(vm.atOnce).toBe(false)
  })

  test('return false for keycap with "or"', () => {
    const vm = ctor({ keycap: 'Down or Up' })
    expect(vm.atOnce).toBe(false)
  })

  test('return true for keycap with "and"', () => {
    const vm = ctor({ keycap: 'Shift and T' })
    expect(vm.atOnce).toBe(true)
  })
})

test('keycap with "and" renders "+" connector', () => {
  const vm = ctor({ keycap: 'Shift and T'})
  const el = vm.$mount().$el
  expect(el.innerHTML).toMatch('+')
})
