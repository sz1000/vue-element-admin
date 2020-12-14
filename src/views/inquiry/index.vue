<template>
  <div class="contant-container layout" style="margin-top:30px;">
    <div class="seek">
      <div class="seek-left">
        <div class="seekContentItem">
          <p>创建时间:</p>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeSerch"/>
        </div>
        <div class="seekContentItem">
          <p>问诊人:</p>
          <el-input v-model="client_name" style="width:200px" placeholder="请输入问诊人姓名">
            <el-button slot="append" icon="el-icon-search" @click="search('client_namess')"/>
          </el-input>
        </div>
        <div class="seekContentItem">
          <p>手机号码:</p>
          <el-input v-model="tel" style="width:200px" placeholder="请输入手机号码">
            <el-button slot="append" icon="el-icon-search" @click="search('tel')"/>
          </el-input>
        </div>
      </div>

      <div class="seek-right">
        <el-button type="primary">添加问诊卡</el-button>
      </div>
    </div>

    <div class="tableContainer">
      <el-table
        :data="tableData"
        :highlight-current-row="true"
      >
        <el-table-column align="center" prop="client_name" label="问诊人"/>
        <el-table-column align="center" prop="tel" label="手机号码"/>
        <el-table-column align="center" prop="identity" label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender | gender }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="创建时间"/>
        <el-table-column align="center" prop="identity" label="性别">
          <template slot-scope="scope">
            <el-button size="small" @click="handleCat(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getListInquiry } from '@/api/inquiry'
import moment from 'moment'
export default {
  data() {
    return {
      time: '',
      client_name: '',
      tel: '',
      tableData: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(data) {
      const serveData = await getListInquiry(data)
      this.tableData = serveData.data
      console.log('TCL: initData -> serveData.data', serveData.data)
    },
    search(params) {
      const searchData = this[params] ? `?${params}=${this[params]}` : ''
      this.initData(searchData)
    },
    timeSerch(params) {
      const searchData = `?start_time=${moment(params[0]).format('YYYY-MM-DD')}&end_time=${moment(params[1]).format('YYYY-MM-DD')}`
      this.initData(searchData)
    },
    handleCat(id) {
      console.log('TCL: handleCat -> id', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.seek{
  // height: 100px;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;

  &-left{
    margin-left: 30px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &-right{
    margin-right: 30px;
  }
  p{
    text-align: end;
    margin-right: 12px;
  }
  .seekContentItem{
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
}
.tableContainer{
  padding: 0 30px;
}
</style>

