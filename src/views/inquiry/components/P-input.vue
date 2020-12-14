<template>
  <div class="container">
    <div class="container-name">
      {{ title }}
    </div>
    <div class="container-input">
      <slot>
        <input :placeholder="placeholder" :value="value" type="text">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入内容'
    },
    value: {
      type: [String, Number],
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #495060;
    &-name{
        min-width: 50px;
    }
    input{
        border: none;
    }
    input:focus {
      outline-offset: 0;
    }
    :focus {
    outline: -webkit-focus-ring-color auto 0px;
    }
}
</style>

