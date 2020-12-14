<template>
  <div class="contant-container" style="margin-top:30px;">
    <div class="earning">
      <div class="earning-content" style="border-bottom: 1px solid #00000020">
        <div class="earning-intro">
          会员设置内容介绍：
          1.设置会员在小程序中的“显示名称”；
          2.设置会员在小程序中售卖的价格；
          3.一级用户（直接邀请的用户）购买会员，获得分成收益；
          4.二级用户（下属团队成员邀请的用户）购买会员，获得分成收益；
          5.整体会员收益规则根据商户需求自由定义。
        </div>
        <div class="earning-ratio">
          <div class="earning-ratio-item">
            <span>黄金会员价格({{ member_price }}元/RMB)</span>
            <el-input-number v-model="member_price" :min="0" />
          </div>
          <div class="earning-ratio-item">
            <span>一级用户购买会员提成比例({{ submitData.member_divied_level_one }}%)</span>
            <el-input-number v-model="submitData.member_divied_level_one" :min="0" :max="100" />
          </div>
          <div class="earning-ratio-item">
            <span>二级用户购买会员提成比例({{ submitData.member_divied_level_two }}%)</span>
            <el-input-number v-model="submitData.member_divied_level_two" :min="0" :max="100" />
          </div>
        </div>
      </div>
      <div class="earning-content">
        <div class="earning-intro">
          分销收益设置内容介绍：
          1.一级用户（直接邀请的用户）购买商品，获得分成收益；
          2.二级用户（下属团队成员邀请的用户）购买商品，获得分成收益；
          3.整体分销收益规则根据商户需求自由定义。
        </div>
        <div class="earning-ratio">
          <div class="earning-ratio-item">
            <span>一级用户购买商品提成比例({{ submitData.product_divied_level_one }}%)</span>
            <el-input-number v-model="submitData.product_divied_level_one" :min="0" :max="100" />
          </div>
          <div class="earning-ratio-item">
            <span>二级用户购买商品提成比例({{ submitData.product_divied_level_two }}%)</span>
            <el-input-number v-model="submitData.product_divied_level_two" :min="0" :max="100" />
          </div>
        </div>
      </div>
      <el-button class="submitButton" type="primary" @click="submite">保存</el-button>
      <div>
        <span />
      </div>
    </div>
  </div>
</template>

<script>
import { getIncomeRate, putIncomeRate } from '@/api/sales'
import math from 'mathjs'
export default {
  data() {
    return {
      submitData: {
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
    this.initData()
  },
  methods: {
    async initData() {
      const serveData = await getIncomeRate()
      this.submitData = serveData.data
      console.log('TCL: initData -> serveData', serveData)
    },
    submite() {
      putIncomeRate(this.submitData)
        .then(res => {
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
        })
        .catch(err => {
          console.error('submite err', err)
          this.$message.error('出错了，请联系管理员!')
        })
    }
  }
}
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
    margin: 0 10px;
  }
  &-intro {
    margin: 50px;
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
}
</style>
