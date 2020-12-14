<template>
<!-- 提现状态：已驳回 -->
  <div class="contant-container" style="margin-top:30px;">
    <div class="earning">
      <div class="earning-content" style="background:rgba(247,247,247,1);">
        <TitleTabs text="提现申请人信息" />
        <div class="earning-intro">
          姓名：
          <p style="font-weight:500">小糖果</p>
        </div>
        <div class="earning-intro">
          手机号码：
          <p style="font-weight:500">17641967893</p>
        </div>
        <div class="earning-intro">
          微信用户：
          <!-- <img :src="this.avatar" class="avatar" > -->
        </div>
        <div class="earning-intro">
          昵称：
          <p style="font-weight:500">深海温柔</p>
        </div>
         <div class="earning-intro">
          会员等级：
          <p style="font-weight:500">代理商</p>
        </div>
         <div class="earning-intro">
          团队级别：
          <p style="font-weight:500">一星经理</p>
        </div>
         <div class="earning-intro">
          银行卡信息：
          <p style="font-weight:500">招商银行 34217869067755542</p>
        </div>
         <div class="earning-intro">
          开户行所在地：
          <p style="font-weight:500">上海虹口</p>
        </div>
         <div class="earning-intro">
          支行名称：
          <p style="font-weight:500">虹口招商支行</p>
        </div>
      </div>

        <!-- 提现申请信息开始 -->
        <TitleTabs text="提现申请信息" />
        <div class="earning-contaier" style="padding:10px;">
            <p style="width:23%; height:25px; text-align:center; padding-top:20px;">订单编号</p>
            <p style="width:18%; height:25px; text-align:center;">提现额度</p>
            <p style="width:18%; height:25px; text-align:center;">提现状态</p>
            <p style="width:18%; height:25px; text-align:center;">提现时间</p>
            <p style="width:18%; height:25px; text-align:center;">驳回时间</p>
            <p
              style="width:23%; height:50px;margin-top: 50px; font-weight:500; text-align:center;" 
            >TV73986890</p>
            <p
              style="width:18%; height:50px;margin-top: -20px;px; font-weight:500; text-align:center;color:red"
            >￥2738</p>
            <p style="width:18%; height:50px; font-weight:500; text-align:center;">已驳回</p>
            <p
              style="width:18%; height:50px; font-weight:500; text-align:center;"
            >2019.11.11</p>
            <p
              style="width:18%; height:50px; font-weight:500; text-align:center;"
            >
           2019.11.12
            </p>
        </div>
        <!-- 提现申请信息结束-->
        <!-- 打款信息开始 -->
    <div class="earning-content" style="background:rgba(247,247,247,1);">
        <TitleTabs text="打款信息" />
        <div class="earning-intro">
          审核金额：
          <p style="font-weight:500;color:red;">￥567878879</p>
        </div>
        <div class="earning-intro">
          手续费：
          <p style="font-weight:500;color:red;">67899</p>
        </div>
        <div class="earning-intro">
          费率：
          <p style="font-weight:500; color:red" > 6%</p>
        </div>
        <div class="earning-intro">
          应打款：
          <p style="font-weight:500;color:red">5678987822</p>
        </div>
      
        <!-- 打款信息结束-->
      <div class="earning-intro">
        <p style="height:40px;">
         <el-button  type="primary" style="width:120px; height:40px; border-radius:2px; margin-left:440px;"> 返回</el-button></p> 

       </div>

    </div>

       <!-- 底部留白区开始 -->
      <div class="earning-content" >
        
      </div>
       <!-- 底部留白区结束 -->
    </div>
  </div>
</template>

