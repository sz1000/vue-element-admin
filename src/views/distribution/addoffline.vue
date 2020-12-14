<template>
  <div class="container">
    <TitleTabs text="新增线下消费记录" />
    <div class="content">
      <el-form
        ref="ruleForm"
        :model="submitData"
        :rules="rules"
        class="form-container"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="submitData.name" type="text" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="submitData.price" type="text" placeholder="请输入商品价格" />
        </el-form-item>
        <el-form-item label="耗卡医院">
          <el-input v-model="submitData.hospital" type="text" placeholder="请输入耗卡医院名称" />
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="submitData.address" placeholder="请输入收货地址" type="textarea" />
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="submitData.appoint_time"
            :picker-options="pickerOptions"
            style="width:100%"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button @click="handleReturn">返回</el-button>
        <el-button type="primary" @click="handleSumiteData">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postAppointment, getAppointment } from "@/api/appointment";

import TitleTabs from "@/components/TitleTabs";
export default {
  components: {
    TitleTabs
  },
  data() {
    return {
      selectType: "",
      pickerOptions: {
        disabledDate: currentTime => {
          return Date.now() > currentTime.getTime() + 3600 * 1000 * 24;
        }
      },
      submitData: {
        name: "",
        price: "",
        address: "",
        hospital: "",
        appoint_time: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { required: true, message: "请输入正确的手机号", len: 11 }
        ],
        item_type: [{ required: true, message: "请选择服务" }],
        appoint_time: [
          { required: true, message: "请选择预约到院的时间", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.initData(this.$route.query.id);
    }
  },
  methods: {
    initData(id) {
      getAppointment(id)
        .then(res => {
          this.submitData = res.data;
        })
        .catch(err => {});
    },
    handleSumiteData() {

    },
    handleReturn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  box-shadow: 0px 0px 5px 0px rgba(12, 6, 14, 0.1);
}
.content {
  background: #f7f7f7;
  border-radius: 2px;
  min-height: 100vh;
  padding: 30px;
}
.form-container {
  width: 400px;
  // margin: 0 auto;
}
.card-container {
  height: 80px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;

  color: #596174;
  line-height: 24px;
  &-left {
    margin: 4px;
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border: 1px dotted #e4e7ed;
      color: #596174;
    }
  }
  &-right {
    .target {
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      padding-left: 4px;
      margin-right: 4px;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.button-container {
  width: 400px;
  display: flex;
  justify-content: center;
}
</style>

