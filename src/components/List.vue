<template>
  <div>
    <div v-for="(tasks, date) in list">
      <div :class="{'list-today': isToday(date)}" class="list-name" @click="createList(date)">
        {{ dayOfWeek(date) }}
      </div>

      <div v-if="tasks.length === 0">
        <div class="list-mock" @click="createList(date)"></div>
      </div>

      <div v-else>
        <ul class="list">
          <li class="list-item" v-for="task in tasks">
            <task :task="task"></task>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import filter from 'lodash/filter'
import tap from 'lodash/tap'
import moment from 'moment'
import 'moment-range'
import Task from 'components/Task'

export default {
  name: 'list',
  components: {
    Task
  },
  computed: {
    activeDate () {
      return this.$store.getters.activeDate
    },
    tasks () {
      return this.$store.getters.tasks
    },
    list () {
      const startOfWeek = moment(this.activeDate).startOf('week')
      const endOfWeek = moment(this.activeDate).endOf('week')

      return tap({}, (result) => {
        moment.range(startOfWeek, endOfWeek).by('days', moment => {
          const date = moment.format('YYYY-MM-DD')
          result[date] = filter(this.tasks, ['date', date])
        })
      })
    }
  },
  methods: {
    dayOfWeek (date) {
      return moment(date).format('dddd - Do')
    },
    isToday (date) {
      return moment().isSame(date, 'day')
    },
    createList (date) {
      this.$store.commit('createList', date)
    }
  }
}
</script>

<style scoped>
  @import '../defaults.css';

  .list {
    list-style: none;
    padding-left: 0;
  }

  .list-item + .list-item {
    margin-top: calc(var(--spacing) / 2);
  }

  .list-today {
    box-shadow: inset 0 -1px 0 0 var(--color-text);
  }

  .list-name {
    display: inline-block;
    font-size: var(--font-large);
    cursor: pointer;
  }

  .list-mock {
    height: var(--mock-size);
    cursor: text;
  }

  .previous-list-enter,
  .next-list-leave-to {
    transform: translateX(-10%);
  },

  .next-list-enter,
  .previous-list-leave-to {
    transform: translateX(10%);
  }

  .previous-list-enter-to,
  .previous-list-leave,
  .next-list-enter-to,
  .next-list-leave {
    transform: translateX(0);
    opacity: 1;
  }

  .previous-list-enter,
  .next-list-enter,
  .previous-list-leave-to,
  .next-list-leave-to {
    opacity: 0;
  }

  .previous-list-enter-active,
  .previous-list-leave-active,
  .next-list-enter-active,
  .next-list-leave-active {
    transition: all var(--transition-duration) ease-in-out;
  }
</style>
