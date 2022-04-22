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
        weekends: true,
        slotMinTime: '08:00',
        slotMaxTime: '18:00',
        slotDuration: '00:15',
        allDaySlot: false, // 周，日视图时，all-day 不显示
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventMouseLeave: this.eventMouseLeave,
        displayEventTime: true,
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        views: {
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 4 }
          }
        },
        eventRemove: this.eventRemove
        // eventLimitNum: { // 事件显示数量限制
        //   timeGrid: {
        //     eventLimit: 6// adjust to 6 only for timeGridWeek/timeGridDay
        //   }
        // }
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:this.eventRemove
        */
      },
      currentEvents: []
    }
  },
  mounted() {},
  methods: {
    // 点击选择预约时间
    handleDateSelect(selectInfo) {
      const weekArray = ['日', '一', '二', '三', '四', '五', '六']
      const title = weekArray[new Date(selectInfo.start).getDay()]
      const calendarApi = selectInfo.view.calendar
      // 实现单选
      const list = calendarApi.getEvents()
      list.map((item) => item.remove())
      calendarApi.unselect() // clear date selection
      calendarApi.addEvent({
        id: createEventId(),
        title: '周' + title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
      // }
    },

    // 点击当前预约信息 删除
    handleEventClick(clickInfo) {
      this.$confirm('此操作将删除该条预约信息, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        clickInfo.event.remove()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },

    handleEvents(events) {
      this.currentEvents = events
    },

    eventRemove(events) {
      console.log('events', events)
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

