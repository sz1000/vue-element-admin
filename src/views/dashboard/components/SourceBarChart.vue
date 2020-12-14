<template>
  <div>
    <div class="head">
      <P>整体来源分布</P>
      <div class="head-select">
        <el-select v-model="type" size="small" placeholder="请选择" @change="typeChang">
          <el-option
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="selectTime" size="small" placeholder="请选择" @change="timeChang">
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
    <div class="xselect">
      <el-checkbox-group v-model="checkboxGroup1" fill="rgb(64, 201, 198)" @change="changAxis">
        <el-checkbox-button
          v-for="(item, index) in xAxisArr"
          :border="false"
          :label="item"
          :key="index"
        >{{ item }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div ref="sourceChart" :style="{ height: height, width: width }" />
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
      type: 'access_source_visit_uv',
      typeOptions: [
        {
          value: 'access_source_session_cnt',
          label: '打开次数'
        },
        {
          value: 'access_source_visit_uv',
          label: '访问人数'
        }
      ],
      foamatTime: '',
      userSelectTime: '',
      selectTime: 7,
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
      tampArr: [],
      checkboxGroup1: [],
      xAxisArr: [],
      showData: [],
      chart: null,
      options: null
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
  async mounted() {
    // this.initData()
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
      console.log('TCL: typeChang -> type', type)
      this.initData()
    },
    timeChang(time) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * time)
      this.userSelectTime = [start, end]
    },
    changAxis(selectArr) {
      console.log('TCL: changAxis -> index', selectArr)
      const showData = []
      selectArr.forEach(element => {
        showData.push(this.tampArr[element])
      })
      this.initChart(selectArr, showData)
    },
    async initData() {
      const _this = this
      const time = this.foamatTime
      const tampArr = []
      const serveData = await getVisitData(time)
      serveData.data.forEach((element, index) => {
        element[this.type].forEach(item => {
          item.key = _this.keyData(item.key)
          if (tampArr[item.key]) {
            tampArr[item.key] += item.value
          } else {
            tampArr[item.key] = item.value
          }
        })
      })
      const xAxisArr = Object.keys(tampArr)
      const showData = []
      xAxisArr.forEach(item => {
        showData.push(tampArr[item])
      })
      this.tampArr = tampArr
      this.xAxisArr = xAxisArr
      this.checkboxGroup1 = xAxisArr
      this.showData = showData
      this.initChart(xAxisArr, showData)
    },
    initChart(xAxisArr, showData) {
      this.chart = echarts.init(this.$refs.sourceChart, 'macarons')
      this.chart.setOption({
        // title: {
        //   text: '年龄占比',
        //   top: 10,
        //   left: '45%',
        //   textStyle: {
        //     fontSize: 14,
        //     color: '#666',
        //     fontWeight: 500
        //   }
        // },
        legend: {
          name: '系列1',
          // 强制设置图形为圆。
          icon: 'circle'
        },
        grid: {
          top: 10
        },
        xAxis: {
          data: xAxisArr
        },
        yAxis: {
          max: function(value) {
            return value.max + 2
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            data: showData,
            label: {
              show: true,
              position: 'top',
              formatter: '{@score}/人'
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 4
            }
          }
        ]
      })
    },
    keyData(index) {
      const keyArr = [
        '',
        '小程序历史列表',
        '搜索',
        '会话',
        '扫一扫二维码',
        '公众号主页',
        '聊天顶部',
        '系统桌面',
        '小程序主页',
        '附近的小程序',
        '其他',
        '模板消息',
        '',
        '公众号菜单',
        'APP分享',
        '支付完成页',
        '长按识别二维码',
        '相册选取二维码',
        '公众号文章',
        '钱包',
        '卡包',
        '小程序内卡券',
        '其他小程序',
        '其他小程序返回',
        '卡券适用门店列表',
        '搜索框快捷入口',
        '小程序客服消息',
        '公众号下发',
        '',
        '任务栏-最近使用',
        '长按小程序菜单圆点',
        '连wifi成功页',
        '城市服务',
        '微信广告',
        '其他移动应用',
        '发现入口-我的小程序',
        '任务栏-我的小程序'
      ]
      return keyArr[index]
    }
  }
}
</script>

<style lang="scss" scoped>
$d-color: rgb(64, 201, 198);
.xselect {
  margin: 18px auto;
  display: flex;
  justify-content: space-around;
  width: 80%;
  &-item {
    cursor: pointer;
    width: fit-content;
    border-radius: 10px;
    border: 1px solid rgb(64, 201, 198);
    padding: 6px;
    color: $d-color;
  }
}
.head {
  width: 100%;
  padding: 10px;
  margin-left: 20px;
  p {
    margin-block-start: 0.5em;
    margin-block-end: 1em;
    font-size: 15px;
    font-weight: 600;
  }
}
/deep/ .el-checkbox-button {
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  overflow: hidden;
}

/deep/ .el-checkbox-button__inner{
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

/deep/ .el-checkbox-button__inner:hover{
  // border: 1px solid #DCDFE6;
  // border-radius: 4px;
  color: rgb(64, 201, 198);
}

/deep/ .el-checkbox-button.is-focus .el-checkbox-button__inner{
  border-color: rgb(64, 201, 198);
}

</style>

