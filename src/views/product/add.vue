<template>
  <div>
    <div class="contant-container" style="margin-top:30px;">
      <div class="left-container">
        <TitleTabs text="预览" />
        <div class="sub-container">
          <ProductView :options.sync="options" class="preview" />
        </div>
      </div>
      <!-- 右边了 -->
      <div class="right-container">
        <TitleTabs text="编辑" />
        <div class="sub-container">
          <div class="edit-container1">
            <el-form
              ref="form"
              :rules="rules"
              :model="options"
              class="edit-container"
              label-width="80px"
            >
              <h3>基本信息</h3>
              <el-form-item label="商品名称" prop="name">
                <el-col :span="11">
                  <el-input v-model="options.name" />
                </el-col>
              </el-form-item>

              <el-form-item prop="coverImg" label="封面图片">
                <el-row>
                  <el-col :span="11">
                    <ImgCropper :fixed-number="[1, 1]" :value.sync="options.coverImg" />
                  </el-col>
                  <el-col>
                    <span class="prompt">注：此图片为商品列表的展示图，建议尺寸160*160像素</span>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item prop="contentImgs" label="轮播图">
                <el-row>
                  <el-col :span="11">
                    <ContentImgs :defalut-arr.sync="options.contentImgs" />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row style="margin:-30px 0 20px 80px">
                <el-col>
                  <p class="prompt">
                    提示:
                    1. 至少上传一张图片
                    2. 图片文件大小不能超过2M
                    3.支持JPG，PNG 格式
                    4.建议尺寸750*670像素，不同像素在添加过程会提供等比例图片裁剪功能
                  </p>
                </el-col>
              </el-row>

              <el-form-item label="商品类目">
                <el-row>
                  <el-col :span="6" :sm="20" :md="10" :lg="6">
                    <el-form-item prop="cateId">
                      <el-select
                        v-model="options.cateId"
                        placeholder="请选择一级类目"
                        @change="productTypeChange"
                      >
                        <el-option
                          v-for="(item, index) in productTypeSelect"
                          :key="index"
                          :label="item.value"
                          :value="item.label"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :sm="20" :md="10" :lg="6">
                    <el-form-item prop="cateSubId">
                      <el-select v-model="options.cateSubId" placeholder="请选择二级类目">
                        <el-option
                          v-for="(item, index) in productTypeSelect1"
                          :key="index"
                          :label="item.value"
                          :value="item.label"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col>
                    <p class="prompt">注：一级类目为必填，二级类目可选填</p>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="支付方式" prop="type">
                <!-- 支付方式选择 -->
                <el-row>
                  <el-select v-model="options.type" placeholder="请选择支付方式" @change="priceTypeChange">
                    <el-option
                      v-for="(item, index) in priceTypeSelect"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-row>
              </el-form-item>

              <!-- 子选项 -->
              <div class="priceStyle">
                <el-form-item v-if="options.type === 0 || options.type === 1" label="门店价格">
                  <el-input-number
                    :step="100"
                    :min="0"
                    v-model="oriPrice"
                    size="small"
                    controls-position="right"
                  />
                </el-form-item>

                <el-form-item v-if="options.type === 0 || options.type === 1" label="商品价格" prop="price">
                  <el-input-number
                    :step="100"
                    :min="0"
                    v-model="price"
                    size="small"
                    controls-position="right"
                  />
                </el-form-item>

                <el-form-item v-if="options.type === 2 || options.type === 1" :prop="options.type === 1 ? 'payPrice' : 'price'" label="预约价格">
                  <el-input-number
                    v-if="options.type === 1"
                    v-model="payPrice"
                    :min="0"
                    :step="100"
                    size="small"
                    controls-position="right"/>
                  <el-input-number
                    v-else
                    v-model="price"
                    :min="0"
                    :step="100"
                    size="small"
                    controls-position="right"/>
                </el-form-item>
              </div>

              <el-row>
                <el-col :span="24" style="margin-left:80px;">
                  <p class="prompt">
                    提示:
                    1.全款支付：项目多少钱，顾客就要支付多少钱；如有折扣价，支付折扣价即可；
                    2.预约购买：项目按照预约价格支付，尾款到院线上支付；预约价格不能低于门店或折扣价格的10%；
                    3.仅预约:只支付预约价格，不体现项目的门店价，保护项目价格隐私。
                    4.门店价格可以为空且门店价格不能小于商品价格或预约价格。
                  </p>
                </el-col>
              </el-row>

              <h3>完善信息</h3>
              <el-form-item label="商品规格">
                <el-row>
                  <el-col :span="6">
                    <el-input v-model="options.spec" placeholder="请输入规格名称" />
                  </el-col>

                  <el-col :span="6">
                    <el-select
                      v-model="options.unit"
                      filterable
                      allow-create
                      clearable
                      placeholder="请选择单位"
                      @change="specUnitChange"
                    >
                      <el-option
                        v-for="(item, index) in specUnitSelect"
                        :key="index"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="上架时间" prop="saleEndTime">
                <el-row>
                  <el-col :span="24">
                    <div @click="options.salePolicy = 0">
                      <SelectTimeMonth
                        :start-time="options.createdAt || ''"
                        :end-time="options.saleEndTime"
                        :style="{ opacity: options.salePolicy === 0 ? 1 : 0.5 }"
                        start-key="saleStartTime"
                        end-key="saleEndTime"
                        @send="getData"
                      />
                    </div>
                  </el-col>
                </el-row>
                <div @click="options.salePolicy = 1">
                  <SelecteTime
                    :style="{ opacity: options.salePolicy === 1 ? 1 : 0.5 }"
                    :start-time.sync="options.saleStartTime"
                    :end-time.sync="options.saleEndTime"
                  />
                </div>

                <p class="prompt">
                  提示:
                  1.固定时间：以添加商品的时间为开始时间，接下来固定时间内商品处于上架状态；
                  2.自定义上架时间：在某个时间段商品处于上架状态。
                </p>

              </el-form-item>

              <el-form-item
                :prop="options.validPolicy === 0 ? 'validDays' : 'validEndTime'"
                label="有效日期"
              >
                <el-row>
                  <el-col :span="24">
                    <div
                      :style="{ opacity: options.validPolicy === 0 ? 1 : 0.3 }"
                      @click="options.validPolicy = 0"
                    >
                      <el-radio-group v-model="options.validDays" @change="validSelectMonth">
                        <el-radio-button label="30">一个月</el-radio-button>
                        <el-radio-button label="60">两个月</el-radio-button>
                        <el-radio-button label="90">三个月</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div @click="options.validPolicy = 1">
                      <SelecteTime
                        :style="{ opacity: options.validPolicy === 1 ? 1 : 0.3 }"
                        :start-time.sync="options.validStartTime"
                        :end-time.sync="options.validEndTime"
                        title="自定义有效时间"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="商品详情" prop="detail">
                <el-row style="margin-top:30px">
                  <el-col :span="23">
                    <Tinymce :toolbar="editeToolbar" :value.sync="options.detail" />
                  </el-col>
                </el-row>
              </el-form-item>
             <!-- 分销设置部分 -->
              <el-form-item label="分销设置" prop="distributionset"><br>
                <el-form-item label="参与分配金额(元)" label-width="150px">
              <el-input style="width:100px" v-model="options.distributionset"> </el-input>

             </el-form-item>

              <div class="earning-ratio-item">
            <span>一级用户购买商品提成比例(%)</span>
            <el-input-number v-model="submitsetData.member_divied_level_one" :min="0" :max="100" />
          </div>
          <div class="earning-ratio-item">
            <span>二级用户购买商品提成比例(%)</span>
            <el-input-number v-model="submitsetData.member_divied_level_two" :min="0" :max="100" />
          </div>
              </el-form-item>

              <!-- 其它设置 -->
              <el-form-item label="其它设置" prop="otherset" ><br>

                <p>是否加入到会员套餐（选中后仅在小程序会员套餐区展示）
                  <span>
                    <el-switch
                       v-model="value1"
                        active-color="#13ce66"
                        inactive-color="#C0CCDA">
                    </el-switch>
                  </span>
                  </p>
                 



              </el-form-item>

              <el-button type="primary" style="width:60%; margin:20px 150px;" @click="submitData">保存</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  categories,
  productServe,
  getOneProduct,
  putPruduct
} from '@/api/product'
import TitleTabs from '@/components/TitleTabs'
import Preview from '@/components/Preview'
import Row from '@/components/Row'
import ImgCropper from '@/components/ImgCropper'
import ContentImgs from './components/ContentImgs'
import SelectTimeMonth from './components/SelectTimeMonth'
import SelecteTime from './components/SelecteTime'
import test from './components/test'
import Tinymce from '@/components/Tinymce'
import ProductView from './components/ProductView'
// import moment from 'moment'

