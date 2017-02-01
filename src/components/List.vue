<template>
  <div>
    <div v-for="(tasks, day) in list">
      <div :class="{'list-today': isToday(day)}" class="list-name" @click="createTask({ day })">
        {{ dayOfWeek(day) }}
      </div>

      <div v-if="isEmpty(tasks)">
        <div class="list-mock" @click="createTask({ day })"></div>
      </div>

      <div v-else>
        <ul class="list">
          <li class="list-item" v-for="task in tasks">
            <task :day="day" :task="task"></task>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { isEmpty } from 'lodash'
import Task from 'components/Task'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list',
  components: {
    Task
  },
  computed: {
    ...mapGetters(['list', 'calendarLocale'])
  },
  methods: {
    ...mapActions(['createTask']),
    dayOfWeek (date) {
      return moment(date).locale(this.calendarLocale).format('dddd - Do')
    },
    isEmpty (tasks) {
      return isEmpty(tasks)
    },
    isToday (date) {
      return moment().isSame(date, 'day')
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