<script>
import { getIncomeRate, putIncomeRate } from '@/api/sales'
import { getListOrdersLogistic, getListOrdersId } from '@/api/order'
import TitleTabs from '@/components/TitleTabs'
import math from 'mathjs'
export default {
  components: {
    TitleTabs
  },
  data() {
    return {
      tableData: [],
      totalPage: 10,
      currentPage: 1,
      id: this.$route.query.id,
      // logistics: '',
      // logistics_num: '',
      // logistics_status: '',
      // customer_name: '',
      // reciver: '',
      // reciver_tel: '',
      // avatar: '',
      // nick_name: '',
      created_at: '',
      // status: '',
      address: '',
      tel: '',
      // order_num: '',
      order_time: '',
      pay_time: '',
      // product_name: '',
      // total_price: '',
      pay_price: '',
      odd_price: '',
      submitData: {
        input: '',
        input2: '',
        member_price: '',
        member_divied_level_one: '',
        member_divied_level_two: '',
        product_divied_level_one: '',
        product_divied_level_two: ''
      }
    }
  },
  computed: {
    member_price: {
      get: function() {
        return this.submitData.member_price / 100
      },
      set: function(params) {
        this.submitData.member_price = math.fix(params * 100)
      }
    }
  },
  mounted() {
    // this.initData()
  },
  methods: {
    // async initData() {
      // const params = Object.assign({}, this.paramsObj, {logistics: this.logistics}, {logisticsNum:this.logistics_num}, {logisticsStatus:this.logistics_status})
      // let serveData = await getListOrdersLogistic(this.id,params)
      //   var obj = {
      //     product_name: this.product_name,
      //     logistics_status: this.logistics_status,
      //     total_price:this.total_price,
      //     pay_price: this.pay_price,
      //     odd_price:this.odd_price
      //   };
      //   var serveData = []
      //   serveData.push(obj);
      //   console.log(serveData)
      //   this.tableData = serveData
      //   this.totalPage = 1

      // const params = Object.assign({}, this.paramsObj)
      // console.log(params)
      // const serveData = await getListOrdersId(this.id, params)
      // console.log(serveData)
      // this.product_name = serveData.data.product_name
      // this.status = serveData.data.status
      // this.total_price = serveData.data.total_price
      // this.customer_name = serveData.data.customer_name
      // this.reciver = serveData.data.reciver
      // this.reciver_tel = serveData.data.reciver_tel
      // this.tel = serveData.data.tel
      // this.address = serveData.data.address
      // this.avatar =serveData.data.userInfo.avatar
      // this.avatar = serveData.data.userInfo
      //   ? serveData.data.userInfo.avatar
      //   : null
      // this.nick_name =serveData.data.userInfo.nick_name
      // this.nick_name = serveData.data.userInfo
      //   ? serveData.data.userInfo.nick_name
      //   : null

      // this.order_num = serveData.data.order_num
      // this.created_at = serveData.data.created_at
      // this.pay_time = serveData.data.pay_time
      // this.pay_price = serveData.data.pay_price
      // this.odd_price = serveData.data.odd_price
      // 物流公司
      // this.logistics = serveData.data.logistics
      // 物流编号
      // this.logistics_num = serveData.data.logistics_num
    // },
   
   
    immediateDeliveryInfo(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'warning'
      })
    },
    // 弹框UI组件
    // immediateDelivery() {
    //    if (this.logistics == ''&& this.logistics_num =='') {
    //     this.immediateDeliveryInfo('请输入物流公司和物流编号')
    //     return
    //   }
    //   if (this.logistics == '') {
    //     this.immediateDeliveryInfo('请输入物流公司')
    //     return
    //   }
    //   if (this.logistics_num == '') {
    //     this.immediateDeliveryInfo('请输入物流编号')
    //     return
    //   }
     
    //   this.$confirm('是否确认立即发货？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     center: true
    //   })
    //     .then(() => {
    //       this.toGoods()
    //       this.$message({
    //         type: 'success',
    //         message: '已立即发货!'
    //       })
    //       // 点击立即发货，跳转已发货页面
    //       this.$router.push({
    //         path: '/shipped'
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消发货！'
    //       })
    //     })
    // },

    handleChangePage(e) {
      this.currentPage = e
      this.initData()
    },
    // handleAddSale(e) {
    //   this.addSaleShow = true
    // },
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
      const searchData = `?begin=${moment(params[0]).format(
        'YYYY-MM-DD'
      )}&end=${moment(params[1]).format('YYYY-MM-DD')}`
      this.initData(searchData)
    }
  }

  // mounted() {
  //   this.initData()
  // },
  // methods: {
  //   async initData() {
  //     const serveData = await getIncomeRate()
  //     this.submitData = serveData.data
  //     console.log('TCL: initData -> serveData', serveData)
  //   },
  //   submite() {
  //     putIncomeRate(this.submitData)
  //       .then(res => {
  //         this.$message({
  //           message: '提交成功!',
  //           type: 'success'
  //         })
  //       })
  //       .catch(err => {
  //         console.error('submite err', err)
  //         this.$message.error('出错了，请联系管理员!')
  //       })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.earning {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  margin: 30px;
  // background: rgba(247, 247, 247, 1);
  border-radius: 2px;
  p,
  span {
    font-size: 16px;
    // font-weight: 500;
    font-weight: bold;
    color: rgba(89, 97, 116, 1);
    line-height: 28px;
  }
  &-content {
    height: 540px;
    margin: 15px 10px;
  }
  &-contaier{
     height: 285px;
    margin: 15px 10px;
   background:rgba(247,247,247,1);
  }
  &-intro {
    margin-bottom: 0;
    margin: 10px 20px 10px 30px;
    // background:rgba(247,247,247,1);
    // white-space: pre;
    font-size: 15px;
    font-weight: 500;
    color: rgba(89, 97, 116, 1);
    line-height: 28px;
  }
  &-ratio {
    margin: 0px 0 50px 90px;
    &-item {
      margin: 12px 0;
      span {
        margin-right: 57px;
      }
    }
  }
  .submitButton {
    width: 80%;
    margin-left: 100px;
    margin-bottom: 50px;
  }
  .mes {
    background: #fff;
    padding: 20px 50px;
  }
}
.avatar {
  width: 30px;
  vertical-align: middle;
  height: 30px;
}
</style>
