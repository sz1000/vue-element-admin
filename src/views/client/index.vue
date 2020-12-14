<template>
  <div class="container">
    <main>
      <header class="search">
        <div class="search-container">
          <el-row class="search-container-left">
            <el-col :span="6" :lg="8" :md="10" :sm="10" :xs="20" style="min-width:276px;margin-right:10px;" class="search-container-left-item">
              <p>客户姓名:</p>
              <el-input
                v-model="client_name"
                style="width:80%"
                placeholder="请输入客户姓名"
                clearable
                @clear="handleClear">
                <el-button slot="append" icon="el-icon-search" @click="handleNameChange"/>
              </el-input>
            </el-col>
            <el-col :span="6" :lg="8" :md="10" :sm="10" :xs="20" style="min-width:276px" class="search-container-left-item">
              <p>手机号码:</p>
              <el-input
                v-model="tel"
                style="width:80%"
                placeholder="请输入手机号码"
                clearable
                @clear="handleClear">
                <el-button slot="append" icon="el-icon-search" @click="handleTelChange"/>
              </el-input>
            </el-col>
          </el-row>

          <div class="search-container-right">
            <el-button type="primary" size="medium" @click="handleAdd">新增客户</el-button>
          </div>

        </div>

        <div class="search-container">
          <el-row>
            <el-col :span="5" :lg="4" :md="7" :sm="10" :xs="20" style="min-width:228px" class="search-container-left-item">
              <p>客户类别:</p>
              <el-select v-model="consumeStatus" clearable placeholder="请选择" @change="handleConsumeChange">
                <el-option
                  v-for="(item,index) in consumeStatusArr"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-col>

            <el-col :span="5" :lg="4" :md="7" :sm="10" :xs="20" style="min-width:228px" class="search-container-left-item">
              <p>来源渠道:</p>
              <el-select v-model="source" clearable placeholder="请选择" @change="handleSourceChange">
                <el-option
                  v-for="(item,index) in sourceArr"
                  :key="index"
                  :value="item.name"
                  :label="item.name"
                />
              </el-select>
            </el-col>

            <el-col :span="8" :lg="5" :md="7" :sm="12" :xs="20" class="search-container-left-item price-search">
              <p>消费金额:</p>
              <el-input :min="0" v-model="low_price" class="rigth-input" clearable/>
              <span>至</span>
              <el-input v-model="hign_price" class="left-input" clearable >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  class="search-icon"
                  @click="handlePriceChange"/>
              </el-input>
            </el-col>
          </el-row>
        </div>

        <div class="search-container">
          <el-row class="search-container-left">
            <el-col :span="6" :lg="6" :md="11" :sm="10" :xs="20" style="min-width:385px" class="search-container-left-item date">
              <p>录入时间:</p>
              <el-date-picker
                v-model="date"
                clearable
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              />
            </el-col>
            <el-col :span="6" :lg="6" :md="8" :sm="10" :xs="20" class="search-container-left-item">
              <el-radio-group v-model="seletDate" style="min-width:250px" @change="handleChangePicker">
                <el-radio-button label="昨天" />
                <el-radio-button label="今天" />
                <el-radio-button label="最近七天" />
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </header>

      <section class="content-list">
        <el-table :data="DataList" :highlight-current-row="true">
          <el-table-column align="center" prop="created_at" label="录入时间" />
          <el-table-column align="center" prop="name" label="客户姓名" />
          <el-table-column align="center" prop="tel" label="手机号码" />
          <el-table-column align="center" label="客户类别">
            <template slot-scope="scope">
              <div>
                {{ scope.row.consume_status | consumeStatus }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="消费金额" >
            <template slot-scope="scope">
              <div>
                ¥{{ scope.row.consumer / 100 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="saler" label="所属销售" >
            <template slot-scope="scope">
              <div>
                {{ scope.row.saler || '暂无' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="source" label="来源渠道" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="table-handle">
                <el-button type="text" class="cat-button" @click="handleToDetail(scope.row.id)">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>

      <div class="pagination-container">
        <el-pagination
          :total="total"
          class="pagination"
          background
          layout="prev, pager, next"
          @current-change="handlePagenChange"/>
      </div>

    </main>
  </div>
</template>

<script>
import { getClientList, getSourceList } from '@/api/client'
import moment from 'moment'
export default {
  filters: {
    consumeStatus(key) {
      switch (key) {
        case 0:
          return '意向客户'
        case 1:
          return '成单客户'
      }
    }
  },
  data() {
    return {
      source: '',
      tel: '',
      client_name: '',
      low_price: null,
      hign_price: null,
      sourceArr: [],
      consumeStatus: '',
      consumeStatusArr: [
        {
          value: '0',
          label: '意向客户'
        },
        {
          value: '1',
          label: '成单客户'
        }
      ],
      searchTel: '',
      searchTime: '',
      DataList: [],
      date: '',
      seletDate: '',
      currentPage: 1,
      total: 100,
      queryObj: {}
    }
  },
  watch: {
    TabsValue: function(value) {
      this.initData()
    },
    date: function(date) {
      if (date) {
        this.queryObj.record_time_start = date[0]
        this.queryObj.record_time_end = date[1]
      } else {
        delete this.queryObj.record_time_start
        delete this.queryObj.record_time_end
      }
      this.currentPage = 1
      this.initData()
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const queryObj = Object.assign({}, this.queryObj, { page: this.currentPage })
      getClientList(queryObj)
        .then(res => {
          console.log(res)
          this.DataList = res.data
          this.total = res.page.total
        })
        .catch(err => {
          console.log('TCL: initData -> err', err)
        })
        // 渠道列表
      getSourceList().then(res => {
        this.sourceArr = res.data
        console.log('res.data', res.data)
      }).catch(err => {
        console.log('TCL: initData -> err', err)
      })
    },
    handleChangePicker(options) {
      let end = moment().format('YYYY-MM-DD')
      let start = moment().format('YYYY-MM-DD')

      switch (options) {
        case '今天':
          end = moment(end).add(0, 'days').format('YYYY-MM-DD')
          break
        case '昨天':
          start = moment(start).subtract(1, 'days').format('YYYY-MM-DD')
          end = moment(end).subtract(1, 'days').format('YYYY-MM-DD')
          break
        case '最近7天':
          start = moment(end).subtract(7, 'days').format('YYYY-MM-DD')
          break

        default:
          break
      }

      this.date = [start, end]
    },
    handleSearchTel() {
      this.searchTel ? this.queryObj.tel = this.searchTel : delete this.queryObj.tel
      this.currentPage = 1
      this.initData()
    },
    handleAdd() {
      this.$router.push({
        path: '/client/add'
      })
    },
    handleToDetail(id) {
      this.$router.push({
        path: '/client/detail',
        query: {
          id
        }
      })
    },
    handleConsumeChange(e) {
      e ? this.queryObj.consume_status = e : delete this.queryObj.consume_status
      this.currentPage = 1
      this.initData()
    },
    handleSourceChange(e) {
      e ? this.queryObj.source = e : delete this.queryObj.source
      this.currentPage = 1
      this.initData()
    },
    handleTelChange() {
      this.tel ? this.queryObj.tel = this.tel : delete this.queryObj.source
      this.currentPage = 1
      this.initData()
    },
    handlePriceChange(e) {
      if (this.low_price) {
        this.queryObj.low_price = this.low_price * 100
      } else {
        delete this.queryObj.low_price
      }

      if (this.hign_price) {
        this.queryObj.hign_price = this.hign_price * 100
      } else {
        delete this.queryObj.hign_price
      }

      this.currentPage = 1
      this.initData()
    },
    handleNameChange() {
      this.client_name ? this.queryObj.client_name = this.client_name : delete this.queryObj.client_name
      this.currentPage = 1
      this.initData()
    },
    handlePagenChange(e) {
      this.currentPage = e
      this.initData()
    },
    handleClear() {
      this.queryObj = {}
      this.currentPage = 1
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.col-input {
  display: flex;
  align-items: center;
  p {
    white-space: nowrap;
    padding: 0 4px;
  }
}

.search {
  padding-top: 10px;
  &-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 20px;
    margin-bottom: 0px;
    .date{
      min-width: 335px;
    }
    &-left {
      width: 100%;
      overflow: hidden;
      padding-right: 20px;
      &-item {
        display: flex;
        align-items: center;
        padding-right: 10px;
        margin-bottom: 10px;
        /deep/.el-range-separator{
            padding: 0;
        }

        p {
          white-space: nowrap;
          padding-right: 6px;
        }
      }
    }
  }
}

.content-list {
  margin: 20px;
}

.table-handle{
  /deep/ .el-button--text:hover {
    color: #fff;
  }
  /deep/ .el-button {
    color: #606266;
  }
}

.price-search{
  display: flex;
  color: #606266;
  font-size: 12px;
  min-width: 286px;
  // max-width: 320px;
  overflow: hidden;
  span{
    padding: 0 4px;
  }
  .rigth-input{
    width: 80px;
  }
  .left-input{
    width:100px;
  }
  /deep/ .el-input-group__append{
    width: 30px;
    text-align: center;
    padding: 0;
  }
}

.pagination-container{
  display: flex;
  justify-content:flex-end;
  padding-bottom: 50px;
}

.cat-button{
  border: 1px solid #606266;
  padding: 4px 6px;
  border-radius: 4px;
}
.cat-button:hover{
  border: 1px solid #fff;
  padding: 4px 6px;
  border-radius: 4px;
}
</style>

