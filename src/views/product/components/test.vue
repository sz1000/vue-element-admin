<template>
  <div>
    <label>
      <button @click="$emit('send',pp)">{{ value }}</button>
      <!-- <input
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
      > -->
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false,
      default: '默认的标签'
    },
    value: {
      type: String || Number,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      pp: 'qweqeq'
    }
  },
  methods: {
    changValue() {
      this.value += 'qaqaqaq'
    }
  }
}
</script>
