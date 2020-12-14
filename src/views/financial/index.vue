<template>
  <div class="tabelContainerStyle">
    <div style="margin-top:40px;" class="contant-container list-container">
      <div class="headContainer">
        <div class="conditionContainer" style="margin-top:20rpx;">
          <div class="searchContainer">
            <div class="search-container-left">
              <div class="search-container-left-item">
                <SearchItem
                  type="input"
                  placeholder="请输入申请人"
                  param="apply_name"
                  title="申请人"
                  @change="handlenSearchChange"
                />
              </div>
            </div>
          </div>
          <div class="search-container-right">
            <div class="search-container-left-item">
              <SearchItem
                type="input"
                placeholder="请输入手机号码"
                param="apply_tel"
                title="联系手机"
                @change="handlenSearchChange"
              />
            </div>
          </div>
        </div>

        <!-- 日期UI组件开始-->
        <div class="conditionContainer" style="margin-top:0px;" >
          <div class="search-left-row">
            <SearchItem
              style="margin-top:10px;"
              :param="['begin','end']"
              type="time"
              title="提现时间"
              @change="handlenSearchChange"
            />
          </div>
          <!-- 订单数据导出 -->
          <div class="search-right-row">
            <!-- 这里暂时不要加，加上表格导出没有问题-->
            <el-button
              style="margin-top:-30px; margin-left:30px;"
              icon="el-icon-upload2"
              type="primary"
              @click="exportExcel"
            >订单数据导出</el-button>
          </div>
        </div>
        <!-- 日期UI组件结束-->
        <el-tabs v-model="activeName" class="selfTabs" @tab-click="handleClick">
          <el-tab-pane label="全 部" name="all" />
          <el-tab-pane label="审核中" name="0" />
          <el-tab-pane label="待打款" name="1" />
          <el-tab-pane label="已打款" name="3" />
          <el-tab-pane label="已驳回" name="2" />
        </el-tabs>
      </div>

      <div class="tableContainer">
        <el-table
          :data="tableData"
          :highlight-current-row="true"
          :header-cell-style="{
            background: 'rgba(241,243,244,1)',
            color:'#909399',
            font:'14px',
            padding: '8px 0'
          }"
          header-row-class-name="headerStyle"
          header-cell-class-name="headerCell"
          cell-class-name="rowStyle"
          style="width: 100%"
        >
          <el-table-column align="center" prop="withdraw_num" label="提现编号" />
          <el-table-column align="center" prop="apply_name" label="申请人" />
          <el-table-column align="center" prop="apply_tel" label="手机号" />
          <el-table-column align="center" prop="avatar" label="头像" width="80" >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:30px;height:30px;border-radius:50px;vertical-align:top;"/>
          </template>
          </el-table-column>

          <el-table-column align="center" prop="wechat_user" label="微信昵称" width="100" />
         
          <el-table-column align="center" label="提现额度">
            <template slot-scope="scope">
              <div class="price">￥{{ scope.row.amount / 100000 }}</div>
              <!-- <div class="price">￥{{ scope.row.amount }}</div> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="pay_time" label="提现时间" />

          <el-table-column align="center" label="提现状态">
            <template slot-scope="scope">
              <div>
                <el-tag :type="scope.row.status | withdrawStatusType">
                  {{
                  scope.row.status | withdrawStatus
                  }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <!-- 操作详情开始 -->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="TableHandleStyle">
                <el-button
                  size="small"
                  type="primary"
                  @click="$router.push({path: toWidthPage(scope.row.status), query: {id: scope.row.id}})"
                >详情</el-button>
              </div>
            </template>
          </el-table-column>
          <!-- 操作详情结束 -->
        </el-table>

        <!--  分页-->
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
  getWithdrawList
} from "@/api/widthdraw";
import moment from "moment";

import SearchItem from "@/components/SearchItem";

