<template>
  <div>
    <el-tag
      v-for="(tag,index) in dynamicTags"
      :key="index"
      :disable-transitions="false"
      closable
      @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      maxlength="8"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">{{ text }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    tagArr: {
      type: Array,
      required: false,
      default: function(params) {
        return []
      }
    },
    text: {
      type: String,
      required: false,
      default: '+ New Tag'
    }
  },
  data() {
    return {
      // dynamicTags: this.tagArr,
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    dynamicTags: {
      get: function() {
        return this.tagArr
      },
      set: function(params) {
        this.$emit('update:tagArr', params)
      }
    }
  },
  watch: {
    inputValue: function(value) {
      if (value.length >= 8) {
        this.$message.error('最多只能输入八个字符')
      }
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      console.log('asdadsad--==')
      if (this.dynamicTags.length >= 6) {
        this.$message.error('最多只能添加六条擅长项目')
        return
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
