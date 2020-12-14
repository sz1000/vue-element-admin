<template>
  <div class="container">
    <section class="content">
      <el-form
        ref="ruleForm"
        :model="submitData"
        :rules="rules"
        class="form-container"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="submitData.product_name" type="text" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品价格" prop="total_price">
          <el-input v-model="total_price" type="number" placeholder="请输入商品价格" />
        </el-form-item>
        <!-- <el-form-item label="线上支付" prop="pay_price">
          <el-input v-model="pay_price" type="number" placeholder="请输入线上支付价格" />
        </el-form-item> -->
        <el-form-item label="线下支付" prop="odd_price">
          <el-input v-model="odd_price" type="number" placeholder="请输入线下支付价格" />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="submitData.status">
            <el-option
              v-for="(item,index) in orderStatusArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="created_at">
          <el-date-picker
            v-model="submitData.created_at"
            style="width:100%"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择下单时间"/>
        </el-form-item>
        <el-form-item label="付款时间" prop="name">
          <el-date-picker
            v-model="submitData.pay_time"
            style="width:100%"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择付款时间"/>
        </el-form-item>
        <el-form-item label="核销时间" prop="name">
          <el-date-picker
            v-model="submitData.confirm_time"
            style="width:100%"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择核销时间"/>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import { postOfflineOrder } from '@/api/client'
export default {
  data() {
    return {
      followupData: [],
      orderStatusArr: [
        {
          label: '已支付',
          value: 1
        },
        {
          label: '已核销',
          value: 3
        },
        {
          label: '已退款',
          value: 4
        }
      ],
      submitData: {
        customer_id: '',
        total_price: '',
        product_name: '',
        pay_price: '',
        odd_price: '',
        status: '',
        pay_time: null,
        created_at: null,
        confirm_time: null
      },
      rules: {
        product_name: { required: true, message: '请输入商品名称' },
        total_price: { required: true, message: '请输入商品价格' },
        // pay_price: { required: true, message: '请输入线上支付价格' },
        odd_price: { required: true, message: '请输入线下支付价格' },
        status: { required: true, message: '请选择订单支付状态' },
        created_at: { required: true, message: '请选择下单时间' }
      }
    }
  },
  computed: {
    pay_price: {
      get: function() {
        return this.submitData.pay_price || this.submitData.pay_price === 0 ? this.submitData.pay_price / 100 : null
      },
      set: function(value) {
        if (value) {
          this.submitData.pay_price = value * 100
        } else {
          this.submitData.pay_price = null
        }
      }
    },
    odd_price: {
      get: function() {
        return this.submitData.odd_price || this.submitData.odd_price === 0 ? this.submitData.odd_price / 100 : null
      },
      set: function(value) {
        if (value >= 0) {
          this.submitData.odd_price = value * 100
        } else {
          this.submitData.odd_price = null
        }
      }
    },
    total_price: {
      get: function() {
        return this.submitData.total_price || this.submitData.total_price === 0 ? this.submitData.total_price / 100 : null
      },
      set: function(value) {
        if (value || value === '0') {
          this.submitData.total_price = value * 100
        } else {
          this.submitData.total_price = null
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.submitData.customer_id = this.$route.query.id
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          postOfflineOrder(this.submitData).then(res => {
            this.$message({
              message: '新增消费记录成功!',
              type: 'success'
            })
            this.$router.back()
          }).catch(err => {
            console.log('TCL: handleSubmit -> err', err)
          })
        } else {
          this.$message.error('请核对信息')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 1px
}
.content{
    min-height: 100vh;
    margin: 30px;
    background:rgba(247,247,247,1);
    border-radius:2px;
    padding: 1px;
}
.form-container {
  padding: 30px;
  width: 500px;
}
.button-container{
    display: flex;
    justify-content: center;
}
</style>
