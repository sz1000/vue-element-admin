<template>
  <div>
    <div
      class="contant-container"
      style="margin: 50px auto; overflow: hidden; padding-bottom:50px;"
    >
      <div class="left-container">
        <TitleTabs text="新建拼团"/>
        <div class="sub-container">
          <el-form ref="form" :rules="rules" :model="submitData" class="form-container" label-width="120px">

            <h3>基本信息</h3>

            <el-form-item label="活动名称" prop="name">
              <el-input v-model="submitData.name" placeholder="请输入活动名称"/>
            </el-form-item>

            <el-form-item prop="act_pic" label="活动图片">
              <ImgCropper :value.sync="submitData.act_pic" :fixed-number="[1,1]"/>
            </el-form-item>

            <el-form-item prop="start_time" label="活动时间">
              <el-date-picker
                v-model="submitData.start_time"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="开始时间"/>
              <span>-</span>
              <el-date-picker
                v-model="submitData.end_time"
                :picker-options="endTimeOptions"
                :disabled="submitData.start_time === ''"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="结束时间"/>
            </el-form-item>

            <el-form-item prop="product_id" label="活动商品">
              <div @click="SelectDialogShow = true">
                <ProductCard :value="productItem" class="ppppp"/>
              </div>
            </el-form-item>

            <el-form-item prop="act_limit" label="活动限购">
              <el-input-number :min="0" v-model="submitData.act_limit" placeholder="请输入限购次数"/>
            </el-form-item>

            <el-form-item label="活动说明">
              <el-input v-model="submitData.intro" type="textarea" placeholder="请输入内容"/>
            </el-form-item>

            <h3>高级设置</h3>

            <el-form-item prop="group_people_num" label="团购人数">
              <el-input :min="0" :max="10" v-model="submitData.group_people_num" type="number" placeholder="请输入团购人数">
                <span slot="suffix">人 </span>
              </el-input>
            </el-form-item>

            <el-form-item prop="group_price" label="团购价格">
              <el-input v-model="submitData.group_price" min="0" type="number" placeholder="请输入团购价格">
                <span slot="suffix">元 </span>
              </el-input>
            </el-form-item>

            <el-form-item prop="valid_time" label="团购有效时间">
              <el-input v-model="submitData.valid_time" min="1" type="number" placeholder="请输入有效时间">
                <span slot="suffix">小时 </span>
              </el-input>
            </el-form-item>

            <el-button style="width:100%" type="primary" @click="handleSubmite">提交</el-button>
          </el-form>

        </div>
      </div>
    </div>

    <SelectDialog
      :show.sync="SelectDialogShow"
      :params="{type:0,isCustomer:1,onSale:1}"
      type="product"
      title="请选择拼团商品"
      @change="handleSelectProduct"
    />
  </div>
</template>

<script>
import TitleTabs from '@/components/TitleTabs'
import ImgCropper from '@/components/ImgCropper'

import ProductCard from '@/components/ProductCard'
import SelectDialog from '@/components/SelectDialog'

import { postBuying, getBuying } from '@/api/groupBuying'
import moment from 'moment'

export default {
  components: {
    TitleTabs,
    ImgCropper,
    ProductCard,
    SelectDialog
  },
  props: {
    id: {
      type: [Number, String],
      required: false,
      default: 0
    }
  },
  data() {
    const _this = this
    return {
      productItem: {},
      endTimeOptions: {
        disabledDate(time) {
          return time.getTime() <= moment(_this.submitData.start_time)._d.getTime()
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 86400000)
        }
      },
      value1: '',
      SelectDialogShow: false,
      gPrice: '123',
      submitData: {
        name: '',
        act_pic: '',
        start_time: '',
        end_time: '',
        product_id: 0,
        act_limit: null,
        intro: '',
        group_people_num: null,
        group_price: null,
        valid_time: null
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        act_pic: [
          { required: true, message: '请上传活动图片', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请输入开始时间', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '请输入结束时间', trigger: 'blur' }
        ],
        product_id: [
          { required: true, message: '请选择活动商品', trigger: 'blur' }
        ],
        act_limit: [
          { required: true, message: '请输入活动限购次数', trigger: 'blur' }
        ],
        group_people_num: [
          { required: true, message: '请输入团购人数', trigger: 'blur' }
        ],
        group_price: [
          { required: true, message: '请输入团购价格', trigger: 'blur' },
          { required: true, message: '团购价必须大于零', trigger: 'blur', validator(rule, value, callback) {
            if (value < 0) {
              callback(false)
            } else {
              return callback()
            }
          } }
        ],
        valid_time: [
          { required: true, message: '请输入有效时间', trigger: 'blur' },
          { required: true, message: '有效时间必须为整数', trigger: 'blur', validator(rule, value, callback) {
            if (value == parseInt(value)) {
              callback()
            } else {
              return callback(false)
            }
          } },
          { required: true, message: '团购有效时间必须大于等于1', trigger: 'blur', validator(rule, value, callback) {
            if (value >= 1) {
              callback()
            } else {
              return callback(false)
            }
          } }
        ]
      }
    }
  },
  mounted() {
    console.log('TCL:this.id', this.id)
    // console.log('TCL:time',)

    if (this.id !== '0') {
      this.initData(this.id)
    }
  },
  methods: {
    async initData(id) {
      const serveData = await getBuying(id).catch((err) => {
        console.err(err)
        return
      })
      console.log('TCL: initData -> serveData', serveData)
      this.productItem = serveData.data.productInfo
      serveData.data.group_price = serveData.data.group_price ? serveData.data.group_price / 100 : serveData.data.group_price
      this.submitData = serveData.data
    },
    handleSelectProduct(e) {
      console.log('TCL: handleSelectProduct -> e', e)
      this.productItem = e
      this.submitData.product_id = e.id
    },
    handleProduct() {
      console.log('asdads')
    },
    handleDisableDate(date) {
      console.log('TCL: handleDisableDate -> date', date)
      return false
    },
    handleSubmite() {
      console.log('asdasdasd----====')
      this.$refs['form'].validate((valid) => {
        console.log('TCL: handleSubmite -> valid', valid)

        if (valid) {
          this.submitData.group_price = this.submitData.group_price * 100
          console.log('准备提交', this.submitData)
          postBuying(this.submitData, this.id).then((res) => {
            console.log(res)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$router.push('/goupbuying/list')
          }).catch((err) => {
            this.submitData.group_price /= 100
            console.error('提交团购活动出错', err.response)
            this.$message.error(err.response.data.msg)
          })
        } else {
          console.log('error submit!!')
          // this.submitData.group_price /= 100
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left-container {
  width: 100%;
}
.form-container {
  padding: 20px 0;
  width: 40%;
  margin-left: 60px;
  h3 {
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 30px;
  }
}
</style>