import { getDoctorList } from '@/api/product'

import math from 'mathjs'

export default {
  components: {
    TitleTabs,
    Preview,
    Row,
    ImgCropper,
    ContentImgs,
    SelectTimeMonth,
    SelecteTime,
    test,
    Tinymce,
    ProductView
  },
  data() {
     
    const priceValidate = (rule, value, callback) => {
      if (
        this.options.type === 2 &&
        this.options.price !== '' &&
        this.options.price > 0
      ) {
        console.log(
          'TCL: payPriceValidate -> this.options.type',
          this.options.type
        )
        console.log('asdasdasd', this.options.payPrice)
        callback()
      } else if (this.options.type === 2) {
        rule.message = '请输入预约价格'
        callback(rule)
      } else if (this.price > 0) {
        callback()
      } else {
        callback(rule)
      }
    }
    return {
      id: null,
      isSubmit: true,
      value1: true,
      value2:false,
      rules: {
        name: { required: true, message: '请输入商品名称', trigger: 'blur' },
        coverImg: { required: true, message: '请上传封面图', trigger: 'blur' },
        contentImgs: {
          type: 'array',
          required: true,
          min: 1,
          message: '请至少上传一张轮播图'
        },
        cateId: { required: true, message: '请选择一级类目', trigger: 'blur' },
        cateSubId: {
          required: true,
          message: '请选择二级类目',
          trigger: 'blur'
        },
        payPrice: {
          required: true,
          message: '请输入预约价格1',
          type: 'number',
          min: 1,
          trigger: 'blur'
        },
        price: {
          validator: priceValidate,
          required: true,
          message: '请输入商品价格',
          trigger: 'blur'
        },
        type: { required: true, message: '请选择支付方式', trigger: 'blur' },
        saleEndTime: {
          required: true,
          message: '请选择上架时间',
          trigger: 'blur'
        },
        validDays: {
          required: true,
          message: '请选择有效日期',
          trigger: 'blur'
        },
        validEndTime: {
          required: true,
          message: '请选择有效日期',
          trigger: 'blur'
        },
        detail: { required: true, message: '请编写商品详情页', trigger: 'blur' },
        distributionset:{required:true,message:'请输入参与分配金额',trigger:'blur'},
        otherset:{required:true,message:'请选择其它设置',tigger:'blur'}
      },
      options: {
        orgId: 1,
        name: '',
        coverImg: '',
        contentImgs: [],
        salePolicy: 1,
        saleStartTime: '',
        saleEndTime: '',
        cateId: '',
        cateSubId: '',
        spec: '',
        unit: '',
        type: '',
        price: 0,
        oriPrice: null,
        payPrice: 0,
        doctorId: 0,
        validPolicy: 1,
        validDays: 0,
        validStartTime: '',
        validEndTime: '',
        detail: '',
        // 分销设置
        distributionset:'298',
        // 其它设置
        otherset:'',
        desc: ''
      },
       submitsetData: {
        member_divied_level_one: '',
        member_divied_level_two: '',
        product_divied_level_one: '',
        product_divied_level_two: ''
  
      },
      productTypeSelect: [],
      productTypeSelect1: [],
      spec: '',
      specUnit: '',
      specUnitSelect: [
        {
          value: 'ML'
        },
        {
          value: 'L'
        },
        {
          value: '次'
        },
        {
          value: '部位'
        }
      ],
      priceTypeSelect: [
        {
          value: 0,
          label: '全款支付'
        },
        {
          value: 1,
          label: '预约购买'
        },
        {
          value: 2,
          label: '预约'
        }
      ],
      doctorList: [],
      disPrice: '',
      editeToolbar: [
        'bold italic strikethrough | emoticons forecolor backcolor | alignleft aligncenter alignright |cut copy paste | undo redo removeformat'
      ],
      username: 'asdads',
      test: 'test',
      oprions: {},
      pp: 'changData'
    }
  },
  computed: {
    price: {
      get: function(value) {
        if (this.options.price == null) {
          return null
        } else {
          return math.round(math.dotDivide(this.options.price || 0, 100), 2)
        }
      },
      set: function(params) {
        console.log('TCL: params', params)
        this.options.price = math.fix(params * 100)
      }
    },
    oriPrice: {
      get: function(value) {
        console.log('this.options.price', this.options.price)
        if (this.options.price == null) {
          return null
        } else {
          return math.round(math.dotDivide(this.options.oriPrice || 0, 100), 2)
        }
      },
      set: function(params) {
        console.log('TCL: params', params)
        if (params == undefined) {
          this.options.oriPrice = null
        } else {
          this.options.oriPrice = math.fix(params * 100)
        }
      }
    },
    payPrice: {
      get: function(value) {
        return math.round(math.dotDivide(this.options.payPrice || 0, 100), 2)
      },
      set: function(params) {
        this.options.payPrice = math.fix(params * 100)
      }
    }
  },
  watch: {
    spec: function(value) {
      // this.options.spec = value
      const strArr = this.options.spec.split('-')
      this.options.spec = value + '-' + strArr[strArr.length - 1]
      console.log(this.options.spec)
    }
  },
  async mounted() {
    console.log(this.$route)
    this.getdoctorList()
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      const productData = await getOneProduct(this.$route.params.id)
      console.log('TCL: mounted -> productData', productData)
      const tempData = this.undelinToHump(productData.data)
      this.productTypeChange(tempData.cateId)
      this.options = tempData
      console.log('TCL: mounted -> this.options', this.options)
    }
    const categoriesData = await categories({ level: 1 })
    categoriesData.data.forEach(element => {
      this.productTypeSelect.push({ value: element.name, label: element.id })
    })
  },
  methods: {
    async getdoctorList() {
      const doctorData = await getDoctorList()
      this.doctorList = doctorData.data
      console.log('TCL: getdoctorList -> this.doctorList', this.doctorList)
    },
    getData(data) {
      for (const [key, value] of Object.entries(data)) {
        if (this.options.hasOwnProperty(key)) {
          this.options[key] = value
        } else {
          console.error('没有找到options下对应的KEY：请检查上一级的参数')
        }
      }
    },
    async productTypeChange(e) {
      this.options.cateSubId = ''
      const subset = await categories({ parentId: e })
      const tempArr = new Array(0)
      this.oprions.cateSubId = ''
      subset.data.forEach(element => {
        tempArr.push({
          value: element.name,
          label: element.id
        })
      })
      this.productTypeSelect1 = tempArr
    },
    specUnitChange(e) {
      // const strArr = this.options.spec.split('-')
      // let str = ''
      // strArr.forEach((item, index) => {
      //   if (index < strArr.length - 1) {
      //     str += item
      //   }
      // })
      // str += e ? `-${e}` : ''
      // console.log('TCL: specUnitChange -> str', str)
      // this.options.spec = str
    },
    priceTypeChange(e) {
      this.options.price = 0
      this.options.oriPrice = 0
      this.options.payPrice = 0

      this.disPrice = 0
    },
    disPriceChange(e) {
      if (this.options.type === 2) {
        this.options.price = e
      } else if (this.oprions.type === 1) {
        this.options.price = e
      }
    },
    validSelectMonth(e) {
      this.options.validDays = e
    },
    undelinToHump(obj) {
      console.log(typeof obj)
      if (typeof obj === 'object') {
        const keyArr = Object.keys(obj)
        const valueArr = Object.values(obj)
        const tempArr = []
        keyArr.forEach(value => {
          const tempV = value.replace(/\_(\w)/g, function(all, letter) {
            return letter.toUpperCase()
          })
          tempArr.push(tempV)
        })
        const newObj = {}
        valueArr.forEach((value, index) => {
          newObj[tempArr[index]] = value
        })
        return newObj
      } else {
        console.error('undelinToHump:只接受对象')
      }
    },
    getDetail(e) {
      this.options.detail = e
    },
    async submitData() {
      const _this = this
      console.log('this.oriPrice)', this.options.oriPrice)
      if (this.oriPrice < this.price || this.oriPrice < this.payPrice) {
        if (this.options.type !== 2 && this.options.oriPrice !== null) {
          this.$message.error('门店价格不能小于商品价格或预约价格！')
          return
        }
      }

      this.$refs['form'].validate(async(valid, optios, ca) => {
        if (valid) {
          if (!this.isSubmit) {
            return
          }
          this.isSubmit = false
          console.log(this.options)
          // console.log(JSON.stringify(this.options))
          if (this.options.validPolicy === 0) {
            delete this.options.validStartTime
            delete this.options.validEndTime
          } else if (this.options.validPolicy === 0) {
            delete this.options.validDays
          }
          if (this.id) {
            await putPruduct(this.id, this.options).catch(err => {
              console.error('error', err)
              _this.$message.error('出错了！')
              _this.isSubmit = true
            })
            this.isSubmit = true
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.$router.push({
              path: '/prodect/list'
            })
          } else {
            await productServe('post', this.options).catch(err => {
              console.error('error', err)
              _this.$message.error('出错了！')
              _this.isSubmit = true
            })
            this.isSubmit = true
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.push({
              path: '/prodect/list'
            })
          }
        } else {
          console.log(valid)
          this.$message.error('请完善详细!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 16px;
  font-weight: 800;
  color: #272b36;
  margin: 22px 0;
}
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
    margin: 0 50px;
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
      margin: 12px 24px;
      span {
        margin-right: 57px;
      }
    }
  }
}
.preview {
  width: 240px;
  margin: 0 auto;
  padding-top: 40px;
  padding-left: 60px;
  position: fixed;
  top: 121px;
}

.edit-container {
  padding-left: 30px;
  padding-top: 28px;
}
.edit-row {
  width: 100%;
  display: flex;
}
.timeStyle {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
// .priceStyle {
//   // width: 80%;
//   margin: 12px 0;
//   display: flex;
//   flex-wrap: wrap;
// }
.priceStyle{
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-form-item{
    margin-right: 10px;
  }
}
.prompt {
  color: #596174;
  width: 80%;
  margin-right: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  font-size: 12px;
  text-align: start;
  white-space: pre-line;
}

</style>
