<template>
  <div class="count-item">
    <div :style="{background:bgColor,color:color}" class="count-icon">
      <svg-icon :icon-class="icon" />
    </div>
    <div class="count-text">
      <p style="color:rgba(0,0,0,.45);">{{ text }}</p>
      <p style="color: #666;">{{ count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: '#40c9c6'
    },
    icon: {
      type: String,
      required: false,
      default: 'user1'
    },
    bgColor: {
      type: String,
      required: false,
      default: '#fff'
    },
    text: {
      type: String,
      required: false,
      default: 'text'
    },
    count: {
      type: [Number, String],
      required: false,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.count{
  &-item{
    height: 100px;
    background-color: #fff;
    // box-shadow: 0px 0px 3px 0px rgba(12, 6, 14, 0.2);
    box-shadow: 4px 4px 40px rgba(0,0,0,.03);
    border: 1px solid rgba(12, 6, 14, 0.03);
    border-radius: 6px;
    display: flex;
    align-items: center;
  }
  &-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-left: 10px;
    // color: #40c9c6;
    // background: #fff;
  }
  &-icon:hover{
    // background: #40c9c6;
    // color: #fff;
  }
  &-text{
    width: calc(100% - 110px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    p{
      font-size: 18px;
      margin-bottom: 12px;
      line-height: 24px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      font-weight: 700
    }
  }
}
</style>
