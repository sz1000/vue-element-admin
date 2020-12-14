<template>
  <div class="container">
    <section class="content">
      <el-form
        ref="ruleForm"
        :model="submitData"
        :rules="rules"
        class="form-container"
        label-width="130px">
        <el-form-item prop="servicer" label="服务客服">
          <el-input v-model="submitData.servicer" placeholder="输入客服姓名"/>
        </el-form-item>
        <el-form-item prop="callback_way" label="跟进方式">
          <el-select v-model="submitData.callback_way" style="width:100%" placeholder="选择跟进方式">
            <el-option
              v-for="(item,index) in callbackArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="跟进内容">
          <el-input :rows="4" v-model="submitData.content" type="textarea" placeholder="请输入跟进内容"/>
        </el-form-item>
        <el-form-item label="推荐项目">
          <el-autocomplete
            v-model="submitData.product"
            :fetch-suggestions="handleQuerySearchAsync"
            style="width:100%"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="下一次回访时间">
          <el-date-picker
            v-model="submitData.next_time"
            :picker-options="pickerOptions"
            style="width:100%"
            type="datetime"
            placeholder="选择下一次回访时间"/>
        </el-form-item>
        <el-form-item label="其它备注">
          <el-input :rows="4" v-model="submitData.remark" type="textarea" placeholder="请输入备注信息"/>
        </el-form-item>

        <div class="button-container">
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="handleCallback">返回</el-button>
        </div>

      </el-form>
    </section>
  </div>
</template>

<script>
import { productList } from '@/api/product'
import { postlientFollowup } from '@/api/client'
import moment from 'moment'
export default {
  data() {
    return {
      callbackArr: [
        { value: 1, label: '电话跟进' },
        { value: 2, label: '平台跟进' },
        { value: 3, label: '微信跟进' },
        { value: 4, label: '短信跟进' },
        { value: 5, label: '面谈跟进' }
      ],
      rules: {
        servicer: { required: true, message: '输入客服姓名', trigger: 'blur' },
        callback_way: { required: true, message: '选择跟进方式', trigger: 'change' },
        content: { required: true, message: '请输入跟进内容', trigger: 'blur' }
      },
      submitData: {
        user_id: 0,
        servicer: '',
        callback_way: null,
        content: '',
        product: '',
        next_time: '',
        remark: ''
      },
      pickerOptions: {
        disabledDate: function(time) {
          return time < moment(new Date()).subtract(1, 'days')
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.submitData.user_id = this.id
    }
  },
  methods: {
    handleQuerySearchAsync(value, callbackArr) {
      productList(value ? { name: value } : {}).then(res => {
        const arr = []
        res.data.forEach(element => {
          arr.push({ value: element.name })
        })
        callbackArr(arr)
      }).catch(err => {
        console.log('TCL: handleQuerySearchAsync -> err', err)
      })
    },
    handleSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          postlientFollowup(this.submitData).then(res => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.$router.back()
          }).catch(err => {
            console.error(err)
            this.$message.error('出错了！ 请联系管理员')
          })
        } else {
          return false
        }
      })
    },
    handleCallback() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    overflow: hidden;
}
.content{
    margin: 30px;
    background: #F7F7F7;
    min-height: 100vh;
    overflow: hidden;
}
.form-container{
    margin-left: 140px;
    margin-top: 40px;
    width: 500px;
}
.button-container{
    display: flex;
    padding-left: 130px;
    justify-content: space-around;
}

</style>

