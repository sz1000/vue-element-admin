<template>
  <div>
    <el-dialog :visible.sync="dialogShow" title="选择指派销售" width="40%">
      <h4>提示：</h4>
      <div class="sale-tip">1.商家可以指派会员权限给指定用户；
      2.必须是在小程序中已经注册过用户；
      3.用户免支付会员费用成为销售（即会员）；</div>
      <div>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入手机号搜索"
          prefix-icon="el-icon-search"
          @change="searchChang"
        />
        <div class="listBox">
          <el-table :data="dataList" style="width: 100%">
            <el-table-column label="姓名" >
              <template slot-scope="scope">
                <el-radio v-model="selectTarget" :label="scope.row">{{
                  scope.row.name || scope.row.title
                }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="tel" label="手机号" sortable />
            <el-table-column prop="created_at" label="注册时间" sortable />
          </el-table>
          <!-- 分页 -->
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
import { getClientList } from '@/api/client'
import { postAddSaler } from '@/api/sales'
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    value: {
      type: [String, Object],
      required: false,
      default: function(params) {
        return {}
      }
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    params: {
      type: Object,
      required: false,
      default: () => {
        return { source: '小程序' }
      }
    }
  },
  data() {
    return {
      dataList: [],
      selectOptions: '',
      selectTarget: '',
      total: 0,
      page: 1,
      dialogVisible: false,
      search: ''
    }
  },
  computed: {
    dialogShow: {
      get() {
        return this.show
      },
      set(data) {
        this.$emit('update:show', data)
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(search) {
      search = Object.assign({}, { page: this.page }, { saler_status: 0 }, search, this.params)
      const serveData = await getClientList(search)
      this.dataList = serveData.data
      this.total = serveData.page.total
    },
    searchChang(search) {
      const searchParams = search ? { tel: search } : {}
      this.initData(searchParams)
    },
    changPage(e) {
      this.page = e
      this.initData()
    },
    addLocation() {
      postAddSaler({ user_id: this.selectTarget.id }).then(res => {
        this.$message({
          message: '指派成功',
          type: 'success'
        })
        this.initData()
      }).catch(err => {
        console.log('TCL: addLocation -> err', err)
      })
      //   this.$emit('update:value', this.selectTarget)
      //   this.$emit('change', this.selectTarget)
      this.$emit('update:show', false)
    },
    cancel() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-radio__label{
     white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow:hidden;
    display:inline-block;
}
.sale-tip{
    white-space: pre-line;
    margin-bottom: 20px;
}
</style>
