<template>
  <div class="contant-container" style="margin-top:30px;">
    <div class="earning">
      <div class="earning-content">
        <div
          class="earning-intro"
          style=" background:rgba(247,247,247,1); width:873px; height:60px;line-height:60px; text-align:left; padding-left:30px;"
        >当前发货状态：已发货</div>
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

      <div class="mes">
        <el-input
          :disabled="true"
          style="width:160px;margin-right:30px;"
          v-model="logistics"
          placeholder="请输入物流公司"
        ></el-input>
        <el-input
          style="width:260px;"
          v-model="logistics_num"
          placeholder="请输入物流编号"
          :disabled="true"
        ></el-input>
        <!-- <el-button type="primary" @click="revamp">修改</el-button> -->
        <el-button  style="margin-left:10px"  type="primary" @click="dialogFormVisible = true">修改</el-button>

        <el-dialog @click="openDialog" title="物流信息修改" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="物流公司" :label-width="formLabelWidth">
              <el-input
                style="width:50%;"
                placeholder="请输入物流公司"
                v-model="edit_logistics"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="物流编号" :label-width="formLabelWidth">
              <el-input
                style="width:50%;"
                placeholder="请输入物流编号"
                v-model="edit_logistics_num"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="notEdit">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            <el-button type="primary" @click="editOrder">确 定</el-button>
          </div>
        </el-dialog>

        <el-button style="margin-left:10px" type="primary" @click="achieve">确认送达</el-button>
        <el-button  style="margin-left:10px" type="primary" @click="salesback">已退货</el-button>
      </div>

      <div class="earning-content">
        <TitleTabs text="用户信息" />
        <div class="earning-intro">
          姓名：
          <p style="font-weight:500">{{this.customer_name}}</p>
        </div>
        <div class="earning-intro">
          手机号码：
          <p style="font-weight:500">{{this.tel}}</p>
        </div>
        <div class="earning-intro">
          微信用户：
          <img class="avatar" :src="this.avatar" />
        </div>
        <div class="earning-intro">
          昵称：
          <p style="font-weight:500">{{this.nick_name}}</p>
        </div>
      </div>

      <div class="earning-content">
        <TitleTabs text="订单信息" />
        <div class="earning-intro">
          <p style="width:300px;">
            <span style="font-weight:500">订单号：</span>
            <span style="font-weight:500">{{this.order_num}}</span>
          </p>
          <p style="width:300px;">
            <span style="font-weight:500">下单时间：</span>
            <span style="font-weight:500">{{this.created_at}}</span>
          </p>
        </div>
        <div class="earning-intro">
          <p style="width:300px;">
            <span style="font-weight:500">支付方式：</span>
            <span style="font-weight:500">微信支付</span>
          </p>
          <p style="width:300px;">
            <span style="font-weight:500">支付时间：</span>
            <span style="font-weight:500">{{this.pay_time}}</span>
          </p>
        </div>
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
            <p style="width:18%; height:50px; font-weight:500; text-align:center;">{{this.total_price/100}}</p>
            <p
              style="width:18%; height:50px; font-weight:500; text-align:center;"
            >{{this.pay_price/100}}</p>
            <p
              style="width:18%; height:50px; font-weight:500; text-align:center;"
            >{{this.odd_price/100}}</p>

            <!-- 实付款 -->
            <div class="total_price">
            <span class>实付款：</span>
            <span class="_price">￥{{this.total_price/100}}</span>
          </div>
          
        </div>
        </div>

        <!-- 商品展示结束-->

        <!-- <el-table
        :data="tableData"
        :highlight-current-row="true"
        >-->
        <!-- <el-table-column align="center" prop="product_name" label="商品名称"/>
        <el-table-column align="center" prop="status" label="订单状态">
          <template slot-scope="scope">
            {{ scope.row.status == 0 ? '已支付' : '未支付' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="total_price" label="价格"/>
        <el-table-column align="center" prop="pay_price" label="线上支付"/>
        <el-table-column align="center" prop="odd_price" label="线下支付"/>
        </el-table>-->

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
      product_name: "",
      total_price: "",
      pay_price: "",
      odd_price: "",
      edit_logistics: "",
      edit_logistics_num: "",
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
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
    //{logistics: this.logistics}, {logisticsNum:this.logistics_num}, {logisticsStatus:this.logistics_status}
    async initData() {
      const params = Object.assign({}, this.paramsObj);
      console.log(params);
      const serveData = await getListOrdersId(this.id, params);
      console.log(serveData);
      this.logistics_status = serveData.data.logistics_status;
      this.product_name = serveData.data.product_name;
      this.status = serveData.data.status;
      this.total_price = serveData.data.total_price;
      this.customer_name = serveData.data.customer_name;
      this.reciver = serveData.data.reciver;
      this.reciver_tel = serveData.data.reciver_tel;
      this.tel = serveData.data.tel;
      this.address = serveData.data.address;
      // this.avatar = serveData.data.userInfo.avatar;
      this.avatar = serveData.data.userInfo
        ? serveData.data.userInfo.avatar
        : null;

      // this.nick_name = serveData.data.userInfo.nick_name;
      this.nick_name = serveData.data.userInfo
        ? serveData.data.userInfo.nick_name
        : null;

      this.order_num = serveData.data.order_num;
      this.created_at = serveData.data.created_at;
      this.pay_time = serveData.data.pay_time;
      this.pay_price = serveData.data.pay_price;
      this.odd_price = serveData.data.odd_price;
      this.logistics = serveData.data.logistics;
      this.logistics_num = serveData.data.logistics_num;

      // var serveData = []
      // serveData.push(obj);
      // console.log(serveData)

      // this.tableData = serveData.data;
      // if (data.page) {
      //   this.totalPage = data.page.total;
      // } else {
      //   this.totalPage = 0;
      // }
    },
    //点击确认送达接口
    async getOrderConfirm(page, status, seartch) {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.paramsObj,
        { type: this.type },
        { logistics_status: 2 }
      );
      const data = await getListOrdersLogistic(this.id, params);
      console.log(data);
      if (data.code == 0) {
        //点击确认送达，跳转到已完成页面
        this.$router.push({
          path: "/completed",
          query: { id: this.id }
        });
      }
    },
    //点击取消
    notEdit() {
      //关闭模态框
      this.dialogFormVisible = false;
      this.edit_logistics = this.logistics;
      this.edit_logistics_num = this.logistics_num;
    },
    //打开模态框事件
    openDialog() {
      this.edit_logistics = this.logistics;
      this.edit_logistics_num = this.logistics_num;
    },
    //修改物流信息接口
    async editOrder() {
      if (this.edit_logistics == "") {
        this.immediateDeliveryInfo("请输入物流公司");
        return;
      }
      var reg = /^[0-9a-zA-Z]*$/g;
      if (this.edit_logistics_num == "") {
        this.immediateDeliveryInfo("请输入物流编号");
        return;
      } else {
        if (!reg.test(this.edit_logistics_num)) {
          this.immediateDeliveryInfo("物流编号只能输入数字或字母");
          return;
        }
      }

      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.paramsObj,
        { type: this.type },
        { logistics: this.edit_logistics },
        { logistics_num: this.edit_logistics_num }
      );
      const data = await getListOrdersLogistic(this.id, params);
      if (data.code == 0) {
        this.logistics = this.edit_logistics;
        this.logistics_num = this.edit_logistics_num;
        //关闭模态框
        this.dialogFormVisible = false;

        //点击修改弹窗确认修改按钮修改成功后跳转页面
        // this.$router.push({
        //   path: "/completed",
        //   query: { id: this.id }
        // });
      }
    },
    // 点击已退货接口
    async getOrderRefunded(page, status, seartch) {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.paramsObj,
        { type: this.type },
        { logistics_status: 3 }
      );
      const data = await getListOrdersLogistic(this.id, params);
      console.log(data);
      if (data.code == 0) {
        //点击已退货，跳转到退货页
        this.$router.push({
          path: "/refunded",
          query: { id: this.id }
        });
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
    immediateDeliveryInfo(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning"
      });
    },
    //确认送达
    achieve() {
      this.$confirm("是否确认送达？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getOrderConfirm();
          this.$message({
            type: "success",
            message: "已确认送达!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认送达！"
          });
        });
    },
    //已退货
    salesback() {
      this.$confirm("是否确认退货？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getOrderRefunded();

          this.$message({
            type: "success",
            message: "已确认退货!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退货！"
          });
        });
    },
    //修改物流信息和订单编号
    revamp() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("div", null, [
          h("input", { style: "color: teal" }, "内容可以是 "),
          h("br"),
          h("input", { style: "color: teal,height: 60px" }, "")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
      });
      // .then(() => {
      //   // this.getOrderRefunded();
      //   this.$message({
      //     type: "success",
      //     message: "已确认修改!"
      //   });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消修改！"
      //   });
      // });
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
  &-contaier{
     width: 873px;
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
