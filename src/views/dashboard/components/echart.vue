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
    setOptions({} = {}) {
      this.chart.setOption({
        //   title: {
        //     text: ''
        //   },
        //   polar: {
        //     center: ['50%', '50%'],
        //     radius: ['0%', '70%'],//半径大小
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //       type: 'cross'
        //     }
        //   },
        //   angleAxis: {//极坐标系的角度轴
        //     type: 'value',
        //     startAngle: 90,
        //     splitNumber: 30, //坐标轴分割段数
        //     // clockwise: clockwise, //是否逆时针
        //     axisLine: { //坐标轴轴线设置
        //       lineStyle: {
        //         color: '#ccc'
        //       }
        //     },
        //     axisTick: { //坐标轴刻度设置
        //       show: true
        //     },
        //     splitLine: { //分割线设置
        //       show: true
        //     },
        //     axisLabel: { //刻度标签设置
        //       textStyle: {
        //         color: '#333'
        //       }
        //     }
        //   },
        //   radiusAxis: {//极坐标系的径向轴。
        //     min: 0,
        //     axisLine: { //坐标轴轴线设置
        //       show: false
        //       // lineStyle: {
        //       // color: "#ccc"
        //       // }
        //     },
        //     axisTick: { //坐标轴刻度设置
        //       show: false
        //     },
        //     axisLabel: { //刻度标签设置
        //       margin: 0, //刻度与坐标轴之间的距离
        //       textStyle: {
        //         color: '#333'
        //       }
        //     }
        //   },
        //   series: [{
        //     coordinateSystem: 'polar',
        //     name: 'line',
        //     type: 'line',
        //     showSymbol: false,
        //     smooth: true,
        //     data: this.redData, //红线数据参数
        //     lineStyle: {
        //       normal: {
        //         color: '#f00'
        //       }
        //     }
        //   }, {
        //     coordinateSystem: 'polar',
        //     name: 'line',
        //     type: 'line',
        //     showSymbol: false,
        //     smooth: true,
        //     data: this.blueData, //蓝线数据参数
        //     lineStyle: {
        //       normal: {
        //         color: '#0000ff'
        //       }
        //     }
        //   }, {
        //     coordinateSystem: 'polar',
        //     name: 'line',
        //     type: 'line',
        //     showSymbol: false,
        //     smooth: true,
        //     data: this.yellowData, //黄线数据参数
        //     lineStyle: {
        //       normal: {
        //         color: 'goldenrod'
        //       }
        //     }
        //   }],
        //   animationDuration: 2000,
        color: [
          "rgba(243, 81, 81, 1)"
          // "rgba(63, 178, 125, 1)",
          // "rgba(247, 203, 69, 1)",
          // "rgba(24, 130, 218, 1)"
        ],
        tooltip: {
          show: true
          // formatter: '{b} : {c}'
        },
        tooltip: {
          trigger: "item",
          //   trigger: 'axis',
          axisPointer: {
            type: "cross"
          }
        },

        polar: {
          //极坐标中心
          center: ["50%", "50%"]
        },

        angleAxis: {
          //极坐标配置
          min: 0,
          max: 360,
          interval: 10,
          startAngle: 90,
          axisLine: {
            lineStyle: {
              color: "rgba(23, 164, 253, 0.3)"
            }
          },
          axisLine: {
            //坐标轴轴线设置
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            //坐标轴刻度设置
            show: true
          },
          splitLine: {
            //分割线设置
            show: true
          },
          axisLabel: {
            //刻度标签设置
            textStyle: {
              color: "#333"
            }
          },
          // axisTick: {
          //   show: false
          // },
          axisLabel: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "rgba(23, 164, 253, 0.3)"
            }
          }
        },

        //   radiusAxis: {
        //     show: false
        //   },
        radiusAxis: {
          //极坐标系的径向轴。
          min: 0,
          axisLine: {
            //坐标轴轴线设置
            show: true
            // lineStyle: {
            // color: "#ccc"
            // }
          },
          axisTick: {
            //坐标轴刻度设置
            show: true
          },
          axisLabel: {
            //刻度标签设置
            margin: 0, //刻度与坐标轴之间的距离
            textStyle: {
              color: "#333"
            }
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          data: ["光影"],
          itemGap: 5,
          textStyle: {
            color: "#333",
            align: "right",
            x: "right",
            textAlign: "right"
          }
        },
        series: [
          // {
          //   name: 'Line 2',
          //   type: 'pie',
          //   clockWise: true,
          //   hoverAnimation: false,
          //   radius: ['40%', '65%'],
          //   itemStyle: {
          //     normal: {
          //       label: {
          //         show: false
          //       },
          //       labelLine: {
          //         show: false
          //       }
          //       // shadowBlur: 15,
          //       // shadowColor: '#000',
          //     }
          //   },
          //   coordinateSystem: 'polar',
          //   data: [
          //     {
          //       value: 30,
          //       name: 'xxx'
          //     },
          //     {
          //       value: 360,
          //       name: '总数',
          //       tooltip: {
          //         show: false
          //       },
          //       itemStyle: {
          //         normal: {
          //           color: 'rgba(0,0,0,0)',
          //           label: {
          //             show: false
          //           },
          //           labelLine: {
          //             show: false
          //           }
          //         },
          //         emphasis: {
          //           color: 'rgba(0,0,0,0)'
          //         }
          //       }
          //     }
          //   ]
          // },

          {
            name: "Line 3",
            type: "pie",
            clockWise: true,
            minAngle: 30, //最小角度
            startAngle: 90, //起始角度
            radius: ["40%", "60%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
                // shadowBlur: 15,
                // shadowColor: '#000',
              }
            },
            hoverAnimation: false,
            coordinateSystem: "polar",
            data: [
              {
                value: 10,
                name: "光影"
              },
              {
                value: 30,
                name: "总数",
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: "rgba(0,0,0,0)"
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
};
</script>
