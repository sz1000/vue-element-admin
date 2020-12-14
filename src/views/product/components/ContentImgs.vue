<template>
  <div class="layout">
    <ImgCropper
      v-for="index in 4"
      :key="index"
      :fixed-number="[750,670]"
      :value.sync="defalutArr[index-1]"
    />
  </div>
</template>

<script>
import ImgCropper from '@/components/ImgCropper'

export default {
  components: {
    ImgCropper
  },
  props: {
    defalutArr: {
      type: Array,
      required: true
    }
  },
  watch: {
    defalutArr: function(arr) {
      const tempData = []
      arr.forEach(element => {
        if (element !== '') {
          tempData.push(element)
        }
      })
      this.$emit('update:defalut-arr', tempData)
    }
  },
  methods: {
    getData(data) {
      for (const [key, value] of Object.entries(data)) {
        this.imgArr.splice(key - 1, 1, value)
      }
      // this.$emit('send', { [`contentImgs`]: this.imgArr })
      this.$emit('update:defalut-arr', this.imgArr)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
