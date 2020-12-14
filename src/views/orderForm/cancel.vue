<template>
  <div class="contant-container" style="margin-top:30px;">
    <div class="earning">
      <div
        class="earning-intro"
        style=" background:rgba(247,247,247,1); width:873px; height:60px;line-height:60px; text-align:left; padding-left:30px;"
      >当前订单状态：已取消</div>

      <div class="earning-content">
        <TitleTabs text="用户信息" />
        <div class="earning-intro">
          姓名：
          <p style="font-weight:500">{{ this.customer_name }}</p>
        </div>
        <div class="earning-intro">
          手机号码：
          <p style="font-weight:500">{{ this.tel }}</p>
        </div>
        <div class="earning-intro">
          微信用户：
          <img :src="this.avatar" class="avatar" />
        </div>
        <div class="earning-intro">
          昵称：
          <p style="font-weight:500">{{ this.nick_name }}</p>
        </div>
      </div>
      <TitleTabs text="订单信息" />
      <div class="earning-intro">
        <p style="width:300px;">
          <span style="font-weight:500">订单号：</span>
          <span style="font-weight:500">{{ this.order_num }}</span>
        </p>
        <p style="width:300px;">
          <span style="font-weight:500">下单时间：</span>
          <span style="font-weight:500">{{ this.created_at }}</span>
        </p>
      </div>
      <div class="earning-intro">
        <p style="width:300px;">
          <span style="font-weight:500"></span>
          <span style="font-weight:500"></span>
        </p>
        <p style="width:300px;">
          <span style="font-weight:500">取消时间：</span>
          <span style="font-weight:500">{{ this.cancel_time }}</span>
        </p>
      </div>

      <!-- 商品展示开始 -->
      <div class="earning-content">
        <div class="earning-contaier" style="padding:10px;">
          <p style="width:23%; height:25px; text-align:center; padding-top:20px;">商品名称</p>
          <p style="width:18%; height:25px; text-align:center;">订单状态</p>
          <p style="width:18%; height:25px; text-align:center;">价格</p>
          <p style="width:18%; height:25px; text-align:center;">线上支付</p>
          <p style="width:18%; height:25px; text-align:center;">线下支付</p>
          <p
            style="width:23%; height:50px;margin-top: 50px; font-weight:500; text-align:center;"
          >{{this.product_name}}</p>
          <p
            style="width:18%; height:50px;margin-top: -20px;px; font-weight:500; text-align:center;"
          >{{order_status(this.status)}}</p>
          <p
            style="width:18%; height:50px; font-weight:500; text-align:center;"
          >{{this.total_price/100}}</p>
          <p
            style="width:18%; height:50px; font-weight:500; text-align:center;"
          >{{this.pay_price/100}}</p>
          <p
            style="width:18%; height:50px; font-weight:500; text-align:center;"
          >{{this.odd_price/100}}</p>

          <!-- 实付款 -->
          <div class="total_price">
            <span class>需付款：</span>
            <span class="_price">￥{{this.total_price/100}}</span>
          </div>
        </div>
      </div>

      <!-- 商品展示结束-->
      <!-- 收货人信息填写展示开始 -->
      <div class="earning-content" v-show="flag">
        <TitleTabs text="收货信息" />
        <div class="earning-intro">
          姓名：
          <p style="font-weight:500">{{this.reciver}}</p>
        </div>
        <div class="earning-intro">
          手机号码：
          <p style="font-weight:500">{{this.reciver_tel}}</p>
        </div>
        <div class="earning-intro">
          收货地址：
          <p style="font-weight:500">{{this.address}}</p>
        </div>
      </div>

      <!-- 收货人信息填写展示结束 -->
        <!-- 底部留白区开始 -->
      <div class="earning-content" >
        
      </div>
       <!-- 底部留白区结束 -->
    </div>
  </div>
</template>

