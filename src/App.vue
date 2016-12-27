<template>
  <div>
    <div>
      &lt;
      Week 53
      23 - 31 December
      &gt;
    </div>

    <div v-for="(tasks, day) in week">
      <p>{{ day }}</p>
      <ul v-for="task in tasks">
        <li>
          <input type="checkbox" v-model="task.completion">
          {{ task.body }}
          <div>
            {{ task.note }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'

export default {
  name: 'app',
  computed: {
    week () {
      return groupBy(this.tasks, 'date')
    }
  },
  data () {
    return {
      tasks: [
        {
          body: '13:00 - 14:00 lunch with client',
          completion: false,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: '16:00 - 18:00 lunch with client',
          completion: false,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'go to gym #everyday',
          completion: true,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'pay tax for November',
          completion: true,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)',
          note: 'phone to Joshua: +32 655 633 653. Ask about a ship container from Hong Kong'
        },
        {
          body: 'take yoga lesson',
          completion: false,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'call mum',
          completion: false,
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: '13:00 - 14:00 lunch with bruh',
          completion: false,
          date: 'Tue Dec 28 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'go to gym #everyday',
          completion: true,
          date: 'Tue Dec 28 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'update webpage',
          completion: true,
          date: 'Tue Dec 28 2016 18:00:00 GMT+0100 (CET)'
        },
        {
          body: 'buy a birthday gift for LS',
          completion: false,
          date: 'Tue Dec 28 2016 18:00:00 GMT+0100 (CET)'
        }
      ]
    }
  }
}
</script>

<style>
</style>
