<template>
  <div>
    <div class="slideContainer">
      <ImgCropper :value.sync="defaultData.imgUrl" :fixed-number="fixedNumber" style="margin-left: 10px;" />
      <div class="select1" @mouseleave="oneSelefSelect = false">
        <div style="display: flex; width: 100%;">
          <p>跳转路径:</p>
          <div class="selectEdit">
            <p
              class="selectEditText"
              @mouseover="oneSelefSelect = !oneSelefSelect"
            >
              选择需要调转的页面 v
            </p>
            <div
              v-if="oneSelefSelect"
              class="oneSelefSelect"
              @mouseleave="oneSelefSelect = !oneSelefSelect"
            >
              <ul>
                <li
                  v-for="(item1, index1) in linkOptions"
                  :key="index1"
                  @click="selectItem(item1)"
                >
                  {{ item1.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <el-tag style="color:#596174" size="small">
          <span class="textRouter"> {{ defaultData.temp.label }} | </span>
          <span class="textRouter">
            {{ defaultData.temp.router }}
          </span>
        </el-tag>
      </div>
    </div>
    <SelectDialog v-if="selectShow" :type="selectType" :show.sync="selectShow" @change="handleSelectChange" />
  </div>
</template>

<script>
import ImgCropper from '@/components/ImgCropper'

import SelectDialog from '@/components/SelectDialog'

export default {
  components: {
    ImgCropper,
    SelectDialog
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return []
      }
    },
    fixedNumber: {
      type: Array,
      required: false,
      default: function() {
        return ['100', '100']
      }
    }
  },
  data() {
    return {
      selectShow: false,
      selectType: 'product',
      handleLocation: '',
      imgUrl: '',
      total: '',
      search: '',
      selectItemData: {},
      slideRouter: '',
      oneSelefSelect: false,
      selectOptions: '',
      selictList: [],
      linkOptions: [
        {
          value: 1,
          label: '案例'
        },
        {
          value: 2,
          label: '医生'
        },
        {
          value: 3,
          label: '商品'
        }
      ],
      dialogVisible: false
    }
  },
  computed: {
    defaultData() {
      return this.value
    }
  },
  watch: {
    defaultData: {
      handler: function(params) {
        this.$emit('update:value', this.defaultData)
      },
      deep: true
    }
  },
  mounted() {
    // this.selectItem({ value: 2 })
  },
  methods: {
    async selectItem(data, page, search) {
      switch (data.value) {
        case 1:
          this.selectType = 'article'
          break
        case 2:
          this.selectType = 'doctor'
          break
        case 3:
          this.selectType = 'product'
          break

        default:
          break
      }
      this.handleLocation = data
      this.selectShow = true
    },
    changPage(e) {
      this.selectItem(this.selectItemData, e)
    },
    searchChang(search) {
      if (search === '') {
        this.selectItem(this.selectItemData, 1)
      } else if (search !== '') {
        this.selectItem(this.selectItemData, '', { name: search })
      }
    },
    oneSelefSelectShow(index, action) {
      this.oneSelefSelect.splice(index, 1, action)
    },
    cancel() {
      this.handleLocation = {}
      this.dialogVisible = false
    },
    handleSelectChange(data) {
      const location = this.defaultData
      location.bindId = data.id
      location.type = this.handleLocation.value
      location.temp.label = this.handleLocation.label
      location.temp.router = location.type === 2 ? data.name : data.title || data.name
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.selectContainer {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.selectContainer:hover {
  border-color: #409eff;
}
.imgCropper {
  width: 90px;
  height: 90px;
  margin: 0 auto;
}
.addStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  font-weight: 500;
  p {
    color: #409eff;
    padding: 10px;
  }
}
.newSlideshow {
  width: 398px;
  height: 82px;
  p {
    font-size: 12px;
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.slideContainer {
  width: 398px;
  height: 100px;
  background: #ffffff;
  border: 1px solid #d7dae2;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.select {
  margin-left: 10px;
  width: 100%;
  height: 90px;
  display: flex;
  align-content: center;
}
.select1 {
  position: relative;
  margin-left: 10px;
  width: 100%;
  height: 90px;
}
.selectEdit {
  position: relative;
  width: 70%;
  margin-left: 10px;
}
.selectEditText {
  width: 100%;
  cursor: pointer;
  color: #409eff;
}
.oneSelefSelect {
  z-index: 2033;
  position: absolute;
  top: 32px;
  width: 100%;
  max-width: 270px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  ul {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
  }
  li {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }
  li:hover {
    background-color: #f5f7fa;
  }
}
.listBox {
  width: 100%;
  ul {
    list-style: none;
    padding-inline-start: 12px;
  }
}
.pagination {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
.textRouter{
  display: inline-block;
  max-width: 200px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}

</style>
