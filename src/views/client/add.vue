<template>
  <div class="container">
    <TitleTabs text="新增客户"/>
    <section class="submit">
      <el-form
        ref="ruleForm"
        :model="submitData"
        :rules="rules"
        class="form-container"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="submitData.name" type="text" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="submitData.tel" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="职业" >
          <el-input v-model="submitData.profession" type="text" placeholder="请输入职业" />
        </el-form-item>
        <el-form-item label="微信号" >
          <el-input v-model="submitData.wxid" type="text" placeholder="请输入微信号" />
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio v-model="submitData.gender" :label="1">男</el-radio>
          <el-radio v-model="submitData.gender" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" >
          <el-date-picker
            v-model="submitData.birthday"
            value-format="yyyy-MM-dd"
            style="width:100%"
            type="date"
            placeholder="请选择生日"
          />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="submitData.age" type="text" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="地区" >
          <citySelect :arr="[]" @change="handleCityChange" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="submitData.address" type="text" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="来源渠道" prop="source">
          <el-select v-model="submitData.source">
            <el-option v-for="(item,index) in sourceArr" :key="index" :value="item.name">
              <div class="option-container">
                <span>{{ item.name }}</span>
                <i
                  v-if="item.name !== '小程序'"
                  class="el-icon-remove"
                  @click.stop="handleDelOption(index)"
                />
              </div>
            </el-option>
            <div class="add-option">
              <el-input v-model="addOption" placeholder="新增来源渠道" size="small" type="text">
                <div slot="append" class="but" @click="handleAddOption">
                  <i class="el-icon-circle-plus-outline" />
                  <el-option :value="addOption" class="add-option-icon" />
                </div>
              </el-input>
            </div>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属销售" prop="client">
          <el-input v-model="submitData.client" type="text" placeholder="请输入预约人姓名" />
        </el-form-item>-->
        <el-form-item label="备注">
          <el-input v-model="submitData.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div class="but-container">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReturn">返回</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import citySelect from '@/components/citySelect'
import TitleTabs from '@/components/TitleTabs'
import { postSource, getSourceList, delSource, postClient, getClient } from '@/api/client'
export default {
  components: {
    citySelect,
    TitleTabs
  },
  data() {
    return {
      addOption: '',
      sourceArr: [],
      submitData: {
        name: '',
        tel: '',
        profession: '',
        wxid: '',
        birthday: null,
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        remark: '',
        source: ''
      },
      rules: {
        name: {
          type: 'string', required: true, message: '请输入姓名'
        },
        tel: [{
          required: true, message: '请输入手机号'
        },
        { required: true, len: 11, message: '请输入正确的手机号' }
        ],
        source: {
          type: 'string', required: true, message: '请选择来源渠道'
        }

      }
    }
  },
  mounted() {
    this.initData()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.$route.meta.title = '完善信息'
    } else {
      this.$route.meta.title = '新增客户'
    }
  },
  methods: {
    async initData() {
      const sourceArr = await getSourceList().catch(err => {
        console.error('渠道列表出错了', err)
      })
      this.sourceArr = sourceArr.data
      if (this.id) {
        getClient(this.id).then(res => {
          res.data.age = res.data.age ? res.data.age : null
          this.submitData = res.data
        }).catch(err => {
          console.log('TCL: initData -> err', err)
        })
      }
    },
    handleAddOption(e) {
      let repetition
      this.sourceArr.forEach(item => {
        if (item.name === this.addOption) {
          this.$message.error('已经有这个渠道了')
          repetition = true
          return
        }
      })
      if (!repetition) {
        repetition = false
        this.sourceArr.push({ name: this.addOption })
        postSource({ name: this.addOption })
          .then(res => {
            this.addOption = ''
          })
          .catch(err => {
            console.error(err.response)
            this.sourceArr.splice(this.sourceArr.length - 1, 1)
          })
      }
    },
    handleDelOption(index) {
      delSource(this.sourceArr[index].id)
        .then(res => {
          this.sourceArr.splice(index, 1)
        })
        .catch(err => {
          console.error(err)
        })
    },
    async handleSubmit() {
      this.$refs['ruleForm'].validate(
        (valid) => {
          if (valid) {
            postClient(this.submitData, this.id ? 'put' : 'post', this.id || null).then((res) => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.back()
            }).catch((err) => {
              this.$message.error(err.response.data.data)
              console.error(err)
            })
          } else {
            console.log('error submit!!', valid)
            return false
          }
        }
      )
    },
    handleReturn() {
      this.$router.back()
    },
    handleCityChange(obj) {
      this.submitData = Object.assign({}, this.submitData, obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
}
.submit {
  // margin: 30px 0;
  background: #f7f7f7;
  min-height: 100vh;
}
.form-container {
  padding: 30px;
  width: 500px;
}
.add-option {
  margin: 0 10px;
  margin-bottom: 4px;
  .but {
    width: 100%;
    height: 100%;
    padding: 6px 0;
  }
  &-icon {
    display: none;
  }
  /deep/.el-input-group__append {
    padding: 0;
    height: 100%;
    width: 30px;
    text-align: center;
    cursor: pointer;
    span {
      display: none;
    }
  }
  .del-option {
    width: 10px;
    height: 10px;
    color: aqua;
    padding: 0;
  }
}
.option-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.but-container{
    width: 500px;
    display: flex;
    justify-content: center;
}
</style>
