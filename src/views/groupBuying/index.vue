<template>
  <div class="contant-container layout" style="margin-top:30px;">
    <div class="explain">
      <h2 style="margin-block-start: 0em;margin-block-end: 0em;">拼团活动说明</h2>
      商家针对某个商品设置拼团活动后，买家可以通过多人组团形式购买商品，并邀请好友购买参团。通过裂变传播带来新客，达到订单翻倍，会员增加的效果。
      1.只有支付成功才能开团/参团。支付失败或者退出支付流程系统会保留名额，用户需在5分钟内进行支付，否则订单会自动关闭并释放名额。
      2.在团有效期内凑够人数参加拼团，即可算拼团成功。
      3.若团有效期内没有凑齐人数，则拼团失败。系统会自动将所支付的款项原路退回，具体到账时间以各银行为准。
      4.一旦付款则不能取消订单，未凑齐人数拼团失败订单自动取消。
      5.开团者在自己开的团未结束前不能再开团，只可参加其他人的团。
      6.参与本活动的商品仅限全款支付的商品。
      7.本活动不能与其他优惠同享。
    </div>
    <div class="seek">
      <div class="seek-left">
        <div class="seekContentItem">
          <p>活动名称:</p>
          <el-input v-model="name" placeholder="请输入活动名称">
            <el-button slot="append" icon="el-icon-search" @click="search(name)"/>
          </el-input>
        </div>
      </div>

      <div class="seek-right">
        <el-button type="primary" @click="handleToAdd">新建拼团活动</el-button>
      </div>
    </div>

    <div class="tableContainer">
      <el-tabs v-model="status" @tab-click="handleChangeStatu">
        <el-tab-pane label="全部" name="all"/>
        <el-tab-pane name="0" label="未开始"/>
        <el-tab-pane name="1" label="进行中"/>
        <el-tab-pane name="2" label="已结束"/>
      </el-tabs>
      <el-table
        :data="tableData"
        :highlight-current-row="true"
      >
        <el-table-column align="center" prop="name" label="活动名称"/>
        <el-table-column align="center" prop="tel" label="活动时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.start_time }} 至
              {{ scope.row.end_time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="identity" label="活动状态">
          <template slot-scope="scope">
            {{ scope.row.status | status }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="view" label="商品浏览数"/>
        <el-table-column align="center" prop="success_group" label="成团数"/>
        <el-table-column align="center" prop="paid_order" label="支付订单数"/>
        <el-table-column align="center" prop="identity" label="操作">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status == 1" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button :disabled="scope.row.status == 2" size="small" @click="handleEnd(scope.row.id)">结束</el-button>
            <el-button size="small" @click="handleCatProduct(scope.row.product_id)">查看商品</el-button>
            <el-button size="small" @click="handleCatOrder(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :total="total"
        :current-page="page"
        background
        layout="prev, pager, next"
        @current-change="handlePageChange"/>
    </div>
  </div>
</template>

<script>
import { getBuyingList, getBuyingEnd } from '@/api/groupBuying'

export default {

  filters: {
    status(value) {
      switch (value) {
        case 0:
          return '未开始'
        case 1:
          return '进行中'
        case 2:
          return '已结束'
        default:
          return '未知'
      }
    }
  },
  data() {
    return {
      name: '',
      status: 'all',
      time: '',
      client_name: '',
      tel: '',
      tableData: [],
      page: 1,
      total: 10,
      params: {}
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(data) {
      const params = Object.assign({}, { page: this.page }, data, this.params)
      console.log('TCL: initData -> params', params)

      const serveData = await getBuyingList(params)
      this.tableData = serveData.data
      this.total = serveData.page.total
      console.log('TCL: initData -> serveData.data', serveData.data)
    },
    search(params) {
      this.params = params ? { name: params } : {}
      this.page = 1
      this.initData()
    },
    handleCat(id) {
      console.log('TCL: handleCat -> id', id)
    },
    handleEdit(id) {
      this.$router.push({
        name: 'goupbuyingAdd',
        params: { id }
      })
    },
    handleEnd(id) {
      this.$confirm('此操作将结束拼团, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getBuyingEnd(id).then((res) => {
          this.$message({
            message: '已结束拼团',
            type: 'success'
          })
          this.initData()
        }).catch((err) => {
          console.error('结束拼团出错', err)
          this.$message.error('出错了！')
        })
      })
    },
    handleCatProduct(productId) {
      this.$router.push(`/prodect/edit/${productId}`)
    },
    handleCatOrder() {

    },
    handleToAdd() {
      this.$router.push({
        path: '/goupbuying/add/0'
      })
    },
    handleChangeStatu(e) {
      console.log('TCL: handleChangeStatu -> e', this.status)
      if (this.status === 'all') {
        this.page = 1
        this.params = {}
        this.initData()
      } else {
        this.params = { status: this.status }
        this.page = 1
        this.initData()
      }
    },
    handlePageChange(index) {
      console.log('TCL: handlePageChange -> index', index)
      this.page = index
      this.initData()
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
  height: 100px;
  display: flex;
  justify-content: space-between;
  &-left{
    display: flex;
  }
  &-right{
    margin-right: 30px;
    display: flex;
    align-items: center;
  }
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
  padding-bottom: 30px;
}
.explain{
  white-space: pre-line;
  font-size:  16px;
  color: #596174;
  padding: 20px 40px;
  line-height: 24px;

  border:1px solid #59617420;
  border-radius: 10px;
  margin: 40px 50px;
}
.pagination{
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>

