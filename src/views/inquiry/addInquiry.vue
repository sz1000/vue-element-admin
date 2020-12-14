<template>
  <div>
    <div class="contant-container" style="margin-top:40px;">
      <!-- 右边了 -->
      <div class="right-container" style="width:100%">
        <TitleTabs text="新增问诊卡"/>
        <div class="sub-container">
          <div class="edit-container">
            <el-form :model="submit" label-width="80px" label-position="left">
              <el-form-item label="姓名">
                <el-input v-model="submit.name" placeholder="请输入姓名"/>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="submit.gender">
                  <el-option :value="0" label="男"/>
                  <el-option :value="1" label="女"/>
                </el-select>
              </el-form-item>
              <el-form-item label="生日">
                <el-input v-model="submit.name" placeholder="请输入姓名"/>
              </el-form-item>
              <el-form-item label="电话">
                <el-row >
                  <el-col :span="12" style="margin-right:10px;">
                    <el-input v-model="submit.name" placeholder="请输入手机号" type="number"/>
                  </el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入验证码">
                      <template slot="prepend">验证码</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>

              <div class="custom">
                <h3>自定义题目：</h3>

                <el-row v-for="(item,index) in submit.customize" :key="index" class="subjeck-container">
                  <i class="el-icon-circle-close subjeck-delete" @click="handSubjeckDelete(index)"/>

                  <el-col class="subjeck-title">
                    {{ item.title }}
                  </el-col>

                  <el-col v-if="item.type == 1">
                    <el-radio-group v-model="radio">
                      <el-radio
                        v-for="(option,index1) in item.optionsArr"
                        :label="index1"
                        :key="index1" >
                        {{ option }}
                      </el-radio>
                    </el-radio-group>
                  </el-col>

                  <el-col v-if="item.type == 2">
                    <el-checkbox-group v-model="checkboxIndex">
                      <el-checkbox
                        v-for="(option,index2) in item.optionsArr"
                        :label="index2"
                        :key="index2" >
                        {{ option }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>

                  <el-col v-if="item.type == 3">
                    <el-input :placeholder="item.text" type="textarea"/>
                  </el-col>

                </el-row>

                <el-row style="margin-top:20px;">
                  <el-col :span="6">
                    <div class="add-button" @click="addDialog = true" >+ 添加题目</div>
                  </el-col>
                </el-row>
              </div>

              <el-button type="primary" class="submite" @click="handSubmit">提交</el-button>

            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTabs from '@/components/TitleTabs'
import Phone from './components/Phone'

import { getInquiry } from '@/api/inquiry'
export default {
  components: {
    TitleTabs,
    Phone
  },
  data() {
    return {
      submit: {
        client_name: '',
        gender: '',
        birthday: '',
        tel: '',
        code: '',
        customize: []
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods:
  {
    async initData() {
      const serveData = await getInquiry().catch((err) => {
        console.error(err)
        return
      })
      console.log('TCL: initData -> serveData', serveData)
    },
    handSubmit() {
      console.log('提交')
      // putInquiry(this.submit).then((res) => {
      //   console.log('TCL: handSubmit -> res', res)
      // }).catch((err) => {
      //   console.log('TCL: handSubmit -> err', err)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 30px;
  width: 450px;
}
.add-button {
  color: #596174;
  font-size: 14px;
  line-height: 28px;
  border: 1px dashed #59617442;
  text-align: center;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.tagCantainer{
  width: 100%;
  display: flex;
  flex-direction: column;
}

 /deep/.el-tag {
    margin-bottom: 10px;
  }
  .button-new-tag {
    width: 100%;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 100%;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .container-container{
    div{
      margin-top:4px;
    }
  }

.subjeck{
  &-container{
  width: 100%;
  padding: 10px;
  background: #fff;
  margin-bottom: 10px;
  border: #59617420 solid 1px;
  border-radius:  6px;
  position: relative;
  }
  &-title{
    color: #596174;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  &-delete{
    color: #59617490;
    position: absolute;
    z-index: 100;
    right: 0px;
    top:0px;
    cursor: pointer;
  }
}

.el-checkbox+.el-checkbox {
  margin-left: 0px;
}
.el-checkbox {
  margin-right: 10px;
  margin-bottom: 5px;
  color: #596174;
  font-weight: 400;
}
.el-checkbox__label {
  font-size: 14px;
}

.el-radio+.el-radio {
    margin-left: 0px;
}

.el-radio{
  margin-right: 10px;
  margin-bottom: 5px;
  color: #596174;
  font-weight: 400;
}

/deep/ .el-input-group__prepend{
  padding: 0 5px;
  font-size: 12px;
}
.submite{
  margin-top: 30px;
  width: 100%;
}

.phone{
  position: fixed;
  top: 174px;
  margin-left: 59px;
  // margin: 0 auto;
}
</style>
