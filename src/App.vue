<template>
  <div>
    <div>
      &lt;
      Week 53
      23 - 31 December
      &gt;
    </div>

    <div v-for="(tasks, date) in week">
      <p>{{ dayOfWeek(date) }}</p>
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
import moment from 'moment'

export default {
  name: 'app',
  computed: {
    week () {
      return groupBy(this.tasks, 'date')
    }
  },
  methods: {
    dayOfWeek (date) {
      return moment(date).format('dddd')
    }
  },
  data () {
    return {
      tasks: [
        {
          body: '13:00 - 14:00 lunch with client',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: '16:00 - 18:00 lunch with client',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: 'go to gym #everyday',
          completion: true,
          date: '2016-12-27'
        },
        {
          body: 'pay tax for November',
          completion: true,
          date: '2016-12-27',
          note: 'phone to Joshua: +32 655 633 653. Ask about a ship container from Hong Kong'
        },
        {
          body: 'take yoga lesson',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: 'call mum',
          completion: false,
          date: '2016-12-27'
        },
        {
          body: '13:00 - 14:00 lunch with bruh',
          completion: false,
          date: '2016-12-28'
        },
        {
          body: 'go to gym #everyday',
          completion: true,
          date: '2016-12-28'
        },
        {
          body: 'update webpage',
          completion: true,
          date: '2016-12-28'
        },
        {
          body: 'buy a birthday gift for LS',
          completion: false,
          date: '2016-12-28'
        }
      ]
    }
  }
}
</script>

<style>
</style>
