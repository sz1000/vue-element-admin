<template>
  <!-- 会员设置内容介绍开始 -->

  <div class="contant-container" style="margin-top:30px;">
    <div class="earning">
      <div class="earning-content" style="background:#EEF7F8;  height:280px;">
        <div class="earning-intro;">
          <p style="font-weight:800; font-size:24px; background:rgba(238,247,248,1);">会员设置内容介绍：</p>
          <br />
          <div class="earning-title">1.设置各级别会员在小程序中的“显示名称“及最低消费额度限制，已有默认值，可修改</div>
          <div class="earning-title">2.根据商户需求可自定义设置会员收益规则，已有默认值，可修改</div>
          <div class="earning-title">3.综合管理费和提现手续费可自定义设置，已有默认值，可修改</div>
          <div class="earning-title">4.各级别的会员套餐请于商品管理模块中添加。</div>
        </div>
      </div>
      <!-- 会员设置内容介绍结束 -->
      <!-- 会员等级开始 -->
      <div class="earning-content">
        <TitleTabs text="会员等级" />
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">1.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              会员名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_one_member_name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              最低消费额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_one_member_price"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">2.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              会员名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_two_member_name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              最低消费额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_two_member_price"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">3.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              会员名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_three_member_name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              最低消费额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.level_three_member_price"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- 会员等级结束 -->
      <!-- 分销奖励设置开始 -->
      <div class="earning-context">
        <div class="earning-intro">
          <TitleTabs text="分销奖励设置" style="line-height: 0px" />
          <div class="earning-ratio-item">
            <span>一级用户购买会员提成比例</span>
            <el-input-number
              v-model="submitData.distribution_level_one_percent"
              :min="0"
              :max="100"
            />
          </div>
          <div class="earning-ratio-item">
            <span>二级用户购买会员提成比例</span>
            <el-input-number
              v-model="submitData.distribution_level_two_percent"
              :min="0"
              :max="100"
            />
          </div>
        </div>
      </div>

      <!-- 分销奖励设置结束 -->

      <!-- 业绩提成设置开始 -->

      <div class="earning-content">
        <TitleTabs text="业绩提成设置" />
        <!-- 第一级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">1.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_one.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_one.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_one.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 第二级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">2.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_two.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_two.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_two.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 第三级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">3.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_three.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_three.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_three.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第四级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">4.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_four.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_four.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_four.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第五级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">5.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_five.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_five.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_five.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第六级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">6.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_six.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_six.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_six.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第七级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">7.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_seven.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_seven.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_seven.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第八级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">8.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_eight.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_eight.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_eight.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 第九级 -->
        <div class="vip-row">
          <span class="num" style="line-height: 40px;float:left;margin-right:10px;">9.</span>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              级别名称
              <el-input
                @keyup.native="changeAmount"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_nine.name"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="rank_left" style="float:left;margin-right:30px;">
            <div class="demo-input-suffix">
              业绩额度(元)
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_nine.amount"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="rank_right" style="float:left;">
            <div class="demo-input-suffix">
              提成比例(%)
              <el-input
                type="number"
                min="0"
                max="100"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.distribution_level_nine.percent"
                clearable
              ></el-input>
            </div>
          </div>
        </div>

        <!-- 发展人数 -->
        <div
          class="earning-intro"
          style="background:rgba(241,243,244,1);border-radius:2px; padding:20px"
        >
          <p style="margin-top:10px; margin-left:8px;">默认情况仅限会员3可获得管理奖资格，会员1.2满足一下条件可获得管理奖资格</p>
          <div class="context-info" style="margin-botton:20px">
            <div class="context-left">团队发展人数达到最低数量(人)</div>
            <div class="context-right">
              <!-- <el-input style="width:150px" ></el-input> -->
              <el-input
                @keyup.native="changeCode"
                style="width:150px;"
                placeholder="请输入内容"
                v-model="submitData.push_num"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <!-- 业绩提成设置结束 -->
      <!-- 管理奖设置开始 -->

      <div class="earning-context">
        <div class="earning-intro">
          <TitleTabs text="管理奖设置" style="line-height: 0px" />
          <div class="earning-ratio-item">
            <span>一级用户购买商品提成比例</span>
            <el-input-number v-model="submitData.manager_level_one" :min="0" :max="100" />
          </div>
          <div class="earning-ratio-item">
            <span>二级用户购买商品提成比例</span>
            <el-input-number v-model="submitData.manager_level_two" :min="0" :max="100" />
          </div>
        </div>
      </div>

      <!-- 发展人数 -->
      <div
        class="earning-intro"
        style="background:rgba(241,243,244,1);border-radius:2px; margin-left:20px"
      >
        <p style="margin-top:10px; margin-left:60px;">默认情况仅限会员3可获得管理奖资格，会员1.2满足一下条件可获得管理奖资格</p>
        <div class="context-info">
          <div class="context-left" style="margin-left:50px;">团队发展人数达到最低数量(人)</div>
          <div class="context-right">
            <!-- <el-input style="width:150px" ></el-input> -->
            <el-input
              @keyup.native="changeCode"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.manager_num"
              clearable
            ></el-input>
          </div>
        </div>
      </div>

      <!-- 分红比例 -->

      <div
        class="earning-intro"
        style="background:rgba(241,243,244,1);border-radius:2px; margin-left:20px"
      >
        <p style="margin-top:20px; margin-left:60px;">收入达到制定额度可晋升常务董事</p>
        <div class="context-info">
          <div class="context-left" style="margin-left:50px;">收入达到制定额度(元)</div>
          <div class="context-right">
            <el-input
              @keyup.native="changeCode"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.recive_price"
              clearable
            ></el-input>
          </div>
        </div>
        <p style="margin:10px 15px 20px 56px">月度收入达到指标可获得公司营业额相关比例分红</p>
        <!-- 月度分红 -->
        <div class="context-info">
          <div class="context-left" style="margin-right:160px; margin-left:50px">月度分红：月收入指标</div>
          <div class="context-right" style="margin-right:100px">
            <el-input
              @keyup.native="changeCode"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.month_percent"
              clearable
            ></el-input>
          </div>

          <div class="context-left">分红比例(%)</div>
          <div class="context-right">
            <el-input
              type="number"
              min="0"
              max="100"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.month_divide"
              clearable
            ></el-input>
          </div>
        </div>
        <!-- 年度分红 -->
        <div class="context-info" style="margin:0px 0px 20px 56px">
          <div class="context-left">年度分红：累计6隔越每月收入指标</div>
          <div class="context-right" style="margin-right:100px; margin-left:60px">
            <el-input
              @keyup.native="changeCode"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.year_percent"
              clearable
            ></el-input>
          </div>

          <div class="context-left">分红比例(%)</div>
          <div class="context-right">
            <el-input
              min="0"
              max="100"
              style="width:150px;"
              placeholder="请输入内容"
              v-model="submitData.year_divide"
              clearable
            ></el-input>
          </div>
        </div>
      </div>

      <!-- 管理奖设置结束 -->

      <!-- 综合管理费设置开始 -->

      <div class="earning-context">
        <div class="earning-intro">
          <TitleTabs text="综合管理费设置" style="line-height: 0px" />
          <div class="earning-ratio-item">
            <span>会员收入扣除综合管理费比例(%)</span>
            <el-input-number v-model="submitData.brokerage_percent" :min="0" :max="100" />
          </div>
        </div>
      </div>

      <!-- 综合管理费设置结束 -->
      <!-- 提现手续费设置开始 -->

      <div class="earning-context">
        <div class="earning-intro">
          <TitleTabs text="提现手续费设置" style="line-height: 0px" />
          <div class="earning-ratio-item">
            <span>会员收入扣除提现手续费比例(%)</span>
            <el-input-number v-model="submitData.manager_percent" :min="0" :max="100" />
          </div>
        </div>
      </div>
      <!-- 提现手续费设置结束 -->
      <!-- 保存开始 -->
      <el-button type="primary" style="width:80%; margin:50px auto; " @click="submite">保存</el-button>
      <!-- 保存结束 -->
    </div>
  </div>
