<template>
  <div>
    <div class="contant-container" style="margin-top:30px;min-height:auto;">
      <div class="earning">
        <div class="earning-content">
          <p style="font-weight: bold;">基本信息</p>
          <br />
          <!-- <TitleTabs text="基本信息" /> -->
          <div class="left_content">
            <div class="earning-intro">
              姓名：
              <p style="font-weight:500">{{ this.name }}</p>
            </div>
            <div class="earning-intro">
              手机号：
              <p style="font-weight:500">{{ this.tel }}</p>
            </div>
            <div class="earning-intro">
              微信号：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="earning-intro">
              微信用户：
              <img :src="this.avatar" class="avatar" />
            </div>
            <div class="earning-intro">
              昵称：
              <p style="font-weight:500">{{ this.name }}</p>
            </div>
            <div class="earning-intro">
              工作状态：
              <p style="font-weight:500">{{ this.job_status }}</p>
            </div>
            <div class="earning-intro">
              是否有徽商经验：
              <p style="font-weight:500">{{ this.tel }}</p>
            </div>
            <div class="earning-intro">
              银行卡信息：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="earning-intro">
              开户行所在地：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="earning-intro" style="margin-bottom:0px;">
              支行名称：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
          </div>
          <div class="right_content">
            <div class="earning-intro">
              注册时间：
              <p style="font-weight:500">{{ this.name }}</p>
            </div>
            <div class="earning-intro">
              来源渠道：
              <p style="font-weight:500">{{ this.tel }}</p>
            </div>
            <div class="earning-intro">
              会员编号：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="earning-intro">
              会员等级：
              <img :src="this.avatar" class="avatar" />
            </div>
            <div class="earning-intro">
              团队级别：
              <p style="font-weight:500">{{ this.name }}</p>
            </div>
            <div class="earning-intro">
              业绩：
              <p style="font-weight:500">{{ this.job_status }}</p>
            </div>
            <div class="earning-intro">
              上级销售：
              <p style="font-weight:500">{{ this.tel }}</p>
            </div>
            <div class="earning-intro">
              下属团队：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="earning-intro">
              收入：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
          </div>
        </div>

        <div class="earning-content">
          <div class="left_content">
            <div class="earning-intro">
              通讯地址：
              <p style="font-weight:500">{{ this.avatar }}</p>
            </div>
            <div class="card_photo">
              <div class="card_text">身份证照片：</div>
              <div class="card_img">
                <div class="front_img">
                  <img src alt />

                  <span class="front_text">正面</span>
                </div>
              </div>
              <div class="card_img">
                <div class="reverse_img">
                  <img src alt />

                  <span class="reverse_text">反面</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 线下消费记录开始 -->
    <!-- <div class="contant-container" style="margin-top:30px;min-height:auto; ">
      <div style="min-height: 40vh" class="earning tableInfo">
        <div class="earning-content">
          
          <div class="search-container-left">线下消费记录

         </div>
          <div class="search-container-right">
            <el-button type="primary" size="medium" @click="handaddconsume">新增线下消费记录</el-button>
          </div>

          
          <div class="tableContainer">
            <el-table
              :data="tableData"
              :highlight-current-row="true"
              :header-cell-style="{
               background: 'rgba(241,243,244,1)',
               color:'#909399',
               font:'14px',
               padding: '8px 0'
          }"
              header-row-class-name="headerStyle"
              header-cell-class-name="headerCell"
              cell-class-name="rowStyle"
              style="width: 100%"
            >
              <el-table-column align="center" prop="customer_name" label="订单编号" />
              
              <el-table-column align="center" prop="tel" label="商品名称" />
              
              <el-table-column align="center" label="耗卡医院">
              
             
              </el-table-column>
              <el-table-column align="center" label="商品价格">
              
              </el-table-column>
              <el-table-column align="center" label="收货地址">
            
                
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="消费时间" />
            
            </el-table>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 线下消费记录结束 -->
  </div>
</template>
<script>
import TitleTabs from "@/components/TitleTabs";
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
      avatar: "",
      name: "",
      job_status: "",
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
      odd_price: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    //新增线下消费记录
    handaddconsume() {
      this.$router.push({
        path: "/addoffline"
      });
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
  background: rgba(247, 247, 247, 1);
  border-radius: 2px;

  p,
  span {
    font-size: 16px;
    // font-weight: 500;
    // font-weight: bold;
    margin-left: 20px;
    color: rgba(89, 97, 116, 1);
    line-height: 28px;
  }
  &-content {
    margin: 0px 10px;
    overflow: hidden;
    .search-container-left {
      float: left;
    }
    .search-container-right {
      float: right;
    }
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
  .earning-contaier {
    overflow: hidden;
  }
  .left_content {
    width: 44%;
    margin-left: 60px;
    float: left;
  }
  
  .right_content {
    width: 46%;
    margin-left: 30px;
    float: left;
  }
  .card_photo {
    width:600px;
    overflow: hidden;
  }
  .card_text {
    float: left;
    color: rgb(89, 97, 116);
    margin-left: 30px;
  }

  .card_img {
    float: left;
    margin: 0 20px;
    border-radius: 6px;
  }
  .front_img,
  .reverse_img {
    // float: left;
    background: #fff;
  }
  .card_img img {
    width: 140px;
    height: 100px;
    display: inline-block;
  }
  .front_text,
  .reverse_text {
    width: 140px;
    height: 40px;
    line-height: 40px;
    margin: 0px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.3;
    border-radius: 6px;
    display: block;
    text-align: center;
  }
  .tableInfo {
    height: auto;
  }
  .tableContainer {
    margin: 0 30px;
    // overflow: hidden;
  }
}
</style>
