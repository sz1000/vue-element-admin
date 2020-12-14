<template>
  <div class="container">
    <main>
      <header class="search">
        <div class="search-container">
          <div class="search-container-left">
            <div class="search-container-left-item">
              <p >预约人:</p>
              <el-input v-model="searchName" placeholder="请输入预约人" style="width:230px">
                <el-button slot="append" icon="el-icon-search" @click="handleSearchName" />
              </el-input>
            </div>

            <div class="search-container-left-item">
              <p>手机号码:</p>
              <el-input v-model="searchTel" placeholder="请输入手机号码" style="width:230px">
                <el-button slot="append" icon="el-icon-search" @click="handleSearchTel" />
              </el-input>
            </div>
          </div>

          <div class="search-container-right">
            <el-button type="primary" size="medium" @click="handleAdd">新增预约</el-button>
          </div>
        </div>

        <div class="search-container">
          <div class="search-container-left">
            <div class="search-container-left-item" style="min-width:385px">
              <p>到院时间:</p>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              />
            </div>
            <div class="search-container-left-item">
              <el-radio-group v-model="seletDate" @change="handleChangePicker">
                <el-radio-button label="今天" />
                <el-radio-button label="明天" />
                <el-radio-button label="最近七天" />
              </el-radio-group>
            </div>
          </div>
        </div>
      </header>

      <section class="content-list">
        <el-tabs v-model="TabsValue">
          <el-tab-pane
            v-for="(item,index) in tabs"
            :key="index"
            :name="item.value"
            :label="item.label"
          >
            <el-table :data="DataList" :highlight-current-row="true">
              <el-table-column align="center" prop="client" width="120px" label="预约人" />
              <el-table-column align="center" prop="tel" width="120px" label="手机号码" />
              <el-table-column align="center" label="服务">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.item_type | itemType }}
                    {{ scope.row.item_type === 0 && scope.row.doctorInfo ? scope.row.doctorInfo.name : '' }}
                    {{ scope.row.item_type === 1 && scope.row.productInfo ? scope.row.productInfo.name : '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="appoint_time" label="到院时间" />
              <!-- <el-table-column align="center" prop="created_at" label="创建时间" /> -->
              <el-table-column align="center" prop="remark" label="备注" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <div class="table-handle">
                    <el-button type="text" @click="handleCancelAppointment(scope.row.id)">取消</el-button>
                    <el-button type="text" @click="handleAmend(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="hanleServer(scope.row.id)">服务</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
import { getAppointmentList, cancelAppointment, putAppointReach } from '@/api/appointment'
import moment from 'moment'
export default {
  filters: {
    itemType(data) {
      switch (data) {
        case 0:
          return '医生:'
        case 1:
          return '项目:'
        case 2:
          return '到院安排'

        default:
          break
      }
    }
  },
  data() {
    return {
      total: 10,
      searchName: '',
      searchTel: '',
      searchTime: '',
      DataList: [],
      tabs: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: '0',
          label: '待服务'
        },
        {
          value: '1',
          label: '已超时'
        },
        {
          value: '2',
          label: '已服务'
        },
        {
          value: '3',
          label: '已取消'
        }
      ],
      TabsValue: 'all',
      date: '',
      seletDate: ''
    }
  },
  watch: {
    TabsValue: function(value) {
      this.initData()
    },
    date: function(date) {
      this.TabsValue = 'all'
      this.initData({ start_time: date[0], end_time: date[1] })
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData(queryObj) {
      const status = this.TabsValue !== 'all' ? { status: this.TabsValue } : {}
      queryObj = Object.assign({}, queryObj, status)
      getAppointmentList(queryObj)
        .then(res => {
          console.log('TCL: initData -> res', res)
          this.total = res.page.total
          this.DataList = res.data
        })
        .catch(err => {
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
        case '明天':
          start = moment(start).add(1, 'days').format('YYYY-MM-DD')
          end = moment(end).add(1, 'days').format('YYYY-MM-DD')
          break
        case '最近七天':
          end = moment(end).add(7, 'days').format('YYYY-MM-DD')
          break

        default:
          break
      }

      this.date = [start, end]
    },
    handleAmend(id) {
      this.$router.push({
        path: '/appointment/add',
        query: {
          id
        }
      })
    },
    handleCancelAppointment(id) {
      this.$confirm('确认取消吗？', '警告!', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelAppointment(id).then(res => {
          this.$message({
            message: '取消成功',
            type: 'success'
          })
          this.initData()
        }).catch(err => {
          console.error(err)
          this.$message.error('出错了！')
        })
      }).catch(() => {
        return
      })
    },
    handleSearchName() {
      this.TabsValue = 'all'
      this.initData({ client: this.searchName })
    },
    handleSearchTel() {
      this.TabsValue = 'all'
      this.initData({ tel: this.searchTel })
    },
    handleAdd() {
      this.$router.push({
        path: '/appointment/add'
      })
    },
    handlePagenChange(index) {
      this.initData({ page: index })
    },
    hanleServer(id) {
      const _this = this
      this.$alert('是否确认已服务', '服务', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        callback: async action => {
          console.log('TCL: hanleServer -> action', action)
          if (action === 'confirm') {
            console.log('asda')
            await putAppointReach(id).catch(err => {
              console.error(err)
              return
            })
            _this.$message({
              message: '已完成服务',
              type: 'success'
            })
          }
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // })
        }
      })
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

    &-left {
      display: flex;

      &-item {
        display: flex;
        align-items: center;
        padding-right: 10px;
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
  padding: 10px 0;
}

.table-handle{
  /deep/ .el-button--text:hover {
    color: #fff;
  }
  /deep/ .el-button {
    color: #606266;
  }
}
.pagination-container{
  display: flex;
  justify-content:flex-end;
  padding-bottom: 50px;
}
</style>

