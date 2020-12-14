<template>
  <div>
    <Preview>
      <div style="width:100% ; position: relative;">
        <div class="carousel">
          <el-carousel height="228px" indicator-position="none">
            <el-carousel-item v-for="(item,index) in options.contentImgs" :key="index">
              <img :src="item" alt srcset>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <div v-if="options.type !== 2">
            <span class="payPrice">￥{{ options.price | priveToYuan }}</span>
            <span class="oriPrice">{{ options.oriPrice | priveToYuan }}</span>
          </div>
          <PhoneTitle title-name="项目名称">
            <div class="titleName">
              {{ options.name || '' }}
            </div>
          </PhoneTitle>
          <!-- <PhoneTitle title-name="预约价格">
            <div class="titleName price">
              $500
            </div>
          </PhoneTitle> -->
          <PhoneTitle title-name="项目简介">
            <div class="detailProdact" v-html="options.detail"/>
          </PhoneTitle>
          <div class="bottom">
            <div class="bottom-price">
              <div v-if="options.type !== 0">
                <span>
                  {{ options.type === 2 ? '预约支付:' : '全款支付:' }}
                </span>
                <span style="color:#F53A2F">
                  ￥{{ options.type === 1 ? options.payPrice : options.price | priveToYuan }}
                </span>
              </div>
              <div v-if="options.type === 1">
                <span>
                  到院再付:
                </span>
                <span>
                  ￥{{ (options.price - options.payPrice) | priveToYuan }}
                </span>
              </div>
              <div v-if="options.type === 2">
                <span>
                  到院支付:以实际沟通为准
                </span>
              </div>
            </div>
            <div class="bayBottom">
              <span style="font-weight: 600;">买</span>
              <span style="font-size:10px">折扣优惠</span>
            </div>
          </div>
        </div>
      </div>
    </Preview>
  </div>
</template>

<script>
import Preview from '@/components/Preview'
import PhoneTitle from '@/components/Phone/Title'

export default {
  components: {
    Preview,
    PhoneTitle
  },
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '',
          contentImgs: []
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    // optons: function() {
    //   return this.dataList
    // },
    // name: function(params) {
    //   return this.dataList.name.length > 0 ? this.dataList.name : '商品名称'
    // },
    // contentImgs: function() {
    //   if (this.dataList.contentImgs.length > 0) {
    //     return this.dataList.contentImgs
    //   } else {
    //     return ['https://vst.67zu.com/ft6vOTYCYGuAvpimf0d8PWfiiGBDPiL2.jpeg']
    //   }
    // },
    // detail: function() {
    //   return this.dataList.detail.length > 0 ? this.dataList.detail : '请在富文本区域编辑'
    // }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
}
.titleName{
  font-weight: 600;
}
.price{
  color: #F53A2F
}
.detail{
  img{
    width: 100%;
    height: auto;
  }
}
img{
  width: 100%;
  height: auto;
}
.wscnph{
  width: 100%;
  height: auto;
}
.payPrice{
  margin: 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #F53A2F
}
.oriPrice{
  font-size: 12px;
  color: #999999;
  text-decoration: line-through;
}
.bottom{
  box-shadow:0px -1px 1px #33333310;
  position:fixed;
  top: 635px;
  background: #fff;
  width: 250px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  &-price{
    margin-left: 4px;
    font-size: 10px;
    height: 35px;
    display: flex;
    flex-direction:column;
    justify-content: center;
  }
}
.bayBottom{
  width: 60px;
  height: 100%;
  background: #577FFA;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>
