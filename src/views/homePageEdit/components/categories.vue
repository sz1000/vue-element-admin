<template>
  <div>
    <div>
      <el-button type="primary" size="small" @click="editCategories">
        编辑类目
      </el-button>
      <div class="categoriesContainer">
        <el-tag v-for="(item, index) in value" :key="index">{{
          item.name
        }}</el-tag>
      </div>
    </div>
    <el-dialog :visible.sync="categoriesDialog" title="类目选择" width="30%">
      <div>
        <el-checkbox-group
          v-model="categoriesTagter1"
          style="width:100%"
          size="mini"
          @change="pp"
        >
          <div
            v-for="(levelOne, index) in categoriesList"
            :key="index"
            class="grouplin"
          >
            <div class="levelTow">
              <p>一级类目:</p>
              <div>
                <el-checkbox :label="levelOne.id" >{{ levelOne.name }}</el-checkbox>
              </div>
            </div>
          </div>
        </el-checkbox-group>
        <draggable v-model="categoriesTagter">
          <transition-group class="darg">
            <div
              v-for="element in categoriesTagter"
              :key="element.id"
              style="margin-bottom:10px;margin-right:10px;cursor:pointer"
            >
              <el-tag>
                {{ element.name }}
              </el-tag>
            </div>
          </transition-group>
        </draggable>
        <span v-if="categoriesTagter.length > 0" class="dragTip">
          <i class="el-icon-caret-top" />
          拖动进行位置排序
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoriesClear">取 消</el-button>
        <el-button type="primary" @click="categoriesChang">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoriesList } from '@/api/categories'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    value: {
      type: Array,
      required: true,
      default: function(params) {
        return []
      }
    }
  },
  data() {
    return {
      temp: '',
      categoriesTagter1: [],
      categoriesTagter: [],
      categoriesList: [],
      categoriesDialog: false
    }
  },
  watch: {
    'value': function() {
      console.log(this.value)
      for (const item in this.value) {
        this.categoriesTagter1.push(this.value[item].id)
      }
    }
  },
  async mounted() {
    const cateList = await getCategoriesList()
    this.categoriesList = cateList.data
  },
  methods: {
    pp(value) {
      const tempArr = []
      value.forEach(element => {
        this.categoriesList.forEach((item, index) => {
          if (item.id === element) {
            tempArr.push(item)
          }
        })
      })
      this.categoriesTagter = tempArr
    },
    categoriesChang(e) {
      this.categoriesDialog = false
      this.$emit('update:value', this.categoriesTagter)
      this.categoriesTagter1 = []
    },
    categoriesClear() {
      // this.categoriesTagter = []
      this.categoriesDialog = false
    },
    editCategories() {
      this.categoriesDialog = true
      this.categoriesTagter = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.levelOne {
  margin-top: 10px;
}
.levelTow {
  margin-top: 10px;
  display: flex;
  align-items: center;
  p {
    font-size: 12px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-right: 10px;
  }
}
.grouplin {
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #d7dae2;
}
.darg {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.dragTip {
  font-size: 12px;
  color: #d7dae2;
}
.categoriesContainer {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  span {
    margin-right: 10px;
    display: inline-block;
    margin: 10px 10px 0 0;
  }
}
</style>
