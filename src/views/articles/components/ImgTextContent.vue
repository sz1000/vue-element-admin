<template>
  <div class="content">
    <div v-for="(item,index) in content" :key="index">
      <div v-if="item.type === 'text'" class="textContainer">
        <div class="closeBnt" @click="deleteItem(index)">
          <i class="el-icon-circle-close-outline"/>
        </div>
        <el-input
          v-model="item.content.text"
          type="textarea"
          rows="3"/>
      </div>
      <div v-if="item.type === 'img'" class="imgContainer">
        <div class="closeBnt" @click="deleteItem(index)">
          <i class="el-icon-circle-close-outline"/>
        </div>
        <img :src="item.content.imgUrl" alt="" srcset="">
        <input v-model="item.content.text" placeholder="图片描述" class="imgText" type="text">
      </div>
    </div>

    <div class="addContainer">
      <div class="addBtn" @click="addText">
        <i class="el-icon-picture-outline"/>
        <span>文字</span>
      </div>
      <span class="line"/>
      <div class="addBtn">
        <el-upload
          :show-file-list="false"
          :data="qiniuData"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          action="https://upload.qiniup.com"
        >
          <i class="el-icon-edit-outline"/>
          <span>图片</span>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { getQiniuToken } from '@/api/common.js'
import rondToken from 'rand-token'
export default {
  props: {
    arr: {
      type: Array,
      required: true
    },
    headImg: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      qiniuData: {
        key: '',
        token: '',
        config: {},
        putExtra: {}
      },
      fileList: [],
      compositionEnd: false
      // content: []
    }
  },
  computed: {
    content: function(params) {
      if (this.arr.length > 0) {
        const item = this.arr.find((element) => {
          return element.type === 'img'
        })
        if (item) {
          this.$emit('imgData', item.content.imgUrl)
        }
      }
      return this.arr
    }
  },
  methods: {
    addText() {
      const content = {
        'content': {
          'text': ''
        },
        'type': 'text'
      }
      this.content.push(content)
    },
    addImg(imgUrl) {
      const content = {
        'content': {
          'imgUrl': imgUrl,
          'text': ''
        },
        'type': 'img'
      }
      if (imgUrl) {
        this.content.push(content)
      }
    },
    deleteItem(index) {
      this.content.splice(index, 1)
    },
    handleSubmit() {
      this.content
      console.log('提交')
    },
    handleSuccess(response, file) {
      const imgUrl = process.env.QINIU_URL + '/' + response.key
      this.addImg(imgUrl)
    },
    handleError(err, file, fileList) {
      console.error(err)
      console.log(file)
      this.$message({
        message: '上传图片失败！请重试',
        type: 'error'
      })
    },
    async beforeUpload(file) {
      const tokenServe = await getQiniuToken()
      this.qiniuData.token = tokenServe.data.token
      this.qiniuData.key = `${rondToken.generate(32)}.${file.name.split('.').pop()}`
    }
  }

}
</script>
<style lang="scss" scoped>
.content{
  width: 100%;
  min-height: 230px;
  background: #ffffff;
  border:1px solid rgba(192,199,206,0.6);
  border-radius:4px;
}
.textContainer{
  width: 96%;
  margin: 8px auto 0 auto;
  position:relative;
}
.closeBnt{
  position: absolute;
  right: -1px;
  top:-1px;
  i{
    color: #c9cacc;
  }
  i:hover{
    color: #409eff;
  }
}
.imgContainer{
  width: 96%;
  margin: 8px auto 0 auto;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img{
    width: 100%;
    height: auto;
  }
  .imgText{
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    font-size: 13px;
    color: #909399;
    margin: 6px auto;
    width: 50%;
    padding: 4px 4px;
    // margin-top:10px;
  }
}
.addContainer{
  margin: 20px auto 20px auto;
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0 8px 0 8px;
  .line{
    background-color: #c9cacc80;
    font-size: 28px;
    width: 1px;
    height: 20px;
    margin: 0 8px;
  }
  .addBtn{
    font-size: 16px;
    cursor: pointer;
    i{
      color:#409eff;
      font-size: 16px;
      // margin-bottom: 2px;
    }
    span{
      // margin-top:-2px;
      color: #909399;
      font-size: 13px;
    }
  }
}

//908908908

</style>
