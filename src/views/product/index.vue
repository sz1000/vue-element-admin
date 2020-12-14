<template>
  <div class="container container-product">
    <div >
      <div class="conditionContainer">
        <div class="search-container">
          <el-radio-group v-model="isOnSale" class="producSelect">
            <el-radio :label="1">上架商品</el-radio>
            <el-radio :label="0" style="margin-left: 10px;">下架商品</el-radio>
          </el-radio-group>

          <div class="searchProdact">
            <p style="margin-right:10px;">商品名称:</p>
            <el-input v-model="poructName" style="width:220px;" placeholder="商品名称" clearable >
              <el-button slot="append" icon="el-icon-search" @click="searchName"/>
            </el-input>
          </div>

          <div class="searchProdact">
            <p style="margin-right:10px;">类目:</p>
            <el-select
              v-model="targetCategories"
              clearable
              placeholder="请选择"
              @change="categoriesChange"
            >
              <el-option
                v-for="(item,index) in categoriesSelect"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="addProduct">
          <el-button type="primary" @click="addProduct">
            <i class="el-icon-edit">添加商品</i>
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
          <el-table-column align="center" prop="id" label="商品ID" />
          <el-table-column align="center" prop="name" label="商品名称" width="180" />
          <el-table-column align="center" prop="cateSub" label="商品类目" />
          <el-table-column align="center" label="是否推荐">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.is_recommend | judge"
                active-text="是"
                inactive-text="否"
                @change="recommendChang(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="count" label="下单数量" />
          <el-table-column align="center" prop="updated_at" label="更新时间" />
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <div class="TableHandleStyle">
                <i class="el-icon-edit-outline form-button" @click="handleItem('edit',scope.row)">编辑</i>
                <i
                  class="el-icon-caret-bottom form-button"
                  @click="isSaleChang(scope.row.id,scope.row.sale_end_time)"
                >{{ isOnSale === 1 ? "下架" : "上架" }}</i>
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
import {
  productList,
  categories,
  getDoctorList,
  putOnSaleArticle,
  putDoctorRecommend
} from '@/api/product'
import moment from 'moment'
import { opposite } from '@/utils'

export default {
  data() {
    return {
      headerStyle: '{background:red}',
      tableData: [],
      currentPage: 1,
      isOnSale: 1, // 是否上架
      pageCount: 10, // 分页总页数
      total: 10, // 分页总页数
      poructName: '',
      doctorList: [],
      targetCategories: '',
      categoriesSelect: [],
      selectProduct: '',
      selectProductData: [],
      searchParams: {}
    }
  },
  watch: {
    isOnSale: function(value) {
      this.getProductList()
    }
  },
  async mounted() {
    this.initData()
  },
  methods: {
    recommendChang(item) {
      putDoctorRecommend(item.id, opposite(item.is_recommend))
        .then(res => {
          this.initData()
        })
        .catch(err => {
          console.error(err)
          this.$message.error('失败了！')
        })
    },
    async initData() {
      this.getProductList()
      // 获取医生列表
      const doctorListData = await getDoctorList()
      doctorListData.data.forEach((element, index) => {
        this.selectProductData.push({
          value: element.id,
          label: element.name
        })
      })

      // 获取类目
      const categoriesServe = await categories({ level: 2 })
      categoriesServe.data.forEach((item, index) => {
        this.categoriesSelect.push({
          value: item.id,
          label: item.name
        })
      })
    },
    async handleItem(directive, id) {
      if (directive === 'edit') {
        this.$router.push({
          path: `/prodect/edit/${id.id}`
        })
      }
    },
    async isSaleChang(id, endTime) {
      let isOnSale
      if (this.isOnSale === 1) {
        isOnSale = 0
      } else {
        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
        if (endTime < nowTime) {
          this.$alert('商品上架时间不正确，请通过编辑修改后上架!!!', '警告!', {
            type: 'warning',
            confirmButtonText: '确定'
          })
          return
        }
        isOnSale = 1
      }
      this.$confirm(`是否${isOnSale === 1 ? '上架' : '下架'}商品？`, '警告!', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async() => {
        await putOnSaleArticle(id, isOnSale).catch(err => {
          console.error(err)
          this.$message.error('操作失败')
        })
        this.initData()
        this.$message({
          message: isOnSale === 1 ? '上架成功' : '下架成功',
          type: 'success'
        })
      }).catch(() => {
        return
      })
    },
    async currentChange(e) {
      this.currentPage = e
      this.getProductList()
    },

    async docotorChange(e) {
      if (e) {
        this.searchParams.doctorId = e
      } else {
        delete this.searchParams.doctorId
      }
      this.getProductList({ doctorId: e })
    },
    async categoriesChange(e) {
      if (e) {
        this.searchParams.cateSubId = e
      } else {
        delete this.searchParams.cateSubId
      }
      this.getProductList({ cateSubId: e })
    },
    searchName(e) {
      if (this.poructName) {
        this.searchParams.name = this.poructName
      } else {
        delete this.searchParams.name
      }
      this.getProductList({ name: this.poructName })
    },
    async getProductList() {
      const paramObj = Object.assign({}, this.searchParams, {
        page: this.currentPage,
        withData: 1,
        onSale: this.isOnSale
      })
      const productListData = await productList(paramObj)
      this.tableData = productListData.data
      this.pageCount = productListData.page.lastPage
      this.total = productListData.page.total
    },
    addProduct() {
      this.$router.push({
        path: '/prodect/add'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.producSelect {
  display: flex;
  /deep/ .el-radio {
    margin-right: 5px;
  }
}
  .el-radio {
    margin-right: 5px;
  }

.searchProdact{
  display: flex;
  align-items: center;
  p{
    white-space:nowrap;
  }
}
.list-container{
  overflow: hidden;
  padding: 1px;
}
.conditionContainer{
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  height: auto;
}
.search-container{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .searchProdact,.producSelect{
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
.container-product{
  padding: 30px;
}
.pagingStyle{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.addProduct{
  margin-top: 10px;
}
</style>

