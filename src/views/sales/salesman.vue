<template>
  <div class="contant-container layout" style="margin-top:30px;">
    <header class="search">
      <div class="search-left">
        <div class="search-left-row">
          <SearchItem
            type="input"
            param="name"
            title="销售姓名"
            @change="handlenSearchChange" />

          <SearchItem
            type="input"
            param="tel"
            title="手机号码"
            @change="handlenSearchChange" />

          <SearchItem
            type="input"
            param="saler_no"
            title="会员编号"
            @change="handlenSearchChange" />
        </div>

        <div class="search-left-row">
          <SearchItem
            :select-options="selectOptions"
            :param="['begin','end']"
            type="time"
            title="注册时间"
            @change="handlenSearchChange" />

          <SearchItem
            :select-options="selectOptions"
            type="select"
            param="type"
            title="渠道"
            @change="handlenSearchChange" />
        </div>

      </div>
      <div class="search-right">
        <el-button type="primary" size="small" @click="handleAddSale">指派销售</el-button>
      </div>
    </header>

    <div class="tableContainer">
      <el-table
        :data="tableData"
        :highlight-current-row="true"
      >
        <el-table-column align="center" prop="saler_no" label="会员编号"/>
        <el-table-column align="center" prop="name" label="销售姓名"/>
        <el-table-column align="center" prop="tel" label="手机号码"/>
        <el-table-column align="center" prop="wxid" label="微信号">
          <template slot-scope="scope">
            {{ scope.row.wxid || '暂无' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="achieve" label="业绩(元)">
          <template slot-scope="scope">
            {{ scope.row.achieve / 100 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="parentName" label="上级销售">
          <template slot-scope="scope">
            {{ scope.row.parentName || '商家' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="teamCount" label="下级团队成员"/>
        <el-table-column align="center" label="渠道">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? '商家指派' : '会员支付' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="注册时间"/>
        <el-table-column align="center" prop="details" label="操作">
          <template slot-scope="scope">
            <!-- {{ scope.row.logistics_status == 0 ? $router.push({path: '/unshipped', query: {id: scope.row.id}}) : $router.push({path: '/shipped', query: {id: scope.row.id}}) }} -->
            <el-button style="margin: 10px; "
               size="small"
              @click="$router.push({path:'/salesdetail', query: {id: scope.row.id}})"
              type="primary"
            >详情</el-button>
            <el-button style="margin: 10px; "
               size="small"
              type="primary"
            >暂停权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="totalPage"
        class="pagination"
        background
        small
        layout="prev, pager, next"
        @current-change="handleChangePage"/>
    </div>

    <AddSale :show.sync="addSaleShow" />
  </div>
</template>

<script>
import { getListSalers } from '@/api/sales'
import moment from 'moment'

import SearchItem from '@/components/SearchItem'
import AddSale from './components/AddSale'

export default {
  components: {
    SearchItem,
    AddSale
  },
  data() {
    return {
      addSaleShow: false,
      totalPage: 10,
      time: '',
      name: '',
      currentPage: 1,
      parentName: '',
      tableData: [],
      paramsObj: {},
      selectOptions: [{
        value: 0,
        label: '商家指派'
      },
      {
        value: 1,
        label: '会员支付'
      }]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(data) {
      const params = Object.assign({}, this.paramsObj, { page: this.currentPage })
      const serveData = await getListSalers(params)
      this.tableData = serveData.data
      if(serveData.page){
        this.totalPage = serveData.page.total
      }else{
        this.totalPage = 0
      }
      
    },
    handleChangePage(e) {
      this.currentPage = e
      this.initData()
    },
    handleAddSale(e) {
      this.addSaleShow = true
    },
    handlenSearchChange(e) {
      if (e.type == 'time') {
        if (e.value) {
          this.paramsObj[e.param[0]] = e.value[0]
          this.paramsObj[e.param[1]] = e.value[1]
        } else {
          delete this.paramsObj[e.param[0]]
          delete this.paramsObj[e.param[1]]
        }
        this.currentPage = 1
        this.initData()
        return
      }

      if (e.value !== '') {
        this.paramsObj[e.param] = e.value
      } else {
        delete this.paramsObj[e.param]
      }
      this.currentPage = 1
      this.initData()
    },
    search(params) {
      const searchData = this[params] ? `?${params}=${this[params]}` : ''
      this.initData(searchData)
    },
    timeSerch(params) {
      const searchData = `?begin=${moment(params[0]).format('YYYY-MM-DD')}&end=${moment(params[1]).format('YYYY-MM-DD')}`
      this.initData(searchData)
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

/deep/ .el-range-separator{
  min-width: 24px;
}
.seekContent{
  height: 100px;
  display: flex;
  p{
    text-align: end;
    min-width: 100px;
    margin-right: 12px;
  }
  .seekContentItem{
    display: flex;
    align-items: center;
  }
}
.tableContainer{
  padding: 0 30px;
}
.search{
  margin: 30px;
  display: flex;
  justify-content: space-between;
  &-left{
    &-row{
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.pagination{
  padding: 20px 0;
  float: right;
}
</style>

