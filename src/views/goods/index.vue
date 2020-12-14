<template>
  <div class="contant-container layout" style="margin-top:30px;">
    <header class="search">
      
      <div class="tabelContainerStyle">
        <div class="headContainer">
          <div class="conditionContainer">
            <!-- 下拉框查询开始 -->
              <div style="margin-right: 30px;" >
                <el-input placeholder="请输入内容" :param="name"  v-model="searchName" :select-options="options"
            class="input-with-select">
                <el-select style="width: 150px;" 
                v-model="name"
                placeholder="请选择"
                slot="prepend">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.name"
                  >
                  </el-option>

                </el-select>
                
                <el-button slot="append" icon="el-icon-search" @click="searchAction('searchName', name)" ></el-button>
              </el-input>
            </div>
            <!-- 下拉框查询结束 -->

            <div class="searchContainer">
              <p style="width:5em;margin:12px 5px;">发货状态：</p>
              <el-select clearable 
                v-model="searchStatus"
                @change="searchoption('searchStatus','logistics_status')" 
                @clear="handleClear">
                 
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="search-left-row">
          <SearchItem
            :select-options="selectOptions"
            :param="['begin','end']"
            type="time"
            title="录入时间"
            @change="handlenSearchChange"
          />
        </div>
      </div>
    </header>

    <div class="tableContainer">
      <el-table :data="tableData" :highlight-current-row="true">
        <el-table-column align="center" prop="order_num" label="订单ID">
          <template slot-scope="scope">{{ scope.row.order_num || '暂无' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="product_name" label="商品名称" />
        <el-table-column align="center" prop="customer_name" label="客户姓名" />
        <el-table-column align="center" prop="tel" label="客户手机号" />
              <el-table-column align="center" label="实收款">
            <template slot-scope="scope">
              <div class="price">￥{{ scope.row.pay_price / 100 }}</div>
              <!-- <div class="price">￥{{ scope.row.pay_price  }}</div> -->

            </template>
          </el-table-column>
        <el-table-column align="center" prop="address" label="收货地址" />
        <el-table-column align="center" prop="logistics_status" label="发货状态">
       <template slot-scope="scope">
              <div>
                <el-tag :type="scope.row.logistics_status | orderlogistics_statusType">{{
                  scope.row.logistics_status | orderlogistics_status
                }}</el-tag>
              </div>
            </template>       

        </el-table-column>
        <el-table-column align="center" prop="created_at" label="下单时间" />

        <el-table-column align="center" prop="details" label="操作">
          <template slot-scope="scope">
            <!-- {{ scope.row.logistics_status == 0 ? $router.push({path: '/unshipped', query: {id: scope.row.id}}) : $router.push({path: '/shipped', query: {id: scope.row.id}}) }} -->
            <el-button 
               size="small"
              @click="$router.push({path: toOrderPage(scope.row.logistics_status), query: {id: scope.row.id}})"
              type="primary"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="total"
        class="pagination"
        background
        small
        layout="prev, pager, next"
        @current-change="handleChangePage"
      />
    </div>
  </div>
</template>

<script>
import { getListOrders } from "@/api/order";
import moment from "moment";

import SearchItem from "@/components/SearchItem";
export default {
  filters: {
    orderlogistics_status: function(value) {
      let logistics_status
      switch (value) {
        
        case 0:
          logistics_status = '待发货'
          
          break
        case 1:
          logistics_status= '已发货'
          break
        case 2:
          logistics_status = '已完成'
          break
        case 3:
          logistics_status = '已退货'
          break
        
        default:
      }
      return logistics_status
    },
    
    orderlogistics_statusType: function(value) {
      let logistics_status
      switch (value) {
        
        case 0:
          logistics_status = 'warning'
          break
        case 1:
          logistics_status = 'success'
          break
        case 2:
          logistics_status = 'background-color: #409eff'
          break
        case 3:
          logistics_status = 'danger'
          break
  
        default:
      }
      return logistics_status
    }
  },
  components: {
    SearchItem
    // AddSale
  },
  data() {
    return {
      options: [
        {
          value: "01",
          label: "订单号",
          name: "orderNum"
        },
        {
          value: "02",
          label: "客户姓名",
          name: "customerName"
        },
        {
          value: "03",
          label: "客户手机号",
          name: "tel"
        },
        {
          value: "04",
          label: "物流编号",
          name: "logistics_num"
        },
        {
          value: "05",
          label: "商品名称",
          name: "product_name"
        },{
          value: "06",
          label: "收货人姓名",
          name: "reciver"
        },
        {
          value: "07",
          label: "收货人手机号",
          name: "reciver_tel"
        }
      ],
      select: "01",
      //   addSaleShow: false,
      total: 10,
      type: 0,
      input3: "",
      time: "",
      searchName: "",
      searchPhone: "",
      searchOrderNum: "",
      searchNum: "",
      name: "",
      searchStatus: "",
      currentPage: 1,
      parentName: "",
      // pay_price:null,
      tableData: [],
      paramsObj: {},
      selectOptions: [
        {
          value: 0,
          label: "待发货"
        },
        {
          value: 1,
          label: "已发货"
        },
        {
          value: 2,
          label: "已完成"
        },
        {
          value: 3,
          label: "已退货"
        }
      ]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData(page, status, seartch) {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.paramsObj,
        { type: this.type }
      );
      const data = await getListOrders(params);
      this.tableData = data.data;
      if (data.page) {
        this.total = data.page.total;
      } else {
        this.total = 0;
      }
    },
    toOrderPage: function(value) {
      let path
      switch (value) {
        case 0:
          path = '/unshipped'//待发货页面
          break
        case 1:
          path = '/shipped'//已发货页面
          break
        case 2:
          path = '/completed'//已完成页面
          break
        case 3:
          path = '/refunded'//已退货页面
          break
        default:
      }
      return path
    },
    
    handleClear() {
      this.paramsObj = {}
      this.currentPage = 1
      this.initData()
    },
    handleChangePage(e) {
      this.currentPage = e;
      this.initData();
    },
    handleClick(tab, event) {
      const status = tab.name;
      this.status = status;
      this.paramsObj = status === "all" ? {} : { status };
      this.searchName = "";
      this.searchPhone = "";
      this.searchNum = "";
      this.searchOrderNum = "";
      this.searchStatus = "";
      this.initData();
    },
    currentChange(e) {
      this.currentPage = e;
      this.initData();
    },
    immediateDeliveryInfo(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "warning"
      });
    },
    // handleAddSale(e) {
    //   this.addSaleShow = true
    // },
    //下拉查询内容
    searchAction(data, condition) {
      if(this.name == ""){
        this.immediateDeliveryInfo("请选择查询内容")
        return
      }
      if(this.searchName == ""){
        this.immediateDeliveryInfo("查询内容不能为空")
        return
      }
      

      this.paramsObj = data ? { [condition]: this[data] } : {};
      
      if(this.searchStatus != ""){
          this.paramsObj.logistics_status=this.searchStatus;
      }
      this.currentPage = 1;
      this.initData();
    },
    //发货管理选择
    searchoption(data,condition){
    
      
      //{logistics_status: this.logistics_status}
      this.paramsObj = data ? { [condition]: this[data] } : {};
      
      if(this.logistics_status != undefined){
          this.paramsObj.logistics_status=this.logistics_status;
      }
      
      this.paramsObj[this.name]=this.searchName;
      // e ? this.queryObj.paramsObj  = e : delete this.queryObj.paramsObj 
      this.currentPage = 1;
      this.initData();
    },
  
    handlenSearchChange(e) {
      if (e.type == "time") {
        if (e.value) {
          this.paramsObj[e.param[0]] = e.value[0];
          this.paramsObj[e.param[1]] = e.value[1];
        } else {
          delete this.paramsObj[e.param[0]];
          delete this.paramsObj[e.param[1]];
        }
        this.currentPage = 1;
        this.initData();
        return;
      }

      if (e.value !== "") {
        this.paramsObj[e.param] = e.value;
      } else {
        delete this.paramsObj[e.param];
      }
      this.currentPage = 1;
      this.initData();
    },
    search(params) {
      const searchData = this[params] ? `?${params}=${this[params]}` : "";
      this.initData(searchData);
    },
    timeSerch(params) {
      const searchData = `?begin=${moment(params[0]).format(
        "YYYY-MM-DD"
      )}&end=${moment(params[1]).format("YYYY-MM-DD")}`;
      this.initData(searchData);
    }
  }
};
</script>

<style lang="scss" scoped>
.price {
  color: #ff6f21;
  font-weight: 600;
}
.searchContainer {
  margin-right: 80px;
  display: flex;
  p {
    width: 4em;
  }
}
.layout {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.conditionContainer {
  height: 60px;
}

/deep/ .el-range-separator {
  min-width: 24px;
}
.seekContent {
  height: 100px;
  display: flex;
  p {
    text-align: end;
    min-width: 100px;
    margin-right: 12px;
  }
  .seekContentItem {
    display: flex;
    align-items: center;
  }
}
.tableContainer {
  padding: 0 30px;
}
.search {
  margin: 30px;
  display: flex;
  justify-content: space-between;
  &-left {
    &-row {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.pagination {
  padding: 20px 0;
  float: right;
}
</style>