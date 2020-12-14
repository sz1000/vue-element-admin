<template>
  <div :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
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
    },
    value: {
      type: Object,
      require: true,
      default: function(params) {
        return {
          showData: [],
          axis: []
        }
      }
    }
  },
  data() {
    return {
      // showData: [],
      // xAxisData: [],
      chart: null,
      options: null
    }
  },
  watch: {
    value: {
      handler: function(params) {
        console.log('TCL: params', params)
        if (this.chart) {
          this.options.series[0].data = this.value.showData
          this.draw()
        }
      },
      deep: true
    }
  },
  async mounted() {
    this.initChart()
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.options = {
        title: {
          text: '性别占比',
          bottom: 10,
          left: '45%',
          textStyle: {
            fontSize: 14,
            color: '#666',
            fontWeight: 500

          }
        },
        legend: {
          name: '系列1',
          icon: 'circle'
        },
        series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['40%', '60%'],
          barWidth: 20,
          data: [{ name: '男', value: '0' }, { name: '女', value: '0' }],
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
        }]
      }
      this.draw()
    },
    draw() {
      this.chart.setOption(this.options)
    }
  }
}
</script>