export default {
  filters: {
    withdrawStatus: function(value) {
      let status;
      switch (value) {
        case 0:
          status = "审核中";
          break;
        case 1:
          status = "待打款";
          break;
        case 2:
          status = "已驳回";
          break;
        case 3:
          status = "已打款";
          break;
        default:
      }
      return status;
    },
    withdrawStatusType: function(value) {
      let status;
      switch (value) {
        case -1:
          status = "danger";
          break;
        case 0:
          status = "warning";
          break;
        case 1:
          status = "success";
          break;
        case 2:
          status = "danger";
          break;
        case 3:
          status = "danger";
          break;
        case 4:
          status = "danger";
          break;
        case 5:
          status = "danger";
          break;
        case 6:
          status = "danger";
          break;
        default:
      }
      return status;
    }
  },
  components: {
    SearchItem
  },
  data() {
    return {
      type: 0,
      apply_name: "",
      apply_tel: "",
      status: "all",
      activeName: "all",
      name: "",
      tableData: [],
      currentPage: 1,
      pageCount: 10, // 分页总页数
      total: 10, // 分页总页数，
      params: {}
    };
  },
  //keep-alive激活的时候
  activated() {
    this.initData();
  },
  methods: {
    async initData(page, status, seartch) {
      const params = Object.assign(
        {},
        { page: this.currentPage },
        this.params,
        { type: this.type }
      );
      console.log(params);
      const data = await getWithdrawList(params);
      console.log(data);
      this.tableData = data.data;
      if (data.page) {
        this.total = data.page.total;
      } else {
        this.total = 0;
      }
    },

    toWidthPage: function(value) {
      let path;
      switch (value) {
        case 0:
          path = "/audit"; //审核中
          break;
        case 1:
          path = "/toplay"; //待打款
          break;
        case 2:
          path = "/rejected"; //已驳回
          break;
       case 3:
          path = "/havemoney"; //已打款
          break;
        default:
      }
      return path;
    },
    // 导出表格
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");

        const tHeader = [
          "提现编号",
          "申请人",
          "手机号",
          "微信用户",
          "提现额度",
          "提现时间",
          "提现状态",
        ]; // 上面设置Excel的表格第一行的标题

        const filterVal = [
          "withdraw_num",
          "apply_name",
          "apply_tel",
          "wechat_user",
          "amount",
          "pay_time",
          "status",
        
        ]; // 上面的index、nickName、name是tableData里对象的属性

        const list = this.tableData; //把data里的tableData存到list

        const data = this.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "列表excel"); //标题，数据，文件名
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleClick(tab, event) {
      const status = tab.name;
      this.status = status;
      this.params = status === "all" ? {} : { status };
      this.currentPage = 1;
      this.apply_name = "";
      this.apply_tel = "";
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

    //日期组件
    handlenSearchChange(e) {
      if (e.type == "time") {
        if (e.value) {
          this.params[e.param[0]] = e.value[0];
          this.params[e.param[1]] = e.value[1];
        } else {
          delete this.params[e.param[0]];
          delete this.params[e.param[1]];
        }
        this.currentPage = 1;
        this.initData();
        return;
      }

      if (e.value !== "") {
        this.params[e.param] = e.value;
      } else {
        delete this.params[e.param];
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
.selfTabs {
  position: relative;
  width: 100%;
}
.searchContainer {
  margin-right: 130px;
  display: flex;
  p {
    width: 5em;
  }
}
.search {
  padding-top: 10px;

  &-container {
    display: flex;
    justify-content: space-between;
    margin: 20px 20px;

    &-left {
      display: flex;

      &-item {
        display: flex;
        align-items: center;
        padding-right: 10px;
        /deep/.el-range-separator {
          padding: 0;
        }
        p {
          white-space: nowrap;
          padding-right: 6px;
        }
      }
    }
  }
}

.conditionContainer {
  height: 60px;
  margin-top: 20px;
}

.appendStyle {
  background-color: #409eff !important;
  color: #fff !important;
  border: 1px solid #409eff;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.titleText {
  color: #606266;
  // font-weight: 600;
  font-size: 14px;
}
.contentText {
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rowContainer {
  width: 100%;
  margin: 8px 0 8px 8px;
}
.colLine {
  width: 2px;
  height: 12px;
  border-radius: 2px;
  margin-right: 6px;
  background: #409eff;
}
.odrTitle {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #596174;
  margin-bottom: 18px;
}
.line {
  width: 100%;
  height: 1px;
  background: #ebeef5;
}
.titleText1 {
  font-size: 14px;
  font-weight: 600;
  color: #596174;
}
.contentText1 {
  font-size: 16px;
  font-weight: 600;
  color: #ff6f21;
}
.money {
  font-size: 10px;
}
.userCantainer {
  margin-left: 8px;
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}
.confirmContainer {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 10;
  top: 15px;
  right: 10px;
}
.headContainer {
  width: 100%;
  position: relative;
}
</style>