<template>
  <div>
    <div class="content-handle">
      <el-button type="primary">
        <i class="el-icon-edit">保 存</i>
      </el-button>
    </div>
    <div class="contant-container">
      <div class="left-container">
        <TitleTabs text="预览"/>
        <div class="sub-container">
          <div class="sub-position">
            <Row title="一级类目">
              <div>
                <el-select v-model="submit2.parentId" placeholder="请选择">
                  <el-option
                    v-for="item in categoriesSelector"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <span class="addRat" @click="addChange">
                  <i :style="addIconColor" :class="addIcon"/>
                </span>
              </div>
              <div style="width:100%">
                <AddContainer v-if="newFistCategories" :submit-data.sync="submit1">
                  <el-button class="submit" type="primary" size="small" @click="submitRequest1">确认提交</el-button>
                </AddContainer>
              </div>
            </Row>
            <Row title="二级类目">
              <div style="width:100%">
                <p v-if="submit2.parentId == ''">请先选择一级目录</p>
                <AddContainer
                  v-if="submit2.parentId != ''"
                  :submit-data.sync="submit2"
                  input-text="二级目录">
                  <el-button
                    class="submit"
                    type="primary"
                    size="small"
                    @click="submitRequest2">确认提交</el-button>
                </AddContainer>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Row from '@/components/Row'
import TitleTabs from '@/components/TitleTabs'
import AddContainer from './components/AddContainer'

import { getFirstCategories, postFirstCategories, postSecondCategories } from '@/api/categories'
export default {
  components: {
    Row,
    TitleTabs,
    AddContainer
  },
  data() {
    return {
      newFistCategories: false,
      addIconColor: '',
      addIcon: 'el-icon-circle-plus',
      submit1: {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 1,
        parentId: 0
      },
      submit2: {
        orgId: 1,
        value: 1,
        name: '',
        icoImg: '',
        level: 2,
        parentId: ''
      },
      categoriesSelector: []
    }
  },
  async mounted() {
    this.getFirstList()
  },
  methods: {
    addChange() {
      this.addIcon =
        this.addIcon === 'el-icon-remove'
          ? 'el-icon-circle-plus'
          : 'el-icon-remove'
      this.addIconColor =
      this.addIconColor === 'color:#f56c6c' ? '' : 'color:#f56c6c'
      this.newFistCategories = !this.newFistCategories
    },
    async  getFirstList() {
      const firstList = await getFirstCategories()
      this.categoriesSelector = []
      console.log('TCL: mounted -> firstList', firstList)
      firstList.data.forEach((element, index) => {
        this.categoriesSelector.push({
          value: element.id,
          label: element.name
        })
      })
    },
    async submitRequest1() {
      console.log('TCL: this.submit1', this.submit1)
      postFirstCategories(this.submit1).catch((error) => {
        console.error('一级类目修改失败：', error)
      })
      this.getFirstList()
      console.log('类目一修改成功')
      this.addChange()
    },
    async submitRequest2() {
      postSecondCategories(this.submit2).catch((error) => {
        console.error('二级类目修改失败：', error)
      })
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.$router.push({
        path: '/categories/list'
      })
    },
    submitRequest() {
      console.log(this.submit1)
    }
  }
}
</script>

<style lang="scss" scoped>
.contant-container .left-container {
  width: 98%;
  min-width: 212px;
}
.sub-position {
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
}
.addRat {
  color: #409eff;
  width: 20px;
  font-size: 20px;
  margin-left: 10px;
}
</style>
