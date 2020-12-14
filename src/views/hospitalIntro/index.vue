<template>
  <div style="margin-top:30px">
    <div class="contant-container">
      <div class="left-container">
        <TitleTabs text="预览" />
        <div class="sub-container">
          <Preview class="preview">
            <div class="topBar">
              <div class="topBar-hover">简介</div>
              <div>医生</div>
              <div>案例</div>
            </div>
            <el-carousel
              indicator-position="none"
              class="slideshowContainer"
              arrow="hover"
              height="223px"
            >
              <div v-for="(item,index) in submitData.slideshowArr" :key="index">
                <el-carousel-item v-if="item">
                  <img :src="item" alt="" srcset="" >
                </el-carousel-item>
              </div>
            </el-carousel>
            <div>
              <PhoneTitle title-name="医院简介">
                <div class="tinymceStyle" v-html="submitData.content" />
              </PhoneTitle>
            </div>
          </Preview>
        </div>
      </div>
      <!-- 右边了 -->
      <div class="right-container">
        <TitleTabs text="编辑" />
        <div class="sub-container">
          <el-form
            ref="submitData"
            :model="submitData"
            :rules="rules"
            class="edit-container"
            label-width="96px"
            label-position="left"
          >
            <el-form-item prop="slideshowArr" label="轮博图">
              <div class="slideshow">
                <ImgCropper
                  v-for="(item, index) in submitData.slideshowArr"
                  :key="index"
                  :fixed-number="[750, 670]"
                  :value.sync="submitData.slideshowArr[index]"
                  class="slideshow-item"
                />
              </div>
              <div class="tip">
                <p class="tip-title">提示:</p>
                <div class="tip-content">
                  <p>1. 至少上传一张图片</p>
                  <p>2. 图片文件大小不能超过2M</p>
                  <p>3.支持JPG，PNG 格式</p>
                  <p>4.建议尺寸750*670像素，不同像素在添加过程会提供等比例图片裁剪功能</p>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="content" label="医院简介">
              <Tinymce :value.sync="submitData.content" class="tinymce" />
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            prop="content"
            style="width:100%; margin:50px 0;"
            @click="submitHendle('submitData')"
          >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTabs from '@/components/TitleTabs'
import ImgCropper from '@/components/ImgCropper'
import Tinymce from '@/components/Tinymce'
import Preview from '@/components/Preview'
import PhoneTitle from '@/components/Phone/Title'
import { getIntro, postIntro } from '@/api/intro'

export default {
  components: {
    TitleTabs,
    ImgCropper,
    Tinymce,
    Preview,
    PhoneTitle
  },
  data() {
    var slideshowVal = (rule, value, callback) => {
      var count = 0
      value.forEach((item, index) => {
        if (item) {
          count += 1
        }
      })
      console.log(count)
      if (count === 0) {
        callback(false)
      } else {
        callback()
      }
    }
    return {
      rules: {
        slideshowArr: [
          {
            required: true,
            message: '至少需要上传一张照片',
            validator: slideshowVal,
            trigger: 'blur'
          }
        ],
        content: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      submitData: {
        slideshowArr: [null, null, null, null],
        content: ''
      }
    }
  },
  async mounted() {
    const introServe = await getIntro()
    console.log('TCL: mounted -> data', introServe)
    if (introServe.data !== null) {
      this.submitData = introServe.data
    }
  },
  methods: {
    submitHendle(formName) {
      console.log('提交')
      const _this = this
      this.$refs[formName].validate(valid => {
        console.log('TCL: submitHendle -> valid', valid)
        if (valid) {
          postIntro(_this.submitData).then((res) => {
            _this.$message({
              type: 'success',
              message: '提交成功！请前往小程序查看'
            })
          }).catch(err => {
            console.error(err)
            _this.$message.error('出错了')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding-left: 30px;
  padding-top: 28px;
}
.slideshow {
  width: 100%;
  display: flex;
  &-item {
    margin-right: 10px;
  }
}
.tinymce {
  margin-top: 32px;
  margin-right: 30px;
}
.slideshowContainer {
  width: 100%;
  // background: red;
  img {
    width: 100%;
    height: auto;
  }
}
.topBar {
  width: 100%;
  color: #888888;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  &-hover {
    color: #7dc2ab;
    padding-bottom: 6px;
    border-bottom: 2px solid #7dc2ab;
  }
}
.preview {
  position: fixed;
  top: 180px;
  margin-left: 94px;
}
</style>

