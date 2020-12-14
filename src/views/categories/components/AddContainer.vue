<template>
  <div class="select-container">
    <div class="selectorImg">
      <div
        v-for="(item,index) in icon"
        :key="index"
        class="imgContainer"
        @click="()=>selectorImg(index)"
      >
        <div v-if="optOnImg === index" class="selector">
          <i class="el-icon-success"/>
        </div>
        <img :src="item" alt srcset>
      </div>
      <div class="imgContainer1" @click="()=>selectorImg(99)">
        <div v-if="optOnImg === 99" class="selector">
          <i class="el-icon-success"/>
        </div>
        <ImgCropper :delete-show="false" :value.sync="sefeImg" :fixed-number="[1,1]"/>
      </div>
    </div>
    <div class="name">
      <h3>{{ inputText }}</h3>
      <el-input v-model="submitData.name" :placeholder="`请输入${inputText}名字`"/>
    </div>
    <slot/>

  </div>
</template>

<script>
import ImgCropper from '@/components/ImgCropper'
import iconJson from './icon.json'

export default {
  components: {
    ImgCropper
  },
  props: {
    submitData: {
      type: Object,
      required: true
    },
    inputText: {
      type: String,
      required: false,
      default: '一级目录'
    }
  },
  data() {
    return {
      judge: false,
      optOnImg: '',
      icon: []
    }
  },
  computed: {
    sefeImg: {
      get: function(params) {
        const that = this
        this.icon.forEach((element, index) => {
          if (element === this.submitData.icoImg) {
            that.judge = true
            that.optOnImg = index
          }
        })
        if (this.optOnImg === 99) {
          return this.submitData.icoImg
        } else {
          return ''
        }
      },
      set: function(params) {
        console.log('TCL: params', params)
        const tampObj = this.submitData
        tampObj.icoImg = params
        this.$emit('update:submitData', tampObj)
      }
    }
  },
  mounted() {
    this.icon = iconJson.icon
    this.judge = false
    this.icon.forEach((element, index) => {
      if (element === this.submitData.icoImg) {
        this.optOnImg = index
        this.judge = true
      }
    })
    if (!this.judge && this.submitData.icoImg) {
      this.optOnImg = 99
    }
  },
  beforeDestroy() {
    this.optOnImg = ''
  },
  methods: {
    selectorImg(index) {
      this.optOnImg = index
      if (index < 99) {
        this.submitData.icoImg = this.icon[index]
        this.$emit('update.submitData', this.submitData)
      }
    },
    submitRequest() {
      console.log(this.submitData)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container {
  // margin-top: 30px;
  margin: 0px;
  width: 540px;
  min-height: 300px;
  background: #ffffff;
  border-radius: 4px;
}
.imgContainer {
  margin: 9px 9px 9px 9px;
  width: 90px;
  width: 90px;
  border-radius: 4px;
  box-shadow: 0px 0px 2px #33333330;
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
}

.imgContainer:hover {
  border: 1px solid #409eff60;
  box-shadow: 0px 0px 2px #409eff;
}

.selector {
  position: absolute;
  right: 0px;
  z-index: 99;
  color: #409eff;
}

.selectorImg {
  margin-left: 9px;
  padding-top: 9px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.imgContainer1 {
  position: relative;
  margin: 10px 9px 9px 9px;
}
.name {
  width: 90%;
  margin-left: 22px;
  margin-top: 34px;
  display: flex;
  h3 {
    width: 90px;
  }
}
.submit {
  width: 93%;
  margin: 34px 22px;
}
</style>
