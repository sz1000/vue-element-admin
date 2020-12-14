<template>
  <div>
    <div
      class="contant-container"
      style="margin: 50px auto; overflow: hidden; padding-bottom:50px;"
    >
      <div class="left-container">
        <TitleTabs text="预览" />
        <div class="sub-container">
          <div class="sub-position">
            <Preview class="preview">
              <div class="doctor">
                <div class="doctor-intro">
                  <div class="doctor-intro-container">
                    <div class="doctor-intro-headimg">
                      <img :src="submit.avatar" alt="" srcset="" >
                    </div>
                    <div class="doctor-intro-name">
                      <p>{{ submit.name ? submit.name : "医生姓名" }}</p>
                    </div>
                    <div class="doctor-intro-title">
                      <p>{{ submit.title ? submit.title : "医生职位" }}</p>
                    </div>
                    <div class="doctor-intro-tags">
                      <div v-for="(item, index) in submit.tags" :key="index">
                        {{ item }}
                      </div>
                    </div>
                    <div class="doctor-intro-datum">
                      <div class="datum-item" @click="doctorMsk('text')">
                        <img src="@/assets/datum.png" alt="" srcset="">
                        <p>医生简介</p>
                      </div>
                      <div class="datum-item" @click="doctorMsk('arr','certImg')">
                        <img src="@/assets/datum.png" alt="" srcset="" >
                        <p>医生资格证</p>
                      </div>
                      <div class="datum-item" @click="doctorMsk('arr','workImg')" >
                        <img src="@/assets/datum.png" alt="" srcset="" >
                        <p>医生执业证</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="doctor-detail">
                  <div class="doctor-detail-header">
                    <div class="herder-active">相关案例</div>
                    <div>5问5答</div>
                    <div>明星项目</div>
                  </div>
                  <div class="doctor-detail-case">
                    <div class="doctor-detail-title">
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                      <div>
                        <P>相关案例</P>
                      </div>
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                    </div>
                    <div>
                      <PhoneArticle
                        v-for="(item, index) in articlesInfo"
                        :value="item"
                        :key="index"
                      />
                    </div>
                  </div>
                  <div class="doctor-detail-case">
                    <div class="doctor-detail-title">
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                      <div>
                        <P>5问5答</P>
                      </div>
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                    </div>
                    <div
                      v-for="(item,index) in submit.questions"
                      :key="index"
                      class="doctor-detail-questions"
                    >
                      <div class="doctor-detail-questions-question">
                        <i class="el-icon-question icon-question"/>
                        <span>{{ item.question }}</span>
                      </div>
                      <div class="doctor-detail-questions-answer">
                        <span style="color:#2C7FFE">医生解析:</span>
                        <span>
                          {{ item.answer }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="doctor-detail-case">
                    <div class="doctor-detail-title">
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                      <div>
                        <P>明星项目</P>
                      </div>
                      <div>
                        <img src="@/assets/titleIcon.png" alt="" srcset="" >
                      </div>
                    </div>
                    <div
                      class="doctor-detail-dc"
                    >
                      <PhoneProduct
                        v-for="(item,index) in productsInfo"
                        :key="index"
                        :value="item"
                      />
                    </div>
                  </div>
                </div>
                <PhoneDialog
                  :show="showCert"
                >
                  <div class="doctorMskContainer">
                    <div class="doctorMskTop">
                      <img src="../../assets/doctorMskTop.png" alt="" srcset="">
                    </div>
                    <div class="doctorMskContent">
                      <div v-if="doctorMskArr.type === 'arr'" class="doctorImgArrContaienr">
                        <div class="doctorImgItem">
                          <img :src="doctorMskArr.content[0]" alt="" srcset="">
                        </div>
                        <div class="doctorImgItem">
                          <img :src="doctorMskArr.content[1]" alt="" srcset="">
                        </div>
                      </div>
                      <div v-if="doctorMskArr.type === 'text'">
                        {{ doctorMskArr.content }}
                      </div>
                    </div>
                  </div>
                  <span class="el-icon-error doctorMskErr" @click="showCert = false"/>

                </PhoneDialog
                >
              </div>
            </Preview>
          </div>
        </div>
      </div>
      <div class="right-container">
        <TitleTabs text="内容" />
        <div class="sub-container">
          <div class="sub-position">
            <el-form
              ref="submit"
              :rules="rules"
              :model="submit"
              class="formBox"
              label-position="left"
              label-width="90px"
            >
              <h2>基本信息</h2>
              <el-form-item label="姓 名:" prop="name">
                <el-input v-model="submit.name" />
              </el-form-item>
              <el-form-item label="照 片:" prop="avatar">
                <ImgCropper
                  :value.sync="submit.avatar"
                  :fixed-number="[1, 1]"
                />
              </el-form-item>
              <el-form-item label="性 别:" prop="gender">
                <el-select v-model="submit.gender">
                  <el-option
                    v-for="(item, index) in genderOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="来自医院:" prop="hospital">
                <el-input v-model="submit.hospital" />
              </el-form-item>
              <el-form-item label="职 位:" prop="title">
                <el-input v-model="submit.title" />
              </el-form-item>
              <el-form-item label="擅长项目:" prop="tags">
                <div>
                  <DynamicTags :tag-arr.sync="submit.tags" text="+ 添加项目" />
                </div>
              </el-form-item>
              <el-form-item label="预约数:" prop="reserveNum">
                <el-input-number :min="0" v-model="submit.reserveNum" />
              </el-form-item>
              <el-form-item label="案例数:" prop="caseNum">
                <el-input-number :min="0" v-model="submit.caseNum" />
              </el-form-item>
              <h2>完善信息</h2>
              <el-form-item label="医生简介:" prop="intro">
                <el-input v-model="submit.intro" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="医生资格证:">
                <div class="imglist">
                  <el-form-item prop="certImg" class="imglist-item">
                    <ImgCropper :value.sync="submit.certImg" />
                    <p class="imglist-item-text">正面</p>
                  </el-form-item>
                  <el-form-item prop="certImgBk" class="imglist-item">
                    <ImgCropper :value.sync="submit.certImgBk" />
                    <p class="imglist-item-text">反面</p>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="医生执业证:">
                <div class="imglist">
                  <el-form-item prop="workImg" class="imglist-item">
                    <ImgCropper :value.sync="submit.workImg" />
                    <p class="imglist-item-text">正面</p>
                  </el-form-item>
                  <el-form-item prop="workImgBk" class="imglist-item">
                    <ImgCropper :value.sync="submit.workImgBk" />
                    <p class="imglist-item-text">反面</p>
                  </el-form-item>
                </div>
              </el-form-item>
              <h2>关联信息</h2>
              <el-form-item label="相关案例" prop="articles">
                <div
                  v-for="(item, index) in articlesInfo"
                  :key="index"
                  class="titlshow"
                >
                  {{ item.title }}
                  <i
                    class="el-icon-circle-close titlshow-close"
                    @click="deletArticle(index)"
                  />
                </div>

                <SelectDialog
                  :show.sync="selArticlesShow"
                  type="article"
                  @change="articlesChang"
                />
                <div class="titlshow titlshow-add" @click="addArticle">
                  +
                </div>
              </el-form-item>
              <el-form-item label="明星项目" prop="products">
                <div
                  v-for="(item, index) in productsInfo"
                  :key="index"
                  class="titlshow"
                >
                  {{ item.name }}
                  <i
                    class="el-icon-circle-close titlshow-close"
                    @click="deletProduct(index)"
                  />
                </div>

                <SelectDialog
                  :show.sync="selProductShow"
                  type="product"
                  @change="productChang"
                />
                <div class="titlshow titlshow-add" @click="addProduct">
                  +
                </div>
              </el-form-item>
              <el-form-item label="常见问答">
                <div
                  v-if="submit.questions.length !== 0"
                  style="margin-top:30px"
                >
                  <el-form
                    v-model="submit.questions"
                    label-position="left"
                    label-width="50px"
                  >
                    <div
                      v-for="(item, index) in submit.questions"
                      :key="index"
                      class="question-box"
                    >
                      <i
                        class="el-icon-circle-close question-close"
                        @click="deleteQuestion(index)"
                      />
                      <el-form-item label="问题:" prop="question">
                        <el-input v-model="item.question" size="small" />
                      </el-form-item>
                      <el-form-item label="答案:">
                        <el-input
                          v-model="item.answer"
                          type="textarea"
                          size="small"
                        />
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
                <div class="titlshow titlshow-add" @click="addQuestion">
                  +
                </div>
              </el-form-item>
            </el-form>
            <el-button
              type="primary"
              style="width:50%"
              @click="requestHandle"
            >提交</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Row from '@/components/Row'
import TitleTabs from '@/components/TitleTabs'
import ImgCropper from '@/components/ImgCropper'
import DynamicTags from './components/DynamicTags'
import SelectDialog from '@/components/SelectDialog'
import Preview from '@/components/Preview'
import PhoneDialog from '@/components/phone/dialog'
import PhoneArticle from '@/components/phone/article'
import PhoneProduct from '@/components/phone/product'

// import { productList } from '@/api/product'
// import { getArticlesList } from '@/api/articles    '
import { addDoctor, getTargetDoctor, putTargetDoctor } from '@/api/doctor'

import { undelinToHump } from '@/utils/common'

export default {
  components: {
    Row,
    TitleTabs,
    ImgCropper,
    DynamicTags,
    SelectDialog,
    Preview,
    PhoneDialog,
    PhoneArticle,
    PhoneProduct
  },
  data() {
    return {
      showCert: false,
      type: '',
      articlesInfo: [],
      productsInfo: [],
      selProductShow: false,
      selArticlesShow: false,
      genderOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传照片', trigger: 'change' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        reserveNum: [{ message: '请输入整数', type: 'integer' }],
        caseNum: [{ message: '请输入整数', type: 'integer' }],
        hospital: [
          { required: true, message: '请输入来自的医院', trigger: 'blur' }
        ],
        title: [{ required: true, message: '请输入医生职位', trigger: 'blur' }],
        tags: [{ required: true, message: '请添加擅长项目', trigger: 'blur' }],
        question: [{ required: true, message: '请输入问题', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入回答', trigger: 'blur' }]
      },
      rulesQuestion: {
        question: [{ required: true, message: '请输入问题', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入回答', trigger: 'blur' }]
      },
      doctorMskArr: {},
      submit: {
        name: '',
        avatar: '',
        gender: '',
        hospital: '',
        tags: [],
        reserveNum: 0,
        caseNum: 0,
        intro: '',
        certImg: '',
        certImgBk: '',
        workImg: '',
        workImgBk: '',
        articles: [],
        products: [],
        questions: []
      }
    }
  },
  watch: {
    articlesInfo: {
      handler: function(val) {
        const tempArr = []
        val.forEach((item, index) => {
          tempArr.push(item.id)
        })
        this.submit.articles = tempArr
      },
      deep: true
    },
    productsInfo: {
      handler: function(val) {
        const tempArr = []
        val.forEach((item, index) => {
          tempArr.push(item.id)
        })
        this.submit.products = tempArr
      },
      deep: true
    }
  },
  async mounted() {
    console.log(this.$route)
    this.type = this.$route.name
    this.initData(this.$route.params.id)
  },
  methods: {
    async initData(index) {
      if (index) {
        const serveData = await getTargetDoctor(index)
        const formaData = undelinToHump(serveData.data)
        this.articlesInfo = formaData.articlesInfo
        this.productsInfo = formaData.productsInfo
        delete formaData.articlesInfo
        delete formaData.productsInfo
        console.log(typeof formaData.tagArr)
        formaData.tags = formaData.tags ? formaData.tags : []
        this.submit = formaData
        console.log('TCL: initData -> serveData', serveData)
      }
    },
    requestHandle() {
      console.log('消息', this.submit)
      this.$refs['submit'].validate(valid => {
        console.log('TCL: requestHandle -> valid', valid)
        if (valid) {
          if (this.type === 'addDoctor') {
            addDoctor(this.submit).then(res => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              })
              this.$router.push({
                path: '/doctor/list'
              })
            })
          } else if (this.type === 'editDoctor') {
            putTargetDoctor(this.$route.params.id, this.submit).then(res => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.$router.push({
                path: '/doctor/list'
              })
            })
          }
        } else {
          console.log('error submit!!')
          this.$message.error('请完善信息！')
          return false
        }
      })
    },
    deleteQuestion(index) {
      this.submit.questions.splice(index, 1)
    },
    addQuestion() {
      if (this.submit.questions.length < 5) {
        const questionObg = {
          question: '',
          answer: ''
        }
        this.submit.questions.push(questionObg)
      } else {
        this.$message.error('最多添加五条问答')
      }
    },
    deletProduct(index) {
      this.productsInfo.splice(index, 1)
    },
    addProduct() {
      if (this.submit.products.length < 2) {
        this.selProductShow = true
      } else {
        this.$message.error('最多只能添加两个商品')
      }
    },
    productChang(data) {
      if (this.submit.products.length < 2) {
        this.productsInfo.push(data)
      } else {
        this.$message.error('最多只能添加两个商品')
      }
    },
    articlesChang(data) {
      console.log('TCL: articlesChang -> data', data)
      if (this.submit.articles.length < 2) {
        this.articlesInfo.push(data)
      } else {
        this.$message.error('最多只能添加两个案例')
      }
    },
    deletArticle(index) {
      this.articlesInfo.splice(index, 1)
    },
    addArticle() {
      if (this.submit.articles.length < 2) {
        this.selArticlesShow = true
      } else {
        this.$message.error('最多只能添加两个案例')
      }
    },
    doctorMsk(type, showData) {
      const tempObj = { type }
      if (type === 'text') {
        tempObj.content = this.submit.intro
      } else if (type === 'arr') {
        tempObj.content = [this.submit[showData], this.submit[`${showData}Bk`]]
      }
      this.doctorMskArr = tempObj
      this.showCert = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 0px;
  min-height: auto;
}
.doctorImgItem{
  margin-bottom: 10px;
  border-radius: 4px;
  width: 100%;
  height: 90.6px;
  background: #BFBFBF;
  overflow: hidden;
  img{
    width: 100%;
    height: auto;
  }
}

.doctorMskErr{
  width: 20px;
  height: 20px;
  color: #fff;
  margin: 0 auto;
  font-size: 20px;
  margin-top:10px;
  display:block;
}
.doctorMskContainer{
  width: 80%;
  height: 300px;
  margin-top:10%;
  margin-left:auto;
  margin-right:auto;
  background: #fff;
  border-radius: 10px;
}

.doctorMskContent{
  padding: 8px;
  font-size: 12px;
}

.doctorMskTop{
  width: 100%;
  img{
    width: 100%;
    height: auto;
  }
}

.addRat {
  color: #409eff;
  width: 20px;
  font-size: 20px;
  margin-left: 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.formBox {
  padding-top: 40px;
  margin-left: 30px;
  width: 450px;
}
h2 {
  font-size: 18px;
  color: #596174;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-bottom: 30px;
}
.imglist {
  width: 100%;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  &-item {
    margin: 20px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      text-align: center;
      margin-block-start: 0em;
      margin-block-end: 0em;
      line-height: 25px;
    }
  }
}
.titlshow {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: #ffffff;
  // border: 1px solid #dcdfe6;
  line-height: 20px;
  padding: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 6px 0;
  &-close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    color: #596174;
  }
  &-add {
    text-align: center;
    font-size: 18px;
    color: #596174;
    cursor: pointer;
  }
}
.question-box {
  position: relative;
  margin: 20px 0;
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  .question-close {
    position: absolute;
    right: 0px;
    top: 0px;
    color: #596174;
    cursor: pointer;
  }
}
.preview {
  position: fixed;
  width: 240px;
  padding-top: 40px;
  padding-left: 70px;
}

.doctor {
  $ratio: 0.333; //设计稿比例
  width: 100%;
  &-intro {
    width: 100%;
    height: $ratio * 690px;
    background: #596174;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &-container {
      position: relative;
      width: $ratio * 708px;
      min-height: $ratio * 570px;
      background: #fff;
      margin-top: $ratio * 88px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    &-headimg {
      width: $ratio * 143.6px;
      height: $ratio * 143.6px;
      border-radius: 50%;
      border: 3px solid #fff;
      overflow: hidden;
      margin: -24px auto 0 auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    &-name {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
    }
    &-title {
      display: flex;
      justify-content: center;
      margin: 0;
      p {
        background: #f5f5f5;
        display: inline;
        padding: 6px;
        border-radius: 16px;
        font-size: 10px;
        color: #888888;
      }
    }
    &-tags {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 10px;
      div {
        background: #5295fc;
        color: #fff;
        font-size: 10px;
        padding: 4px 6px;
        border-radius: 16px;
        margin: 2px 4px;
      }
    }
    &-datum {
      margin-top: 20px;
      width: 94%;
      border-top: 1px solid #eeeeee;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 8px;
      }
      img {
        width: 18px;
        height: auto;
      }
      .datum-item {
        margin: 8px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  &-detail {
    border: 1px solid #fff;
    background: #F3F4F5;
    padding-bottom: 10px;
    &-header {
      background: #fff;
      width: 100%;
      display: flex;
      border-bottom: 1px solid #eeeeee;
      .herder-active {
        color: #5295fc;
        border-bottom: 2px solid #5295fc;
        padding-bottom: 8px;
      }
      div {
        font-size: 10px;
        color: #888888;
        margin: 12px 6px 0px 6px;
        // padding-bottom: 4px;
      }
    }
    &-case {
      background: #fff;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    &-title {
      display: inline;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      margin: 10px auto;
      p {
        margin: 0 10px;
      }
      img {
        width: $ratio * 30px;
        height: auto;
      }
    }
    &-questions{
      width: 96%;
      margin: 0 auto;
      padding-bottom: 16px;
      .icon-question{
        font-size: 14px;
        color:#2C7FFE;
        line-height: 18px;
        margin-right: 4px;
      }
      &-question{
        display: flex;
        // justify-content: space-between;
        font-size:12px;
        font-weight: 600;
        line-height: 18px;
      }
      &-answer{
        font-size: 10px;
        line-height: 16px;
        margin:6px 0px 4px 17px;
        color:#666666;
        text-align: justify;
        padding-bottom: 10px;
        border-bottom: 1px solid #EEEEEE
      }
    }
  }
}
</style>
