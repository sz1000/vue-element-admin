<template>
  <div
    :id="echarts"
    class="echarts"
    ref="echarts"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../mixins/resize";

export default {
  mixins: [resize],
  name: "LineChart3",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  created: () => {},
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({
      // expectedData,
      // actualData
      // arr1,
      // arr2,
      // arr3,
      // arr4,
      // arr5,
      // arr6
    } = {}) {
      this.chart.setOption({
        //         polar: {
        // 　　center: ['50%', '50%']
        // },
        // tooltip: {
        // 　　trigger: 'axis',
        // 　　axisPointer: {
        // 　　　　type: 'cross'
        // 　　}
        // },
        // angleAxis: {//极坐标系的角度轴
        // 　　type: 'value',
        // 　　startAngle: 90,
        // 　　splitNumber: 30, //坐标轴分割段数
        // 　　clockwise: false, //是否逆时针
        // 　　axisLine: { //坐标轴轴线设置
        // 　　　　lineStyle: {
        // 　　　　　　color: '#ccc',
        // 　　　　}
        // 　　},
        // 　　axisTick: { //坐标轴刻度设置
        // 　　　　show: false
        // 　　},
        // 　　splitLine: { //分割线设置
        // 　　　　show: false,
        // 　　},
        // 　　axisLabel: { //刻度标签设置
        // 　　　　textStyle: {
        // 　　　　　　color: '#333'
        // 　　　　}
        // 　　}
        // },
        // radiusAxis: {//极坐标系的径向轴。
        // 　　min: 0,
        // 　　axisLine: { //坐标轴轴线设置
        // 　　　　show: false,
        // 　　　　// lineStyle: {
        // 　　　　　　// color: "#ccc"
        // 　　　　// }
        // 　　},
        // 　　axisTick: { //坐标轴刻度设置
        // 　　　　show: false
        // 　　},
        // 　　axisLabel: { //刻度标签设置
        // 　　　　margin: 0, //刻度与坐标轴之间的距离
        // 　　　　textStyle: {
        // 　　　　　　color: '#333'
        // 　　　　}
        // 　　}
        // },
        // series: [{
        // 　　coordinateSystem: 'polar',
        // 　　name: 'line',
        // 　　type: 'line',
        // 　　showSymbol: false,
        // 　　smooth: true,
        // 　　data: [1,2,5,3,2,1], //红线数据参数
        // 　　lineStyle: {
        // 　　　　normal: {
        // 　　　　　　color: '#f00'
        // 　　　　}
        // 　　}
        // }, {
        // 　　coordinateSystem: 'polar',
        // 　　name: 'line',
        // 　　type: 'line',
        // 　　showSymbol: false,
        // 　　smooth: true,
        // 　　data: [4,2,1,2,2,1], //蓝线数据参数
        // 　　lineStyle: {
        // 　　　　normal: {
        // 　　　　　　color: '#0000ff'
        // 　　　　}
        // 　　}
        // }, {
        // 　　coordinateSystem: 'polar',
        // 　　name: 'line',
        // 　　type: 'bar',
        // 　　showSymbol: false,
        // 　　smooth: true,
        // 　　data: [1,3,5,3,2,4], //黄线数据参数
        // 　　lineStyle: {
        // 　　　　normal: {
        // 　　　　　　color: 'goldenrod'
        // 　　　　}
        // 　　}
        // }],
        // 　　animationDuration: 2000

        angleAxis: {},
				radiusAxis: {
					type: 'category',
					data: ['周一', '周二', '周三', '周四'],
					z: 10
				},
				polar: {},
				series: [{
					type: 'bar',
					data: [1, 2, 3, 4],
					coordinateSystem: 'polar',
					name: 'A',
					stack: 'a'
				}, {
					type: 'bar',
					data: [2, 4, 6, 8],
					coordinateSystem: 'polar',
					name: 'B',
					stack: 'a'
				}, {
					type: 'bar',
					data: [1, 2, 3, 4],
					coordinateSystem: 'polar',
					name: 'C',
					stack: 'a'
				}],
				legend: {
					show: true,
					data: ['A', 'B', 'C']
				}
			
      });
    }
  }
};
</script>
