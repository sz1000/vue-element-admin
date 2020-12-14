<template>
  <div class="container">
    <TitleTabs text="新增预约" />
    <div class="content">
      <el-form
        ref="ruleForm"
        :model="submitData"
        :rules="rules"
        class="form-container"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="预约人" prop="client">
          <el-input v-model="submitData.client" type="text" placeholder="请输入预约人姓名" />
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="submitData.tel" type="text" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="服务" prop="item_type">
          <div class="card-container">
            <div class="card-container-left">
              <el-image :src="serveItem.img" fit="cover" class="image">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </div>
            <div class="card-container-right">
              <el-dropdown @command="handleSelectServe">
                <span>
                  选择服务项目
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">医生</el-dropdown-item>
                  <el-dropdown-item command="1">项目</el-dropdown-item>
                  <el-dropdown-item command="2">到院安排</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-if="serveItem.name" class="target">{{ serveItem.name }}</div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="到院时间" prop="appoint_time">
          <el-date-picker
            v-model="submitData.appoint_time"
            :picker-options="pickerOptions"
            style="width:100%"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="submitData.remark" placeholder="请输入备注信息" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button type="primary" @click="handleSumiteData">提交</el-button>
        <el-button @click="handleReturn">返回</el-button>
      </div>
    </div>

    <SelectDialog
      v-if="selectShow"
      :show.sync="selectShow"
      :type="selectType"
      @change="handleSelectChange"
    />
  </div>
</template>

<script>
import SelectDialog from '@/components/SelectDialog'
import { postAppointment, getAppointment } from '@/api/appointment'

import TitleTabs from '@/components/TitleTabs'
export default {
  components: {
    SelectDialog,
    TitleTabs
  },
  data() {
    return {
      selectType: '',
      selectShow: false,
      serveItem: {
        img: '',
        name: ''
      },
      pickerOptions: {
        disabledDate: currentTime => {
          return Date.now() > currentTime.getTime() + 3600 * 1000 * 24
        }
      },
      submitData: {
        client: '',
        tel: undefined,
        item_type: null,
        item_id: null,
        appoint_time: '',
        remark: ''
      },
      rules: {
        client: [
          { required: true, message: '请输入预约人姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { required: true, message: '请输入正确的手机号', len: 11 }
        ],
        item_type: [{ required: true, message: '请选择服务' }],
        appoint_time: [
          { required: true, message: '请选择预约到院的时间', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.initData(this.$route.query.id)
    }
  },
  methods: {
    initData(id) {
      getAppointment(id)
        .then(res => {
          this.submitData = res.data
          if (res.data.item_type === 0) {
            this.selectType = 'doctor'
            this.handleSelectChange(res.data.doctorInfo)
          } else if (res.data.item_type === 1) {
            this.selectType = 'product'
            this.handleSelectChange(res.data.productInfo)
          } else {
            this.serveItem.name = '到院安排'
          }
        })
        .catch(err => {
          this.$message.error('出错了，请联系管理员！')
          console.log('TCL: initData -> err', err)
        })
    },
    handleSelectServe(command) {
      this.submitData.item_type = command
      if (command === '0') {
        this.selectType = 'doctor'
        this.selectShow = true
      } else if (command === '1') {
        this.selectType = 'product'
        this.selectShow = true
      } else if (command === '2') {
        this.serveItem.name = '到院安排'
      }
    },
    handleSelectChange(item) {
      if (!item) {
        return
      }
      if (this.selectType === 'doctor') {
        this.serveItem.img = item.avatar
        this.serveItem.name = item.name
        this.submitData.item_id = item.id
      } else if (this.selectType === 'product') {
        this.serveItem.img = item.cover_img
        this.serveItem.name = item.name
        this.submitData.item_id = item.id
      }
    },
    handleSumiteData() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          postAppointment(this.submitData)
            .then(res => {
              this.$message({
                message: '预约成功！',
                type: 'success'
              })
              this.$router.push({
                path: '/appointment/list'
              })
            })
            .catch(err => {
              this.$message.error(err.response.data.data)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleReturn() {
      this.$router.push({
        path: '/appointment/list'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
}
.content {
  background: #f7f7f7;
  border-radius: 2px;
  min-height: 100vh;
  padding: 30px;
}
.form-container {
  width: 400px;
  // margin: 0 auto;
}
.card-container {
  height: 80px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;

  color: #596174;
  line-height: 24px;
  &-left {
    margin: 4px;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border: 1px dotted #e4e7ed;
      color: #596174;
    }
  }
  &-right {
    .target {
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      padding-left: 4px;
      margin-right: 4px;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.button-container {
  width: 400px;
  display: flex;
  justify-content: center;
}
</style>

