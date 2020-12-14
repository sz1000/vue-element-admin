<template>
  <div class="container">
    <section class="content">
      <article class="info-container">
        <Title title="客户信息">
          <el-button type="primary" size="small" @click="handleToDetail">完善信息</el-button>
        </Title>
        <el-row>
          <div class="details">
            <el-col :span="6" class="left">姓名:</el-col>
            <el-col :span="6" class="right">{{ detailData.name }}</el-col>
          </div>
          <div v-if="detailData.gender" class="details">
            <el-col :span="6" class="left">性别:</el-col>
            <el-col :span="6" class="right">{{ detailData.gender | gender }}</el-col>
          </div>
          <div v-if="detailData.profession" class="details">
            <el-col :span="6" class="left">职业:</el-col>
            <el-col :span="6" class="right">{{ detailData.profession }}</el-col>
          </div>
          <div v-if="detailData.birthday" class="details">
            <el-col :span="6" class="left">生日:</el-col>
            <el-col :span="6" class="right">{{ detailData.birthday.split(' ')[0] }}</el-col>
          </div>
          <div v-if="detailData.age" class="details">
            <el-col :span="6" class="left">年龄:</el-col>
            <el-col :span="6" class="right">{{ detailData.age }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">手机号码:</el-col>
            <el-col :span="6" class="right">{{ detailData.tel }}</el-col>
          </div>
          <div v-if="detailData.wxid" class="details">
            <el-col :span="6" class="left">微信号:</el-col>
            <el-col :span="6" class="right">{{ detailData.wxid }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">所属销售:</el-col>
            <el-col :span="6" class="right">{{ detailData.saler || "暂无" }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">来源渠道:</el-col>
            <el-col :span="6" class="right">{{ detailData.source || "暂无" }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">客户类别:</el-col>
            <el-col :span="6" class="right">{{ detailData.consume_status | consumeStatus }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">消费金额:</el-col>
            <el-col :span="6" style="color:#FF3A26" class="right">¥{{ detailData.consumer / 100 }}</el-col>
          </div>
          <div class="details">
            <el-col :span="6" class="left">注册时间:</el-col>
            <el-col :span="6" class="right">{{ detailData.created_at }}</el-col>
          </div>
        </el-row>
        <el-row v-if="detailData.province">
          <div class="details">
            <el-col :span="6" class="left">地区:</el-col>
            <el-col
              :span="6"
              class="right"
            >{{ detailData.province }}/{{ detailData.city }}/{{ detailData.area }}</el-col>
          </div>
        </el-row>
        <el-row v-if="detailData.address">
          <div class="details">
            <el-col :span="6" class="left">地址:</el-col>
            <el-col :span="17" class="right">{{ detailData.address }}</el-col>
          </div>
        </el-row>
        <el-row v-if="detailData.remark">
          <div class="details">
            <el-col :span="6" class="left">备注:</el-col>
            <el-col :span="6" class="right">{{ detailData.remark }}</el-col>
          </div>
        </el-row>
      </article>
      <article class="info-container">
        <Title title="消费记录">
          <el-button type="primary" size="small" @click="handleToAddCousume">新增消费记录</el-button>
        </Title>
        <el-table :data="consumeOrderList" header-cell-class-name="rowS">
          <el-table-column label="订单ID" prop="order_num" />
          <el-table-column label="商品名称" prop="product_name" />
          <el-table-column label="商品价格">
            <template slot-scope="solt">
              <div>{{ solt.row.total_price / 100 }}</div>
            </template>
          </el-table-column>

          <el-table-column label="小程序支付">
            <template slot-scope="solt">
              <div>{{ solt.row.pay_price / 100 }}</div>
            </template>
          </el-table-column>
          <el-table-column label="线下支付">
            <template slot-scope="solt">
              <div>{{ solt.row.odd_price / 100 }}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="solt">
              <div>{{ solt.row.status | orderStatus }}</div>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" prop="created_at" />
          <!-- <el-table-column
            label="操作"
          />-->
        </el-table>
        <div class="pagination">
          <el-pagination
            :total="pageTotal"
            small
            background
            layout="prev, pager, next"
            @current-change="handleChangeCurrent"/>
        </div>

      </article>

      <article class="info-container">
        <Title title="跟进记录">
          <el-button type="primary" @click="handleAddFollowUp" size="small">新增跟进</el-button>
        </Title>
        <el-timeline v-if="followupData.length != 0">
          <el-timeline-item
            v-for="(followupItem, index) in followupData"
            :key="index"
            :hide-timestamp="true"
            color="#1890ff"
            size="normal"
            timestamp="2018-04-03 20:46"
          >
            <article class="followup-item">
              <p class="followup-item-created">{{ followupItem.created_at }}</p>
              <div class="followup-item-box">
                <span>服务客服:{{ followupItem.servicer }}</span>
                <span>跟进方式:{{ followupItem.callback_way | callbackWay }}</span>
              </div>
              <p>推荐项目:{{ followupItem.product }}</p>
              <div>
                <p>下次回访时间:{{ followupItem.next_time }}</p>
              </div>
              <div class="content-container">
                <p>跟进记录</p>
                <div>{{ followupItem.content }}</div>
              </div>
              <div v-if="followupItem.remark" class="content-container">
                <p>其他备注</p>
                <div>{{ followupItem.remark }}</div>
              </div>
            </article>
          </el-timeline-item>
          <el-timeline-item :hide-timestamp="true" size="normal"/>
        </el-timeline>
        <div v-if="followupData.length == 0" class="notAvailable">
          暂无数据
        </div>
      </article>
    </section>

    <el-dialog :visible.sync="dialogVisible" title="编辑跟进记录" width="30%">
      <el-input v-model="followupSubmit.content" :rows="4" type="textarea" placeholder="请输入内容..." />
      <el-row style="margin:10px 0" type="flex" align="middle">
        <el-col :span="6">服务客服:</el-col>
        <el-col :span="18">
          <el-input v-model="followupSubmit.servicer" placeholder="请输入客服姓名" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFollowupSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Title from './components/title'
import { getClient, getClientFollowup, postlientFollowup } from '@/api/client'
import { getClientOrder } from '@/api/orderForm'
export default {
  filters: {
    consumeStatus(status) {
      switch (status) {
        case 0:
          return '意向客户'
        case 1:
          return '成单客户-'
      }
    },
    callbackWay(key) {
      switch (key) {
        case 1:
          return '电话跟进'
        case 2:
          return '平台跟进'
        case 3:
          return '微信跟进'
        case 4:
          return '短信跟进'
        case 5:
          return '面谈跟进'
      }
    }

  },
  components: {
    Title
  },
  data() {
    return {
      currentPage: 1,
      pageTotal: 10,
      dialogVisible: false,
      consumeOrderList: [],
      detailData: {},
      followupData: [],
      followupSubmit: {
        user_id: '',
        servicer: '',
        content: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.initData(this.$route.query.id)
      this.followupSubmit.user_id = this.$route.query.id
      this.id = this.$route.query.id
    }
  },
  methods: {
    initData(id) {
      getClient(id)
        .then(res => {
          console.log('TCL: initData detailData-> res', res)
          this.detailData = res.data
        })
        .catch(err => {
          console.log('TCL: initData -> err', err)
        })
      // 获取订单
      getClientOrder({ customer_id: id, with_offline: 1, type: 0, page: this.currentPage })
        .then(res => {
          console.log('TCL: initData -> res', res)
          this.consumeOrderList = res.data
          this.pageTotal = res.page.total
        })
        .catch(err => {
          console.log('TCL: initData -> err', err)
        })
      // 获取跟进记录
      getClientFollowup({ user_id: id })
        .then(res => {
          console.log('TCL: 获取跟进记录', res)
          this.followupData = res.data
        })
        .catch(err => {
          console.log('TCL: err', err)
        })
    },
    handleChangeCurrent(e) {
      this.currentPage = e
      this.initData(this.id)
    },
    handleToDetail() {
      console.log('晚上信息')
      this.$router.push({
        path: '/client/add',
        query: {
          id: this.$route.query.id
        }
      })
    },
    handleToAddCousume() {
      this.$router.push({
        path: '/client/addConsume',
        query: {
          id: this.$route.query.id
        }
      })
    },
    handleFollowupSubmit() {
      if (!this.followupSubmit.content) {
        this.$message.error('请输入内容')
        return
      }
      if (!this.followupSubmit.servicer) {
        this.$message.error('请输入客户姓名')
        return
      }
      postlientFollowup(this.followupSubmit)
        .then(res => {
          this.initData(this.id)
          this.dialogVisible = false
          this.followupSubmit.servicer = ''
          this.followupSubmit.content = ''
        })
        .catch(err => {
          console.log('TCL: handleFollowupSubmit -> err', err)
        })
    },
    handleAddFollowUp() {
      this.$router.push({
        path: '/client/addVisit',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 1px;
}
.content {
  margin: 30px;
  min-height: 100vh;
  // background: #f7f7f7;
  border: 1px solid #f7f7f700;
}
.info-container {
  margin: 40px 0;
  background:  #f7f7f7;
  min-height: 270px;
  padding: 1px;
  padding-bottom: 20px;
}
.details {
  color: #596174;
  font-size: 15px;

  .left {
    padding-right: 14px;
    margin: 11px 0;
    text-align: right;
    font-weight: bold;
  }
  .right {
    margin: 11px 0;
  }
}
/deep/ .el-table th {
  background: #f1f3f4;
  color: #596174;
}
.record {
  color: #596174;
  font-size: 14px;
  margin: 10px 0;
  &-left {
    min-height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-container {
    min-height: 70px;
    background: rgba(247, 247, 247, 1);
    border-radius: 2px;
    padding: 20px 30px;
    margin-right: 30px;
  }
}
.followup-item {
  margin-right: 35px;
  &-created {
    color: #596174;
    font-weight: 800;
    font-size: 16px;
    margin-block-start: 0em;
    margin-block-end: 0.5em;
  }
  &-box {
    span {
      color: #596174;
      font-size: 14px;
      display: inline-block;
      margin-right: 14px;
    }
  }
}
.content-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  div {
    background: #fff;
    padding: 14px 22px;
    border-radius: 2px;
    white-space:pre-wrap;
  }
  p {
    color: #596174;
    font-size: 14px;
    font-weight: 800;
  }
}
.pagination{
  margin: 25px 10px;
  display: flex;
  justify-content: flex-end
}
.notAvailable{
  height: 80px;
  background: #ffffff;
  text-align: center;
  line-height: 80px;
  color: #808080;
  font-size: 13px;
}
</style>