<script>
import { getIncomeRate, putIncomeRate } from "@/api/sales";
import { getListOrdersLogistic, getListOrdersId } from "@/api/order";
import TitleTabs from "@/components/TitleTabs";
import math from "mathjs";
export default {
  components: {
    TitleTabs
  },
  data() {
    return {
      flag: null,
      tableData: [],
      totalPage: 10,
      currentPage: 1,
      id: this.$route.query.id,
      logistics: "",
      logistics_num: "",
      logistics_status: "",
      customer_name: "",
      reciver: "",
      reciver_tel: "",
      avatar: "",
      nick_name: "",
      created_at: "",
      status: "",
      address: "",
      tel: "",
      order_num: "",
      order_time: "",
      pay_time: "",
      //取消时间
      cancel_time: "",
      product_name: "",
      total_price: "",
      pay_price: "",
      odd_price: "",
      submitData: {
        input: "",
        input2: "",
        member_price: "",
        member_divied_level_one: "",
        member_divied_level_two: "",
        product_divied_level_one: "",
        product_divied_level_two: ""
      }
    };
  },
  computed: {
    member_price: {
      get: function() {
        return this.submitData.member_price / 100;
      },
      set: function(params) {
        this.submitData.member_price = math.fix(params * 100);
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
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

      const params = Object.assign({}, this.paramsObj);
      console.log(params);
      const serveData = await getListOrdersId(this.id, params);
      console.log(serveData);
      this.product_name = serveData.data.product_name;
      this.status = serveData.data.status;
      this.total_price = serveData.data.total_price;
      this.customer_name = serveData.data.customer_name;
      this.reciver = serveData.data.reciver;
        //  serveData.data.reciver_tel="",
      this.reciver_tel = serveData.data.reciver_tel;
      this.tel = serveData.data.tel;
      // serveData.data.address='',
      this.address = serveData.data.address;
      // this.avatar =serveData.data.userInfo.avatar
      this.avatar = serveData.data.userInfo
        ? serveData.data.userInfo.avatar
        : null;
      // this.nick_name =serveData.data.userInfo.nick_name
      this.nick_name = serveData.data.userInfo
        ? serveData.data.userInfo.nick_name
        : null;

      this.order_num = serveData.data.order_num;
      this.created_at = serveData.data.created_at;
      this.pay_time = serveData.data.pay_time;
      this.cancel_time = serveData.data.cancel_time;
      this.pay_price = serveData.data.pay_price;
      this.odd_price = serveData.data.odd_price;
      // 物流公司
      this.logistics = serveData.data.logistics;
      // 物流编号
      this.logistics_num = serveData.data.logistics_num;
      //显示隐藏
      if (serveData.data) {
        // serveData.data.reciver = "" ,
        this.flag = serveData.data.reciver == "" ? false : true;
        console.log(this.flag);//flase
      } else {
        this.flag = false;
      }
    },

    order_status: function(value) {
      let order_status;
      switch (value) {
        case -1:
          order_status = "订单支付异常";
          break;
        case 0:
          order_status = "未付款";
          break;
        case 1:
          order_status = "已付款";
          break;
        case 2:
          order_status = "已取消";
          break;
        case 3:
          order_status = "已核销";
          break;
        case 4:
          order_status = "已退款";
          break;
        default:
      }
      return order_status;
    },
    handleChangePage(e) {
      this.currentPage = e;
      this.initData();
    },
    // handleAddSale(e) {
    //   this.addSaleShow = true
    // },
    handlenSearchChange(e) {
      if (e.type == "time") {
        if (e.value) {
          this.paramsObj[e.param[0]] = e.value[0];
          this.paramsObj[e.param[1]] = e.value[1];
        } else {
          delete this.paramsObj[e.param[0]];
          delete this.paramsObj[e.param[1]];
        }
        this.currentPage = 1;
        this.initData();
        return;
      }

      if (e.value !== "") {
        this.paramsObj[e.param] = e.value;
      } else {
        delete this.paramsObj[e.param];
      }
      this.currentPage = 1;
      this.initData();
    },
    search(params) {
      const searchData = this[params] ? `?${params}=${this[params]}` : "";
      this.initData(searchData);
    },
    timeSerch(params) {
      const searchData = `?begin=${moment(params[0]).format(
        "YYYY-MM-DD"
      )}&end=${moment(params[1]).format("YYYY-MM-DD")}`;
      this.initData(searchData);
    }
  }
};
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
    height: 240px;
    margin: 15px 10px;
  }
  &-contaier {
    width: 873px;
    height: 285px;
    margin: 15px 10px;
    background: rgba(247, 247, 247, 1);
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

.total_price {
  // position: absolute;
  // right: 38%;

  // bottom: 4%;
  float: right;
  padding: 0% 10%;
  line-height: 54px;
  ._price {
    color: red;
  }
}
.avatar {
  width: 30px;
  vertical-align: middle;
  height: 30px;
}
</style>
