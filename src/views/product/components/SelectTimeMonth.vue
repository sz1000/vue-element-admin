<template>
  <div>
    <el-radio-group
      v-model="selecteData"
      @change="change">
      <el-radio-button label="99">永远</el-radio-button>
      <el-radio-button label="1">一个月</el-radio-button>
      <el-radio-button label="2">两个月</el-radio-button>
      <el-radio-button label="3">三个月</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    startKey: {
      type: String,
      required: true,
      default: ''
    },
    endKey: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      selecteData: ''
    }
  },
  watch: {
    'startTime': function(params) {
      const start = Date.parse(moment(this.startTime))
      const end = Date.parse(moment(this.endTime))
      let date = parseInt(moment.duration(end - start).asMonths())
      if (date > 13) {
        date = 99
      }
      this.selecteData = date
    }
  },
  methods: {
    change(e) {
      let saleStartTime
      if (this.startTime) {
        saleStartTime = this.startTime
      } else {
        saleStartTime = moment().format('YYYY-MM-DD')
      }
      const saleEndTime = e === '999' ? moment('2038-01-01').format('YYYY-MM-DD') : moment().add(e, 'M').format('YYYY-MM-DD')
      this.$emit('send', { [this.startKey]: saleStartTime, [this.endKey]: saleEndTime })
    }
  }
}
</script>
