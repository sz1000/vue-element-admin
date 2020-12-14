<template>
  <div style="margin-top:30px;">
    <div class="contant-container">
      <div class="left-container">
        <TitleTabs text="预览"/>
        <div class="sub-container">
          <Preview class="preview">
            <div class="phoneContainer">
              <img :src="submit.headImg ? submit.headImg :'https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png'" class="bigHeadImg">
              <p class="fatherTitle">{{ submit.title ? submit.title : '请在左测输入标题' }}</p>
              <div class="personInfo">
                <img :src="submit.avatar ? submit.avatar : 'https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png'" class="perImg">
                <div class="floatDiv">
                  <p class="perName">{{ submit.authorName ? submit.authorName : '请输入姓名' }}</p>
                  <p class="perTime"> 2019-01-01 </p>
                </div>
              </div>

              <div v-for="(item,index) in submit.content" :key="index">
                <div v-if="item.type === 'img'">
                  <!--图片-->
                  <img :src="item.content.imgUrl" class="addContentImg">
                  <div class="imgIntroduce">
                    <div>
                      <!--图片简介-->
                      <p>
                        <pre class="addTab">{{ item.content.text }}</pre>
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="item.type === 'text'">
                  <div class="addContent">
                    <p>
                      <pre>{{ item.content.text }}</pre>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </preview>
        </div>
      </div>

      <!-- 右边了 -->
      <div class="right-container">
        <TitleTabs text="编辑"/>
        <div class="sub-container">
          <div class="edit-container">
            <el-form ref="from" :model="submit" label-width="120px">
              <el-form-item label="作者名称">
                <el-input v-model="submit.authorName" placeholder="请输入作者名称"/>
              </el-form-item>

              <el-form-item label="作者头像">
                <div class="headimg-container">
                  <div class="defaultImg" @click="changHeadImg(true)">
                    <i v-if="selectHeadImng" class="el-icon-success successIcon"/>
                    <img :src="defaultImg" alt srcset>
                  </div>
                  <div class="defaultImg" @click="changHeadImg(false)">
                    <i v-if="!selectHeadImng" class="el-icon-success successIcon"/>
                    <ImgCropper :fixed-number="[1,1]" :value.sync="tempImg"/>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="标题">
                <el-input v-model="submit.title" maxlength="30" placeholder="请输入标题"/>
                <div>
                  <span class="hint">*30字以内</span>
                </div>
              </el-form-item>

              <el-form-item label="标题文字描述">
                <el-input v-model="submit.headText" maxlength="30" placeholder="请输入标题"/>
                <div>
                  <span class="hint">*30字以内</span>
                </div>
              </el-form-item>

              <el-form-item label="背景图">
                <div style="width:90px">
                  <ImgUpdata :value.sync="submit.headImg" :width="90" :height="90"/>
                </div>
              </el-form-item>

              <el-form-item label="封面图">
                <div class="coverImg">
                  <div>
                    <ImgUpdata :value.sync="submit.coverImg[0]" :width="90" :height="90"/>
                  </div>
                  <div>
                    <ImgUpdata :value.sync="submit.coverImg[1]" :width="90" :height="90"/>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="内容">
                <ImgTextContent :arr="submit.content" />
              </el-form-item>

              <el-form-item label="绑定商品">
                <div :style="{'textAlign': productTitle === '' ? 'center' : ''}" class="bindProducte" @click="handleShowSelect" >
                  {{ productTitle || "+" }}
                  <i class="el-icon-circle-close productClose" @click.stop="handleProductClose"/>
                </div>
              </el-form-item>

            </el-form>
            <el-button type="primary" style="width:100%; margin:50px 0;" @click="submitData('test')">提交</el-button>
          </div>
        </div>
      </div>
    </div>

    <SelectDialog :show.sync="selectDialogShow" type="product" title="选择绑定商品" @change="handleBindProducte" />

  </div>
</template>

<script>
import TitleTabs from '@/components/TitleTabs'
import Row from '@/components/Row'
import ImgCropper from '@/components/ImgCropper'
import ImgTextContent from './components/ImgTextContent'
import ImgUpdata from '@/components/ImgUpdata'
import Preview from '@/components/Preview'
import SelectDialog from '@/components/SelectDialog'

import { postArticlesList, getTargetArticle } from '@/api/articles'

import { undelinToHump } from '@/utils/common'

