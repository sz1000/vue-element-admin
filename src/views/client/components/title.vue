<template>
  <div class="title-container">
    <div class="left">
      <span class="icon" />
      <div>{{ title }}</div>
    </div>
    <div class="right">
      <slot />
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
    }
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  padding: 22px 24px;

  font-size: 14px;
  color: #40444d;

  .left{
      display: flex;
      align-items: center;
  }

  .icon {
    display:inline-block;
    margin-right: 10px;
    width: 4px;
    height: 14px;
    background: rgba(24, 144, 255, 1);
    border-radius: 2px;
  }
}
</style>

