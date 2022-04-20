<template>
  <div class="appointment">
    <div class="appointment-header">
      <span class="appointment-header-title">新建预约</span>
      <span>4月7日 星期四 今天</span>
    </div>
    <div class="appointment-content">
      <div class="appointment-calendar">
        <FullCalendar
          class="demo-app-calendar"
          :options="calendarOptions"
        >
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
      <div class="appointment-userInfo"></div>
      <div class="appointment-class"></div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './components/event-utils'
export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },
        initialView: 'timeGridWeek',
        locale: 'zh-cn', //  配置中文
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },
  mounted() {},
  methods: {
    handleDateSelect(selectInfo) {
      const title = prompt('Please enter a new title for your event')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events) {
      this.currentEvents = events
    }
  }
}
</script>

<style lang="scss" scoped>
.appointment{
    background: #fff;
    &-header{
        line-height: 56px;font-size: 16px;
        padding-left: 20px;width: 100%;
        border-bottom: 1px solid #E3EBF1;
        &-title{
            margin-right: 32px;
        }
    }
    &-content{
        display: flex;
        height: 700px;
    }
    &-userInfo{
        width: 20%;
        border-right: 1px solid #E3EBF1;
    }
    &-class{
        width: 20%;
    }
    &-calendar{
        width: 60%;border-right: 1px solid #E3EBF1;
    }
}
</style>

