<template>
  <div class="has-list">
    <div v-for="(tasks, day) in list">
      <div :class="{'list-today': isToday(day)}" class="list-name" @click="createTask({ day })">
        {{ dayOfWeek(day) }}
      </div>

      <div v-if="isEmpty(tasks)">
        <div class="list-mock" @click="createTask({ day })"></div>
      </div>

      <div v-else>
        <div class="list">
          <div class="list-item" v-for="task in tasks">
            <task :day="day" :task="task"></task>
          </div>
        </div>
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
@import '../variables.css';

.has-list {
  position: fixed;
  width: 100vw;
  height: calc(100vh - var(--font-base) * var(--font-ratio) * var(--font-leading) - var(--spacing-unit) * 2);
  padding: var(--spacing-unit);
  padding-top: 0;
  overflow-y: scroll;
}

.list {
  margin-top: calc(var(--spacing-unit) / 1.75);
  margin-bottom: calc(var(--spacing-unit) / 1.25);
}

.list-item + .list-item {
  margin-top: calc(var(--spacing-unit) / 2);
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
  height: var(--font-large);
  cursor: text;
}

.previous-list-enter,
.next-list-leave-to {
  transform: translateX(-10%);
}

.next-list-enter,
.previous-list-leave-to {
  transform: translateX(10%);
}

.previous-list-enter-to,
.previous-list-leave,
.next-list-enter-to,
.next-list-leave {
  opacity: 1;
  transform: translateX(0);
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
