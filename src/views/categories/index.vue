<template lang="">
  <div class="categories">
    <div class="tabelContainerStyle">
      <div class="contant-container list-container">
        <div class="content-handle">
          <el-button type="primary" @click="addFirst">
            <i class="el-icon-edit">添加一级类目</i>
          </el-button>
        </div>
        <div class="tableContainer">
          <el-table
            :data="tableData"
            :header-cell-style="{background:'rgba(241,243,244,1)',padding:'8px 0'}"
            header-row-class-name="headerStyle"
            header-cell-class-name="headerCell"
            cell-class-name="rowStyle"
            style="width: 100%"
          >
            <el-table-column align="center" prop="id" label="编号" width="120"/>
            <el-table-column align="center" prop="name" label="一级类目" width="300">
              <template slot-scope="scope" >
                <div class="iconImg-container">
                  <div class="iconImg" >
                    <div class="closeIcon" @click.stop="firstTagClose(scope.row)">
                      <i class="el-icon-circle-close"/>
                    </div>
                    <div @click="editSecondCategories(scope.row.id)">
                      <img :src="scope.row.ico_img">
                      <p>
                        {{ scope.row.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="二级类目">
              <template slot-scope="scope">
                <div class="tagContainer">
                  <div v-for="(item,index) in scope.row.children" :key="index" style="margin: 10px 0;">
                    <div class="iconImg">
                      <div class="closeIcon" @click.stop="tagHandleClose(item.id)">
                        <i class="el-icon-circle-close" />
                      </div>
                      <img :src="item.ico_img" @click="tagHandleEdit(item)" >
                      <p @click="tagHandleEdit(item)">{{ item.name }}</p>
                    </div>
                  </div>
                  <div class="addCategories" @click="addSecond(scope.row.id)">
                    <i class="el-icon-circle-plus" />
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <el-dialog
        :visible.sync="dialogVisible"
        title="提示"
        width="600px">
        <AddContainer v-if="dialogVisible" :submit-data.sync="options" :input-text="inputText"/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="submitOptions">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="deleteVisible"
        title="警告!!!"
        width="30%">
        <span>是否确认删除,删除后该类目下的商品也将删除!!!</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="danger" @click="deleteCat">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getCategoriesList,
  getTargetCategories,
  putTargetCategories,
  DeleteTargetCategories,
  postSecondCategories
} from '@/api/categories'
import AddContainer from './components/AddContainer'
export default {
  components: {
    AddContainer
  },
  data: function() {
    return {
      inputText: '二级目录',
      addCategories: false,
      deleteId: 0,
      deleteVisible: false,
      dialogVisible: false,
      options: {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 2,
        parentId: 0
      },
      tableData: [],
      currentPage: 0,
      total: 100,
      pageCount: 10
    }
  },
  async mounted() {
    this.getList()
  },
  methods: {
    cancel() {
      this.options = {
        orgId: 1,
        id: 0,
        name: '',
        ico_img: '',
        level: 2,
        parent_id: 0
      }
      this.deleteVisible = false
    },
    firstTagClose(itemData) {
      if (itemData.children.length !== 0) {
        this.$message({
          message: '此一级目录下还存在二级目录，如要删除，请先删除二级目录',
          type: 'warning'
        })
      } else if (itemData.children.length === 0) {
        const _this = this
        DeleteTargetCategories(itemData.id).then(async res => {
          await _this.getList()
          _this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }
    },
    async getList(e) {
      const listData = await getCategoriesList()
      this.tableData = listData.data
    },
    async editSecondCategories(id) {
      const targeCategoriesData = await getTargetCategories(id)
      this.options = this.undelinToHump(targeCategoriesData.data)
      this.dialogVisible = true
    },
    addSecond(parentId) {
      console.log('TCL: addSecond -> parentId', parentId)
      this.options = {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 2,
        parentId: parentId
      }
      this.inputText = '二级目录'
      this.addCategories = true
      this.dialogVisible = true
    },
    addFirst() {
      this.options = {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 1,
        parentId: 0
      }
      this.inputText = '一级目录'
      this.addCategories = true
      this.dialogVisible = true
    },
    async deleteCat() {
      await DeleteTargetCategories(this.deleteId)
      this.getList()
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.options = {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 1,
        parentId: 0
      }
      this.deleteVisible = false
    },
    async tagHandleClose(tag) {
      this.deleteVisible = true
      this.deleteId = tag
    },
    async tagHandleEdit(itemData, parentID) {
      if (itemData) {
        this.options = {
          orgId: itemData.org_id,
          id: itemData.id,
          name: itemData.name,
          icoImg: itemData.ico_img,
          level: itemData.level,
          parentId: itemData.parent_id
        }
      }
      this.dialogVisible = true
    },
    async submitOptions() {
      if (this.options.name === '' || !this.options.name) {
        this.$message({
          message: '请输入类目名',
          type: 'warning'
        })
        return
      }
      if (this.options.icoImg === '' || !this.options.icoImg) {
        this.$message({
          message: '请选择图标',
          type: 'warning'
        })
        return
      }
      if (this.addCategories) {
        await postSecondCategories(this.options)
        this.$message({
          message: '添加类目成功',
          type: 'success'
        })
      } else {
        await putTargetCategories(this.options.id, this.options)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }
      this.getList()
      this.addCategories = false
      this.dialogVisible = false
      this.options = {
        orgId: 1,
        id: 0,
        name: '',
        icoImg: '',
        level: 2,
        parentId: 0
      }
    },
    handleCancel() {
      this.dialogVisible = false
    },
    undelinToHump(obj) {
      console.log(typeof obj)
      if (typeof obj === 'object') {
        const keyArr = Object.keys(obj)
        const valueArr = Object.values(obj)
        const tempArr = []
        keyArr.forEach(value => {
          const tempV = value.replace(/\_(\w)/g, function(all, letter) {
            return letter.toUpperCase()
          })
          tempArr.push(tempV)
        })
        const newObj = {}
        valueArr.forEach((value, index) => {
          newObj[tempArr[index]] = value
        })
        return newObj
      } else {
        console.error('undelinToHump:只接受对象')
      }
    }
  }
}
</script>

<style lang="scss">
.categories {
  margin-top: 30px;
  .tabelContainerStyle {
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #f7f7f7;
      color: #596174;
      font-weight: 500;
    }

    .tableContainer {
      .tagStyle {
        cursor: pointer;
      }
      .addCategories {
        margin-top: 24px;
        margin-left: 6px;
        font-size: 18px;
        color: #409eff;
        cursor: pointer;
      }
      .tagContainer {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
.iconImg-container{
  display: flex;
  justify-content: center;
}
.iconImg {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  img {
    cursor: pointer;
    width: 65%;
    height: auto;
  }
  p {
    display: inline-block;
    padding-top: -10px;
    margin-block-start: 0px;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}

.closeIcon {
  cursor: pointer;
  position: absolute;
  z-index: 10;
  top: -2px;
  right: 0px;
  font-size: 14px;
  color: #59617480;
}
</style>

