
<template>
    <div> 销售管理详情</div>
</template>
<script>
export default {
    data(){
        return{
             tableData: [],
      totalPage: 10,
      currentPage: 1,
      id: this.$route.query.id,
      logistics: "",
      logistics_num: "",
      logistics_status: "",
      customer_name: "",
      reciver: "",
      reciver_tel: "",
      avatar: "",
      nick_name: "",
      created_at: "",
      status: "",
      address: "",
      tel: "",
      order_num: "",
      order_time: "",
      pay_time: "",
      product_name: "",
      total_price: "",
      pay_price: "",
      odd_price: "",
      edit_logistics: "",
      edit_logistics_num: ""

        }
    },
    computed: {

    },
    mounted(){

    },
    methods:{

    }
    
}
  
</script>
<style lang="sass" scoped>

</style>
