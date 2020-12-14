<template>
  <div>
    <div class="slideContainer">
      <div class="delete" @click="deleteItem">
        清空
      </div>
      <div class="doctorHeadImg" @click="dialogVisible = !dialogVisible">
        <img v-if="value.avatar" :src="value.avatar" alt="" srcset="" >
        <i
          v-if="!value.avatar"
          style=""
          class="el-icon-plus avatar-uploader-icon"
        />
      </div>
      <div class="doctorDetails" @click="dialogVisible = !dialogVisible">
        <div v-if="!value.id || !value" class="doctorTip">
          <p>*点击选择医生</p>
        </div>
        <div v-if="value.id" class="doctorBox">
          <P>姓名: {{ value.name }}</P>
          <P>职位: {{ value.title }}</P>
          <div style="margin-top:6px;" class="tagList" >
            <div
              v-for="(item, index) in value.tags"
              :key="index">
              <el-tag
                v-if="index < 3"
                size="small"
                style="margin-right: 4px;"
              >{{ item }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="`选择医生`" width="40%">
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入标题或者名字搜索"
          prefix-icon="el-icon-search"
          @change="searchChang"
        />
        <div class="listBox">
          <el-table :data="dataList" style="width: 100%">
            <el-table-column label="标题" sortable>
              <template slot-scope="scope">
                <el-radio v-model="selectTarget" :label="scope.row">{{
                  scope.row.name || scope.row.title
                }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间" sortable />
          </el-table>
          <div class="pagination">
            <el-pagination
              :total="total"
              :page-size="10"
              small
              layout="total,prev, pager, next"
              @current-change="changPage"
            />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addLocation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDoctorList } from '@/api/doctor'
export default {
  props: {
    value: {
      type: [String, Object],
      required: true,
      default: function(params) {
        return {}
      }
    }
  },
  data() {
    return {
      // value: '',
      dataList: [],
      selectOptions: '',
      selectTarget: '',
      total: 0,
      dialogVisible: false,
      search: ''
    }
  },
  mounted() {
    this.initData(1, '')
  },
  methods: {
    async initData(page, search) {
      page = page || 1
      const serveData = await getDoctorList(page, search)
      this.dataList = serveData.data
      this.total = serveData.page.total
    },
    deleteItem() {
      this.$emit('update:value', { name: '',
        title: '',
        id: null })
    },
    searchChang(search) {
      if (search === '') {
        this.selectItem(this.selectItemData, 1)
      } else if (search !== '') {
        this.selectItem(this.selectItemData, '', { name: search })
      }
    },
    changPage(e) {
      console.log('分页')
    },
    addLocation() {
      this.$emit('update:value', this.selectTarget)
      console.log('TCL: addLocation -> this.selectTarget', this.selectTarget)

      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.slideContainer {
  overflow:hidden;
  width: 398px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.pagination {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
.doctorHeadImg {
  width: 90px;
  height: 90px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
  }
}
.doctorDetails {
  width: calc(100% - 120px);
  margin-left: 10px;
  height: 100%;
  // background: red;
}
.doctorBox {
  margin-top: 6px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  p {
    margin-block-start: 4px;
    margin-block-end: 4px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.doctorTip{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.delete{
  position: absolute;
  font-size: 12px;
  color: #fff;
  z-index: 100;
  right: 0px;
  top: 0;
  padding:6px;
  border-bottom-left-radius: 10px;
  background: #66b1ff;
}
.tagList{
  display:flex;
}
</style>
