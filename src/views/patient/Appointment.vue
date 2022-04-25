<template>
  <div class="appointment">
    <div class="appointment-header">
      <span class="appointment-header-title">新建预约</span>
      <span>4月7日 星期四 今天</span>
    </div>
    <div class="appointment-content">
      <div class="appointment-calendar">
        <FullCalendar
          ref="fullCalendar"
          class="demo-app-calendar"
          :options="calendarOptions"
        >
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <!-- <i>{{ arg.event.title }}</i> -->
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
import { parseTime } from '@/utils'
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
          left: 'prev,next today,myCustomButton',
          // center: 'title',
          right: ''
        },
        customButtons: {
          myCustomButton: {
            text: '自定义按钮', click: () => {
              // alert('点击了自定义按钮!')

              this.next()
            }
          }
        },
        initialView: 'timeGridWeek',
        validRange: {
          start: parseTime(new Date())
          // end: '2022-04-21'
        },
        firstDay: 0, // 一周开始的是那一天
        locale: 'zh-cn', //  配置中文
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectOverlap: false, // 确定是否允许用户选择事件占用的时间段。
        selectMirror: true, // 是否在用户拖动时绘制“占位符”事件。
        weekends: true, // 是否显示周末
        slotMinTime: '08:00', // 一天开始时间
        slotMaxTime: '18:00', // 一天结束时间
        slotDuration: '00:15', //  时间间隙
        allDaySlot: false, // 周，日视图时，all-day 不显示
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventMouseLeave: this.eventMouseLeave,
        dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true },
        slotLabelFormat: { // 周一到周日显示的格式
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        selectConstraint: {
          startTime: '08:00', // a start time (10am in this example)
          endTime: '18:00' // an end time (6pm in this example)
        },
        eventConstraint: {
          startTime: '08:00', // a start time (10am in this example)
          endTime: '18:00' // an end time (6pm in this example)
        }

      },
      currentEvents: []
    }
  },
  mounted() {},
  methods: {
    // 点击选择预约时间
    handleDateSelect(selectInfo) {
      debugger
      const calendarApi = selectInfo.view.calendar
      // 实现单选
      calendarApi.getEvents().map((item) => item.remove())
      calendarApi.addEvent({
        id: createEventId(),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    },
    next() {
      console.log('this.$refs.fullCalendar', this.$refs.fullCalendar.fireMethod)
      // this.$refs.fullCalendar.prev()
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
      //       document.querySelector('').click(function() {
      //     $('#calendar').fullCalendar('prev');
      // });
      // const element = document.querySelectorAll('.fc-timegrid-cols .fc-day-past .fc-timegrid-col-frame') || []
      // element.forEach(item => {
      //   item.removeAttribute('onclick')
      // })
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

    // ::v-deep .fc-scrollgrid-section-body .fc-day-past{
    //    pointer-events:none;
    //    background: #EBEEF3;
    //   .fc-timegrid-col-frame{
    //     pointer-events:none;
    //   }
    // }
}

</style>

