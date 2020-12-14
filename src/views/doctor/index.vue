<template>
  <div>
    <div class="tabelContainerStyle" style="margin-top:40px;">
      <div class="contant-container list-container">
        <div class="conditionContainer">
          <div/>
          <div class="conditionContainer-left">
            <el-button type="primary" @click="addProduct">
              <i class="el-icon-edit">添加医生</i>
            </el-button>
          </div>
        </div>
        <div class="tableContainer" >
          <el-table
            :data="tableData"
            :highlight-current-row="true"
            :header-cell-style="{background:'rgba(241,243,244,1)',padding:'8px 0'}"
            header-row-class-name="headerStyle"
            header-cell-class-name="headerCell"
            cell-class-name="rowStyle"
            style="width: 100%"
          >
            <el-table-column align="center" prop="id" label="医生ID"/>
            <el-table-column align="center" prop="name" label="医生姓名" width="180"/>
            <el-table-column align="center" prop="title" label="职位"/>
            <el-table-column align="center" prop="tags" label="标签">
              <template slot-scope="scope">
                <div>
                  <el-tag
                    v-for="(tag,index) in scope.row.tags"
                    :key="index"
                    style="margin-left:4px;"
                  >{{ tag }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="reserve_num" label="预约数量"/>
            <el-table-column align="center" prop="case_num" label="案例数量"/>
            <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <div class="TableHandleStyle">
                  <!-- <i class="el-icon-view" @click="handleItem(scope.$index, scope.row)">查看</i> -->
                  <i class="el-icon-edit-outline" @click="editHandleItem(scope.row.id)">编辑</i>
                  <i class="el-icon-caret-bottom" @click="deleteHandleItem(scope.row.id)">删除</i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagingStyle">
            <el-pagination
              :current-page="currentPage"
              :total="total"
              :page-count="pageCount"
              background
              layout="prev, pager, next"
              @current-change="currentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDoctorList, deleteTargetDoctor } from '@/api/doctor'

export default {
  data() {
    return {
      currentPage: 1,
      pageCount: 10, // 分页总页数
      total: 10, // 分页总页数
      tableData: []
    }
  },
  async mounted() {
    this.getList()
  },
  methods: {
    async getList(e, data) {
      const doctorData = await getDoctorList()
      this.tableData = doctorData.data
    },
    editHandleItem(id) {
      console.log('TCL: editHandleItem -> id', id)
      this.$router.push({
        name: 'editDoctor',
        params: {
          id
        }
      })
    },
    async deleteHandleItem(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteTargetDoctor(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    currentChange(e) {
      console.log('TCL: currentChange -> e', e)
    },
    addProduct() {
      this.$router.push({
        name: 'addDoctor'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.conditionContainer{

  display: flex;
 justify-content:space-between;
}
</style>