export default {
  components: {
    TitleTabs,
    Row,
    ImgCropper,
    ImgTextContent,
    Preview,
    ImgUpdata,
    SelectDialog
  },
  data() {
    return {
      id: '',
      test: {
        name: 'asd'
      },
      selectDialogShow: false,
      productTitle: '',
      rules: { name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ] },
      method: 'post',
      type: 0,
      defaultImg: 'https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png',
      tempImg: '',
      selectHeadImng: true,
      submit: {
        orgId: 1, // integer
        title: '',
        headText: '',
        headImg: 'https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png',
        avatar: 'https://img.kodin.cn/S7XfrjixhPJkLnyWN5O0BicNwduLUqul.png',
        authorName: '',
        coverImg: ['', ''],
        productId: 0, // integer
        content: [], // array
        type: 0 // 	0-图文 1-图册
      }
    }
  },
  watch: {
    tempImg: function(imgUrl) {
      this.submit.avatar = imgUrl
    },
    'submit.headImg': function(params) {
      console.log('TCL: params', params)
    }
  },
  mounted() {
    const type = this.$route.params.type
    const id = this.$route.params.id
    const name = this.$route.name
    if (name === 'article-edit') {
      this.method = 'put'
      this.id = id
    }
    this.type = type
    if (id) {
      this.getTarget(id)
    }
  },
  methods: {
    async getTarget(id) {
      const target = await getTargetArticle(id)
      this.submit = undelinToHump(target.data)
      if (this.submit.avatar && this.submit.avatar !== this.defaultImg) {
        this.tempImg = this.submit.avatar
        this.selectHeadImng = false
      }
      if (this.submit.productInfo) {
        this.productTitle = this.submit.productInfo.name
      }
    },
    changHeadImg(data) {
      this.selectHeadImng = data
      if (data) {
        this.submit.avatar = this.defaultImg
      }
    },
    handleProductClose() {
      this.submit.productId = 0
      this.productTitle = ''
    },
    handleShowSelect() {
      this.selectDialogShow = true
    },
    handleBindProducte(productData) {
      this.productTitle = productData.name
      this.submit.productId = productData.id
      this.selectDialogShow = false
    },
    async submitData(formName) {
      postArticlesList(this.submit, this.method, this.id)
        .then(res => {
          this.$message({
            message: this.method === 'put' ? '修改文章成功' : '添加文章成功',
            type: 'success'
          })
          this.$router.push({
            path: '/articels/list'
          })
        })
        .catch(err => {
          console.error(err)
          this.$message({
            message: '提交失败',
            type: 'error'
          })
          return
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.coverImg{
  width: 100%;
  display: flex;
  div{
    width: 90px;
    height: 90px;
    margin-right: 10px;
  }
}
.preview {
  position: fixed;
  width: 240px;
  // top:260px;
  // margin: 0 auto;
  padding-top: 40px;
  padding-left: 110px;
}
.edit-container {
  padding-left: 30px;
  padding-top: 28px;
  width: 30vw;
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
.priceStyle {
  width: 80%;
  margin: -25px 0 30px 56px;
  display: flex;
}
.defaultImg {
  width: 90px;
  height: 90px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  .successIcon {
    color: #409eff;
    position: absolute;
    z-index: 100;
  }
}
.phoneContainer {
  background-color: #ffffff;
  padding-bottom: 20px;
  p {
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .share {
    width: 100%;
    height: 51px;
    line-height: 51px;
    vertical-align: middle;
    font-size: 14px;
    color: #333333;
  }

  .gift {
    width: 21px;
    height: 21px;
    vertical-align: middle;
    margin-left: 18px;
    margin-right: 13px;
    margin-bottom: 5px;
  }

  .inviBtn {
    width: 48px;
    height: 25px;
    text-align: center;
    border-radius: 4px;
    line-height: 25px;
    background-color: #ffffff;
    border: 1px solid #999999;
    float: right;
    margin-top: 13px;
    margin-right: 15px;
  }

  .bigHeadImg {
    width: 100%;
  }

  .fatherTitle {
    margin-top: 22px;
    margin-left: 14px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }

  .personInfo {
    width: 100%;
    margin-top: 20px;
    display: flex;
  }

  .perImg {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin-left: 15px;
  }

  .floatDiv {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-left: 8px;
    p {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  }

  .perName {
    padding-top: 2px;
    color: #000000;
    font-size: 13px;
  }

  .perTime {
    font-size: 10px;
    padding-top: 6px;
    color: #8f8f8f;
  }

  pre {
    width: 100%;
    display: flex;
    white-space: pre-wrap;
    margin: 0;
  }

  .firstContent {
    width: 90%;
    margin: 20px 15px 0px 15px;
    font-size: 15px;
    color: #666666;
    letter-spacing: 1px;
    /* white-space: pre;*/
  }

  .addContent {
    margin: 10px 15px 0px 15px;
    font-size: 15px;
    color: #222222;
    line-height: 21px;
    /*white-space: pre;*/
  }

  .addContentImg {
    width: 100%;
    margin-top: 8px;
  }

  .imgIntroduce {
    width: 100%;
  }

  .imgIntroduce div {
    margin: 0 auto;
    border-bottom: 1px solid #cccccc;
    color: #8f8f8f;
    font-size: 13px;
    height: 100%;
    width: fit-content;
    /* white-space: pre; */
    text-align: center;
    margin-top: 11px;
  }

  .backBtn {
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 20px;
    width: 180px;
    height: 45px;
    background-color: #5297fc;
    border-radius: 90px;
    line-height: 45px;
    color: #ffffff;
    font-size: 14px;
    border: none;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #codeImgBox {
    margin: 0 auto;
    margin-top: 40px;
    width: 245px;
    height: 245px;
    border-radius: 5px;
    box-shadow: #cccccc 0px 0px 10px;
    text-align: center;
  }

  .codeImg {
    margin-top: 43px;
    width: 104px;
    height: 104px;
  }

  .pressCode {
    margin-top: 10px;
    font-size: 17px;
  }

  .lookMore {
    margin: 2px auto;
    font-size: 13px;
  }
  .contentContaiter {
    padding-bottom: 20px;
  }
}
.formStyle{
  .el-form-item__label{
   color: red;
  }
}

.bindProducte{
  width: 100%;
  height: 30px;
  background: #fff;
  border-radius: 4px;
  border: 1px #00000020 solid;
  color: #596174;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  position: relative;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
.productClose{
  position: absolute;
  z-index: 100;
  right: 0px;
  top: 0px;
  color: #c9cacc;
}

.headimg-container{
  display: flex;
  flex-wrap: wrap;

  .defaultImg{
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.hint{
  font-size: 14px;
  color: #596174;
  line-height: 14px;
}
</style>
