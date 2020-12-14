<template>
  <div class="tabelContainerStyle" style="margin-top:30px;">
    <div class="contant-container list-container">

      <div class="content-head">
        <div class="content-head-left">
          <SearchItem type="input" param="title" title="标题" @change="handleSearchTitle" />
        </div>
        <div class="content-head-right">
          <el-button type="primary" @click="addProduct">
            <i class="el-icon-edit">添加文章</i>
          </el-button>
        </div>
      </div>

      <div class="tableContainer">
        <el-table
          :data="tableData"
          :highlight-current-row="true"
          :header-cell-style="{background:'rgba(241,243,244,1)',padding:'8px 0'}"
          header-row-class-name="headerStyle"
          header-cell-class-name="headerCell"
          cell-class-name="rowStyle"
          style="width: 100%"
        >
          <el-table-column align="center" prop="authorName" label="作者"/>
          <el-table-column align="center" prop="title" label="素材标题" width="180"/>
          <el-table-column
            align="center"
            label="类型">
            <template slot-scope="scope">
              <div>
                {{ scope.row.type | isType }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否绑定商品">
            <template slot-scope="scope">
              <div>
                {{ scope.row.productId === 0 ? "否" : "是" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否在小程序案例中展示">
            <template slot-scope="scope">
              <div>
                <!-- active-text="是"
                  inactive-text="否" -->
                <el-switch
                  :value="scope.row.recommend | isRecommend"
                  @change="isShowChang(scope.row.recommend,scope.row.id,scope.$index)"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="updatedAt" label="更新时间"/>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <div class="TableHandleStyle">
                <!-- <i class="el-icon-view" @click="handleCat(scope.row.id)">查看</i> -->
                <i class="el-icon-edit-outline" @click="handleEdit(scope.row.type,scope.row.id)">编辑</i>
                <i class="el-icon-caret-bottom" @click="handleDelete(scope.row.id,scope.$index)">删除</i>
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
</template>

<script>
import { getArticlesList, putRecommendArticle, deleteTargetArticle } from '@/api/articles'
import { undelinToHump } from '@/utils/common'
import SearchItem from '@/components/SearchItem'
export default {
  filters: {
    isRecommend: function(value) {
      if (value === 0) {
        return false
      } else if (value === 1) {
        return true
      }
    },
    isType: function(value) {
      if (value === 0) {
        return '图文'
      } else if (value === 1) {
        return '图册'
      }
    }
  },
  components: {
    SearchItem
  },
  data() {
    return {
      isShow: false,
      headerStyle: '{background:red}',
      tableData: [],
      currentPage: 1,
      pageCount: 10, // 分页总页数
      total: 10, // 分页总页数
      params: {}
    }
  },
  computed: {
    tamp: function(params) {
      console.log('TCL: params', params)
      return true
    }
  },

  async mounted() {
    this.initData()
  },
  methods: {
    handleSearchTitle(e) {
      console.log('TCL: handleSearchTitle -> e', e)
      if (e.value) {
        this.params[e.param] = e.value
        this.currentPage = 1
      } else {
        delete this.params[e.param]
      }
      this.initData()
    },
    async isShowChang(data, id, index) {
      if (data === 0) {
        data = 1
      } else if (data === 1) {
        data = 0
      }
      this.tableData[index].recommend = data
      await putRecommendArticle(id, data).catch((err) => {
        console.error('推荐错误', err)
        this.$message.error('操作错误')
      })
    },
    handleCat(id) {

    },
    handleEdit(type, id) {
      this.$router.push({
        name: 'article-edit',
        params: {
          type,
          id
        }
      })
    },
    async handleDelete(id, index) {
      this.$confirm('是否确认删除！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteTargetArticle(id).catch((err) => {
          console.error('文章删除失败', err)
          this.$message.error('发生错误了！ 请联系管理员')
        })
        this.tableData.splice(index, 1)
        this.$message({
          showClose: true,
          message: '删除文章成功',
          type: 'success'
        })
      }).catch(() => {
        return
      })
    },
    currentChange(e) {
      this.currentPage = e
      this.initData()
    },
    async initData(data) {
      const listData = await getArticlesList(Object.assign({}, { page: this.currentPage }, this.params)).catch(err => {
        console.error(err)
      })
      console.log(listData)
      if (!listData.data) {
        this.tableData = []
        return
      }
      const tempArr = []
      listData.data.forEach((element) => {
        tempArr.push(undelinToHump(element))
      })
      this.tableData = tempArr
      this.total = listData.page.total
      console.log('TCL: initData -> listData', listData)
    },
    onSaleHandle(e) {
      console.log(e)
    },
    addProduct() {
      this.$router.push({
        path: '/articels/add'
      })
    }
  }
}
</script>

<style lang="scss">
.content-head{
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

