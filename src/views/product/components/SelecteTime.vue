<template>
  <div class="time-container" style="margin-top:10px">
    <p>{{ title }}</p>
    <el-date-picker
      v-model="timeArr"
      type="datetimerange"
      align="right"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '自定义上架时间：'
    },
    startTime: {
      type: String,
      required: true,
      default: ''
    },
    endTime: {
      type: String,
      required: true,
      default: ''
    },
    startKey: {
      type: String,
      required: false,
      default: ''
    },
    endKey: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      // timeArr: ''
    }
  },
  computed: {
    timeArr: {
      get: function() {
        if (this.startTime && this.endTime) {
          const timeArr = []
          timeArr.push(this.startTime)
          timeArr.push(this.endTime)
          return timeArr
        }
      },
      set: function(params) {
        console.log('TCL: params', params)
        if (params) {
          this.$emit('update:startTime', params[0])
          this.$emit('update:endTime', params[1])
        } else if (params === null) {
          this.$emit('update:startTime', '')
          this.$emit('update:endTime', '')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-container{
display: flex;
flex-direction: column;
}
</style>