</template>

<script>
import { getData, commitData } from "@/api/distribution";
import TitleTabs from "@/components/TitleTabs";
import math from "mathjs";
export default {
  components: {
    TitleTabs
  },
  data() {
    return {
      submitData: {
        // 会员等级
        level_one_member_name: "黄金会员",
        level_one_member_price: "398",
        level_two_member_name: "代理商",
        level_two_member_price: "3880",
        level_three_member_name: "服务商",
        level_three_member_price: "28500",
        //  分销奖励设置
        distribution_level_one_percent: "0", //一级分销比例
        distribution_level_two_percent: "0", //二级分销比例
        //  业绩提成设置
        distribution_level_one: {
          name: "一星经理",
          amount: "20000",
          percent: "10"
        },
        distribution_level_two: {
          name: "二星经理",
          amount: "500000",
          percent: "13"
        },
        distribution_level_three: {
          name: "三星经理",
          amount: "1000000",
          percent: "16"
        },
        distribution_level_four: {
          name: "一星总监",
          amount: "2000000",
          percent: "19"
        },
        distribution_level_five: {
          name: "二星总监",
          amount: "10000000",
          percent: "22"
        },
        distribution_level_six: {
          name: "三星总监",
          amount: "30000000",
          percent: "25"
        },
        distribution_level_seven: {
          name: "总裁",
          amount: "60000000",
          percent: "28"
        },
        distribution_level_eight: {
          name: "高级总裁",
          amount: "90000000",
          percent: "31"
        },
        distribution_level_nine: {
          name: "董事",
          amount: "120000000",
          percent: "35"
        },
        //  管理奖设置
        push_num: "5000000", //直推数量多少个可以获得业绩提成
        manager_level_one: "0", //一级管理费
        manager_level_two: "0", //二级管理费
        manager_num: "5000000", //团队多少人可以获得管理奖
        recive_price: "5000000", //多少钱直升董事
        month_percent: "100000", //月收入指标
        month_divide: "0.5", //月收入分成
        year_percent: "100000", //年收入指标
        year_divide: "0.5", //年收入指标
        brokerage_percent: "0", //税率
        manager_percent: "2" //平台管理费
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
      const serveData = await getData();
      console.log(serveData);
    },
    //保存
    submite() {
      //this.printobj(this.submitData);
      if (
        !this.submitData.level_one_member_name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.level_two_member_name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.level_three_member_name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        )
      ) {
        this.$message({
          message: "请输入会员名称",
          type: "warning"
        });
        return;
      }
      if (
        this.submitData.level_one_member_price === "" ||
        this.submitData.level_two_member_price === "" ||
        this.submitData.level_three_member_price === ""
      ) {
        this.$message({
          message: "最低消费额度不能为空",
          type: "warning"
        });
        return;
      }
      if (
        this.submitData.distribution_level_one_percent == undefined ||
        this.submitData.distribution_level_two_percent == undefined
      ) {
        this.$message({
          message: "分销奖励设置不能为空",
          type: "warning"
        });
        return;
      }
      if (
        !this.submitData.distribution_level_one.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_two.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_three.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_four.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_five.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_six.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_seven.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_eight.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        ) ||
        !this.submitData.distribution_level_nine.name.replace(
          /[^\u4e00-\u9fa5]/g,
          ""
        )
      ) {
        this.$message({
          message: "请输入级别名称",
          type: "warning"
        });
        return;
      }
      if (
        this.submitData.distribution_level_one.amount == "" ||
        this.submitData.distribution_level_two.amount == "" ||
        this.submitData.distribution_level_three.amount == "" ||
        this.submitData.distribution_level_four.amount == "" ||
        this.submitData.distribution_level_five.amount == "" ||
        this.submitData.distribution_level_six.amount == "" ||
        this.submitData.distribution_level_seven.amount == "" ||
        this.submitData.distribution_level_eight.amount == "" ||
        this.submitData.distribution_level_nine.amount == ""
      ) {
        this.$message({
          message: "业绩额度不能为空",
          type: "warning"
        })
        return;
      }
      if (
        this.submitData.distribution_level_one.percent == "" ||
        this.submitData.distribution_level_two.percent == "" ||
        this.submitData.distribution_level_three.percent == "" ||
        this.submitData.distribution_level_four.percent == "" ||
        this.submitData.distribution_level_five.percent == "" ||
        this.submitData.distribution_level_six.percent == "" ||
        this.submitData.distribution_level_seven.percent == "" ||
        this.submitData.distribution_level_eight.percent == "" ||
        this.submitData.distribution_level_nine.percent == ""
      ) {
        this.$message({
          message: "提成比例不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.push_num == undefined) {
        this.$message({
          message: "团队发展人数达到最低数量不能为空",
          type: "warning"
        });
        return;
      }
      if (
        this.submitData.manager_level_one == undefined ||
        this.submitData.manager_level_two == undefined
      ) {
        this.$message({
          message: "管理奖励设置不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.manager_num === "") {
        this.$message({
          message: "团队发展人数达到最低数量不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.recive_price === "") {
        this.$message({
          message: "收入达到制定额度不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.month_percent === "") {
        this.$message({
          message: "月度分红不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.month_divide === "") {
        this.$message({
          message: "月分红比例不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.year_percent === "") {
        this.$message({
          message: "年度分红不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.year_divide === "") {
        this.$message({
          message: "年分红比例不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.brokerage_percent == undefined) {
        this.$message({
          message: "综合管理费不能为空",
          type: "warning"
        });
        return;
      }
      if (this.submitData.manager_percent == undefined) {
        this.$message({
          message: "提现手续费不能为空",
          type: "warning"
        });
        return;
      }
      commitData(this.submitData)
        .then(res => {
          console.log(res);
          this.$message({
            message: "提交成功!",
            type: "success"
          });
        })
        .catch(err => {
          console.error("submite err", err);
          this.$message.error("出错了，请联系管理员!");
        });
    },
    //限制输入框里面只能输入汉字
    changeAmount() {
      this.submitData.level_one_member_name = this.submitData.level_one_member_name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.level_two_member_name = this.submitData.level_two_member_name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.level_three_member_name = this.submitData.level_three_member_name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_one.name = this.submitData.distribution_level_one.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_two.name = this.submitData.distribution_level_two.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_three.name = this.submitData.distribution_level_three.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_four.name = this.submitData.distribution_level_four.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_five.name = this.submitData.distribution_level_five.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_six.name = this.submitData.distribution_level_six.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_seven.name = this.submitData.distribution_level_seven.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_eight.name = this.submitData.distribution_level_eight.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
      this.submitData.distribution_level_nine.name = this.submitData.distribution_level_nine.name.replace(
        /[^\u4e00-\u9fa5]/g,
        ""
      );
    },
    //限制只能输入数字
    changeCode() {
      this.submitData.level_one_member_price = this.submitData.level_one_member_price.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.level_two_member_price = this.submitData.level_two_member_price.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.level_three_member_price = this.submitData.level_three_member_price.replace(
        /[^\d]/g,
        ""
      );

      this.submitData.distribution_level_one.amount = this.submitData.distribution_level_one.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_two.amount = this.submitData.distribution_level_two.amount.replace(
        /[^\d]/g,
        ""
      );

      this.submitData.distribution_level_three.amount = this.submitData.distribution_level_three.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_four.amount = this.submitData.distribution_level_four.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_five.amount = this.submitData.distribution_level_five.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_six.amount = this.submitData.distribution_level_six.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_seven.amount = this.submitData.distribution_level_seven.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_eight.amount = this.submitData.distribution_level_eight.amount.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.distribution_level_nine.amount = this.submitData.distribution_level_nine.amount.replace(
        /[^\d]/g,
        ""
      );

      this.submitData.push_num = this.submitData.push_num.replace(/[^\d]/g, "");
      this.submitData.manager_num = this.submitData.manager_num.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.recive_price = this.submitData.recive_price.replace(
        /[^\d]/g,
        ""
      );

      this.submitData.month_percent = this.submitData.month_percent.replace(
        /[^\d]/g,
        ""
      );
      this.submitData.year_percent = this.submitData.year_percent.replace(
        /[^\d]/g,
        ""
      );
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
    font-weight: 500;
    color: rgba(89, 97, 116, 1);
    line-height: 28px;
  }
  &-content {
    padding: 30px;
    width: 100%;
  }
  &-intro {
    margin: 20px;
    margin-bottom: 0;
    white-space: pre;
    font-size: 16px;
    font-weight: 500;
    color: rgba(89, 97, 116, 1);
    line-height: 28px;
  }
  &-ratio {
    margin: 0px 0 50px 90px;
    &-item {
      margin: 12px 24px;
      height: 50px;
      span {
        margin-right: 60px;
      }
    }
  }
  .submitButton {
    width: 80%;
    margin-left: 100px;
    margin-bottom: 50px;
  }
}
.earning-title {
  margin-bottom: 0;
  white-space: pre;
  font-size: 18px;
  font-weight: 500;
  color: rgba(89, 97, 116, 1);
  line-height: 45px;
}

.vip_rank {
  font-weight: 900;
  font-size: 16px;
  color: #333;
}
.vip-row {
  overflow: hidden;
  margin: 10px 20px;
}
.context-info {
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  margin: 10px;
}
.context-left {
  float: left;
  margin-right: 15px;
}
.context-right {
  float: left;
}
.context-money {
  overflow: hidden;
  height: 40px;
  line-height: 40px;
}
</style>
