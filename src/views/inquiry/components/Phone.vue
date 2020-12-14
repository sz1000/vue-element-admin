<template>
  <div>
    <Preview>
      <Cell>
        <Pinput title="电话:" placeholder="请输入电话号码"/>
      </Cell>
      <Cell>
        <Pinput title="性别:">
          <el-radio-group v-model="gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </Pinput>
      </Cell>
      <Cell>
        <Pinput title="生日:" placeholder="请选择生日"/>
      </Cell>
      <Cell>
        <Pinput title="手机号:" placeholder="请输入手机号码"/>
      </Cell>
      <Cell>
        <Pinput title="验证码">
          <div class="code">
            <div>
              <input type="text" placeholder="请输入验证码">
            </div>
            <div class="code-getcode">
              获取验证码
            </div>
          </div>
        </Pinput>
      </Cell>

      <Cell v-for="(item,index) in value.customize" :key="index">
        <div class="request">
          <div class="request-container">
            <div class="request-container-title">{{ item.title }}</div>
            <div class="request-answer">{{ item.answer }}</div>
          </div>
          <div class="request-icon">
            <i class="el-icon-arrow-right"/>
          </div>
        </div>
      </Cell>

    </Preview>
  </div>
</template>

<script>
import Preview from '@/components/Preview/index'
import Cell from './Cell'
import Pinput from './P-input'

export default {
  components: {
    Preview,
    Cell,
    Pinput
  },
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      gender: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.code{
  display: flex;
  align-items: center;
  &-getcode{
    width: 65px;
  }
}

.request{
  font-size:  12px;
  color:  #495060;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-container{
    margin-bottom: 2px;
  }
  &-answer{
    font-size: 10px;
  }
  &-icon{
    font-size: 18px;
  }
}
</style>

