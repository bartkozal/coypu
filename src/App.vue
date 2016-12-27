<template>
  <div>
    <div>
      &lt;
      Week 53
      23 - 31 December
      &gt;
    </div>

    <div v-for="day in week">
      <p>{{ day.date }}</p>
      <ul v-for="task in day.tasks">
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
export default {
  name: 'app',
  data () {
    return {
      week: [
        {
          date: 'Tue Dec 27 2016 18:00:00 GMT+0100 (CET)',
          tasks: [
            {
              body: '13:00 - 14:00 lunch with client',
              completion: false
            },
            {
              body: '16:00 - 18:00 lunch with client',
              completion: false
            },
            {
              body: 'go to gym #everyday',
              completion: true
            },
            {
              body: 'pay tax for November',
              completion: true,
              note: 'phone to Joshua: +32 655 633 653. Ask about a ship container from Hong Kong'
            },
            {
              body: 'take yoga lesson',
              completion: false
            },
            {
              body: 'call mum',
              completion: false
            }
          ]
        },
        {
          date: 'Tue Dec 28 2016 18:00:00 GMT+0100 (CET)',
          tasks: [
            {
              body: '13:00 - 14:00 lunch with bruh',
              completion: false
            },
            {
              body: 'go to gym #everyday',
              completion: true
            },
            {
              body: 'update webpage',
              completion: true
            },
            {
              body: 'buy a birthday gift for LS',
              completion: false
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
