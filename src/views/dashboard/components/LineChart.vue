<template>
  <div class="linChart">
    <div class="options">
      <div>
        <el-select v-model="selectType" class="itemSelect" placeholder="请选择" @change="typeChang">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="block">
        <el-select
          v-model="selectTime"
          size="small"
          placeholder="请选择"
          @change="timeChang"
        >
          <el-option
            v-for="(item, index) in timeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="userSelectTime"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </div>
    </div>
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getVisitData } from '@/api/dashboard'
import moment from 'moment'
// const animationDuration = 3000
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      selectType: 'visit_nv_total',
      options: [
        {
          label: '访问次数',
          value: 'visit_pv'
        },
        {
          label: '访问人数',
          value: 'visit_uv'
        },
        {
          label: '新用户数',
          value: 'visit_uv_new'
        },
        {
          label: '累计访问人数',
          value: 'visit_nv_total'
        }
      ],
      selectTime: 7,
      foamatTime: '',
      userSelectTime: '',
      timeOptions: [
        {
          value: 7,
          label: '最近7天'
        },
        {
          value: 30,
          label: '最近30天'
        }
      ],
      countArr: [],
      timeArr: [],
      chart: null
    }
  },
  watch: {
    userSelectTime: function(time) {
      const start = moment(time[0]).format('YYYY-MM-DD')
      const end = moment(time[1]).format('YYYY-MM-DD')
      const foamatTime = `from=${start}&to=${end}`
      this.foamatTime = foamatTime
      this.initData()
    }
  },
  mounted() {
    this.timeChang(7)
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    typeChang(type) {
      this.initData()
    },
    timeChang(time) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * time)
      this.userSelectTime = [start, end]
    },
    async initData() {
      const timeZone = this.foamatTime
      const serveData = await getVisitData(timeZone)
      const type = this.selectType
      const count = []
      const time = []
      let tempCount = 0
      serveData.data.forEach((element, index) => {
        time.push(element.date.split(' ')[0])
        if (type === 'visit_nv_total') {
          tempCount += element.visit_uv
          count.push(tempCount)
        } else {
          count.push(element[type])
        }
      })
      this.countArr = count
      this.timeArr = time
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.chart.setOption({
        // title: {
        //   text: '配置标题',
        //   textStyle: {
        //     color: '#666'
        //   }
        // },
        // legend: {
        //   name: '人数',
        //   icon: 'circle'
        // },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {}
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: this.timeArr
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'line',
            smooth: false,
            data: this.countArr
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" >
.linChart {
  .options {
    width: 100%;
    padding: 10px;
    margin-left: 20px;
    &-title {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .itemSelect {
    margin-bottom: 10px;
    .el-input--suffix .el-input__inner {
      border: none;
      padding: 0;
      font-size: 15px;
      font-weight: 600;
      font-family: PingFang-SC-Heavy;
    }
  }
}
</style>
