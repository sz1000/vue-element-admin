<template>
  <div class="cell">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.cell{
    height: 32px;
    padding: 4px;
    border-bottom: 1px solid #00000010;
    display: flex;
    align-items: center;
}
</style>

