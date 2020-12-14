<template>
  <div>
    <el-dialog :visible="true" title="添加小程序导航-跳转路径">
      <div>
        <el-row :gutter="20">
          <el-col :span="7" style="width:230px;" class="item">
            <span>名称:</span>
            <el-input v-model="submitData.name" placeholder="请输入名称" />
          </el-col>
          <el-col :span="14" class="item" style="align-items: flex-start">
            <span style="padding-top:10px">图标:</span>
            <div class="icon_contaienr">
              <div
                v-for="(item,index) of iconArr"
                :key="index"
                class="icon_item"
                @click="handleSelectIcon(item)"
              >
                <i v-if="item.key === submitData.icon.key" class="el-icon-success active_icon" />
                <el-image :src="item.value" class="icon_image" fit="cover" />
              </div>
              <div class="icon_item">
                <i v-if="submitData.icon.key === 99" class="el-icon-success active_icon" />
                <ImgCropper
                  :delete-show="false"
                  :fixed-number="[1,1]"
                  :value="submitData.icon.key === 99 ? submitData.icon.value : ''"
                  :width="54"
                  :height="54"
                  class="add_icon"
                  @change="handleImgChange"
                />
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7" style="width:230px;" class="item">
            <span>类型:</span>
            <el-select v-model="submitData.type" @change="handleTypeChange">
              <el-option
                v-for="(item,index) in selectList"
                :key="index"
                :value="item.key"
                :label="item.label"
              />
            </el-select>
          </el-col>
          <el-col :span="14" class="item">
            <span>搜索:</span>
            <el-input
              v-model="searchParams"
              prefix-icon="el-icon-search"
              placeholder="请输入搜索内容"
              @change="searchChang" >
              <!-- <i slot="prefix" class="el-input__icon el-icon-search" /> -->
              <!-- <el-button slot="append" icon="el-icon-search" @click="searchChang" /> -->
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="list">
        <el-table :data="dataList" style="width: 100%">
          <el-table-column label="标题">
            <template slot-scope="scope">
              <el-radio v-model="submitData.id" :label="scope.row.id">
                {{
                  scope.row.name || scope.row.title
                }}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="更新时间" sortable />
        </el-table>
        <el-pagination
          :total="total"
          style="float:right"
          layout="prev, pager, next"
          @current-change="handlePageChange"/>
      </div>
      <div class="button_container">
        <el-button size="medium" @click="handleCancel">取消</el-button>
        <el-button size="medium" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgCropper from '@/components/ImgCropper'

import { getDoctorList } from '@/api/doctor'
import { getArticlesList } from '@/api/articles'
import { getProductList } from '@/api/product'
import { getCategoriesList } from '@/api/categories'
// import { putHomePage } from '@/api/homePage'

export default {
  components: {
    ImgCropper
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'add'
    },
    index: {
      type: Number,
      required: false,
      default: undefined
    },
    dataItem: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      iconArr: [
        {
          key: 0,
          value: 'https://img.kodin.cn/dE3LHF58kk2lfFeRCiloOGbUTlPRJwod.png'
        },
        {
          key: 1,
          value: 'https://img.kodin.cn/TrmyAT8V7X2hg23DWMrdnVchUAr5fDQg.png'
        },
        {
          key: 2,
          value: 'https://img.kodin.cn/pRS8IiWO7kL8I71XTqrHkFDQXEs1mTiM.png'
        },
        {
          key: 4,
          value: 'https://img.kodin.cn/Sgj4vmrASzojOaFtbm6IM8zqUpOsPQvb.png'
        },
        {
          key: 5,
          value: 'https://img.kodin.cn/K09LZ9xUDRsL6qOgExKV5EakDSFodRLS.png'
        },
        {
          key: 6,
          value: 'https://img.kodin.cn/mzGfsWutlJirotInTiqHPHEq2CeAbtEi.png'
        },
        {
          key: 7,
          value: 'https://img.kodin.cn/kX15ixkf2AjcAaYe2RdcJUeekkcvVUIX.png'
        },
        {
          key: 8,
          value: 'https://img.kodin.cn/f6iQxmA2tR6b3N3nPYEtT6qGM1LREZUM.png'
        }
      ],
      submitData: {
        name: '',
        type: '',
        icon: {
          key: 99,
          value: ''
        },
        id: ''
      },
      total: 50,
      page: 1,
      searchParams: '',
      dataList: [],
      selectList: [
        {
          key: 'product',
          label: '商品'
        },
        {
          key: 'article',
          label: '文章'
        },
        {
          key: 'doctor',
          label: '医生'
        },
        {
          key: 'categories',
          label: '类目'
        }
      ]
    }
  },
  mounted() {
    if (this.type == 'update') {
      this.submitData = this.dataItem
    }
  },
  methods: {
    async listData(search) {
      search = Object.assign({}, { page: this.page }, search, this.params)
      let serveData
      switch (this.submitData.type) {
        case 'product':
          serveData = await getProductList(search)
          break
        case 'article':
          serveData = await getArticlesList(search)
          break
        case 'doctor':
          serveData = await getDoctorList(search)
          break
        case 'categories':
          serveData = await getCategoriesList(search)
          break
        default:
          console.error('类型错误')
          break
      }
      this.dataList = serveData.data
      if (serveData.page) {
        this.total = serveData.page.total
      }
    },
    searchChang(search) {
      console.log('TCL: searchChang -> search', search)
      if (!this.submitData.type) {
        this.$message.error('请先选择类型')
        return
      }
      let searchParams
      if (this.type === 'article') {
        searchParams = search ? { title: search } : {}
      } else {
        searchParams = search ? { name: search } : {}
      }
      this.listData(searchParams)
    },
    handleSelectIcon(e) {
      this.submitData.icon = e
    },
    handleImgChange(e) {
      const tempObj = {
        key: 99,
        value: e
      }
      this.submitData.icon = tempObj
    },
    handleTypeChange(e) {
      this.page = 1
      this.listData()
    },
    handlePageChange(e) {
      this.page = e
      this.listData()
    },
    handleSubmit() {
      if (!this.submitData.name) {
        this.$message.error('请输入名称')
        return
      }
      if (!(this.submitData.icon.key || this.submitData.icon.key == '0')) {
        this.$message.error('请选择图标')
        return
      }
      if (!this.submitData.type) {
        this.$message.error('请选择类型')
        return
      }
      if (!this.submitData.id) {
        this.$message.error('请选择目标')
        return
      }
      const teampObj = {}
      teampObj.icon = this.submitData.icon
      teampObj.name = this.submitData.name
      teampObj.type = this.submitData.type
      teampObj.id = this.submitData.id

      console.log(this.type)

      if (this.type == 'update') {
        this.$emit('change', { data: teampObj, type: this.type, index: this.index })
      } else {
        this.$emit('change', { data: teampObj, type: 'add' })
      }
    },
    handleCancel() {
      this.$emit('cancle')
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
    white-space: nowrap;
  }
}
.icon_image {
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.icon_item {
  border: 1px solid #ebeef5;
  margin: 4px;
  border-radius: 4px;
  position: relative;
  color: #409eff;
  cursor: pointer;

  .active_icon {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 99999;
  }
}

.icon_contaienr {
  display: flex;
  flex-wrap: wrap;
}

.list {
  margin: 10px 0;
  overflow: hidden;
}

.button_container {
  display: flex;
  justify-content: flex-end;
}
</style>
