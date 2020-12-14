<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <el-row type="flex" justify="space-between" class="count-container">
        <el-col :span="5" class="">
          <CountBox :count="analysisData.userCount" text="用户数量" />
        </el-col>
        <el-col :span="5" class="count-item">
          <CountBox
            :count="analysisData.productCount"
            text=" 商品数量"
            icon="product"
            color="#36a3f7"
          />
        </el-col>
        <el-col :span="5" class="count-item">
          <CountBox
            :count="analysisData.orderCount"
            text="总订单量"
            icon="order"
            color="#f4516c"
          />
        </el-col>
        <el-col :span="5" class="count-item">
          <CountBox
            :count="analysisData.priceCount/100"
            text=" 总销售额"
            icon="money"
            color="#34bfa3"
          />
        </el-col>
      </el-row>
      <div>
        <LineChart/>
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
          <!-- <line-chart :chart-data="lineChartData" /> -->
        <!-- <LineChart3 :chart-data="data2"/> -->
         <!-- <echart :chart-data="lineChartData"/> -->
      </div>
      <div class="chartbox">
        <div class="chartbox-head">
          <P>性别及年龄分布</P>
          <div>
            <el-select
              v-model="userType"
              size="small"
              placeholder="请选择类型"
              @change="initData"
            >
              <el-option
                v-for="item in userTypeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="userTime"
              size="small"
              placeholder="请选择时间"
              @change="initData"
            >
              <el-option
                v-for="item in userTimeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span style="color: #66666660; font-size:14px;">{{ refData }}</span>
          </div>
        </div>
        <div class="personas">
          <div class="age">
            <pieChat :value="genders" />
          </div>
          <div class="age">
            <BarChat :x-axis-data="xAxisData" :show-data="showData" />
          </div>
        </div>
        <div class="sourceBar">
          <SourceBarChart/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnalysis } from '@/api/dashboard'
import CountBox from './components/CountBox'
import LineChart from './components/LineChart'
import LineChart3 from './components/LineChart3'
import echart from './components/echart'
import PanelGroup from './components/PanelGroup'
import BarChat from './components/BarChat'
import pieChat from './components/pieChat'
import SourceBarChart from './components/SourceBarChart'
import { getUserPortrait } from '@/api/dashboard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    time:[1,2,3,4,5],
    lenged:["1",'2','3','4'],
      
  },
  a: {
    arr1: [20, 92, 120, 144, 60, 130, 140],
    arr2: [80, 160, 151, 106, 15, 150, 130],
    time:[1,2,3,4,5],
    lenged:["a",'b','c','d']
  },
  b: {
    arr3: [80, 10, 121, 104, 105, 90, 10],
    arr4: [10, 90, 100, 138, 12, 130, 30],
    time:[1,2,3,4,5],
    lenged2:["a",'b','c','d']
  },
  shoppings: {
    arr5: [130, 140, 141, 142, 145, 150, 160],
    arr6: [120, 82, 91, 154, 162, 140, 130],
    lenged2:["a",'b','c','d']
  }
}

export default {
  name: 'Dashboard',
  components: {
    CountBox,
    LineChart,
    LineChart3,
    echart,
    PanelGroup,
    BarChat,
    pieChat,
    SourceBarChart
  },
  data() {
    return {
      
      lineChartData: lineChartData.newVisitis,
      data2:lineChartData.newVisitis,
      color1: '#40c9c6',
      color2: '#fff',
      analysisData: {
        orderCount: '',
        priceCount: '',
        productCount: '',
        userCount: ''
      },
      genders: { showData: [] },
      userType: 'visit_uv_new',
      userTypeSelect: [
        {
          value: 'visit_uv_new',
          label: '新增用户数'
        },
        {
          value: 'visit_uv',
          label: '活跃用户数'
        }
      ],
      userTime: '1',
      userTimeSelect: [
        {
          value: '1',
          label: '最近7天数据'
        },
        {
          value: '2',
          label: '最近30天数据'
        }
      ],
      refData: '',
      showData: [],
      xAxisData: []
    }
  },
  mounted() {
    this.analysisServe()
    this.initData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async initData(params) {
      const serveData = await getUserPortrait(this.userTime)
      const showData = []
      const xAxisData = []
      serveData.data[this.userType].ages.forEach((element, index) => {
        showData.push(element.value)
        xAxisData.push(element.name)
      })
      this.refData = serveData.data.ref_date
      this.genders.showData = serveData.data[this.userType].genders
      this.showData = showData
      this.xAxisData = xAxisData
    },
    async analysisServe() {
      const analysisData = await getAnalysis()
      this.analysisData = analysisData.data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    width: 96%;
    min-height: 100vh;
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
    border-radius: 2px;
    position: relative;
  }
}
.count-container {
  padding: 30px 0;
  width: calc(100% - 60px);
  margin-left: 30px;
  margin-right: 30px;
}

.personas {
  width: 100%;
  display: flex;
  div {
    width: 50%;
  }
}
.chartbox {
  width: 100%;
  &-head {
    width: 100%;
    padding: 10px;
    margin-left: 20px;
    p{
      margin-block-start: 0em;
      margin-block-end: 0em;
      font-size: 15px;
      font-weight:600;
    }
    div {
      margin: 6px 0;
    }
  }
}
</style>
