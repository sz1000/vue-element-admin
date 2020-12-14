<template>
  <div>
    <Preview>
      <el-carousel
        height="113px"
        arrow
        indicator-position="none"
        class="slideshow"
      >
        <el-carousel-item v-for="(item, index) in data1" :key="index">
          <img :src="item.imgUrl" alt="" srcset="" >
        </el-carousel-item>
      </el-carousel>
      <div class="categories">
        <div
          v-for="(item, index) in data2"
          :key="index"
          class="categories_item"
        >
          <img :src="item.ico_img" alt="" srcset="" >
          <p>
            {{ item.name }}
          </p>
        </div>
      </div>
      <img class="lt" src="@/assets/lt.jpg" alt="" srcset="" >
      <div class="commend">
        <div v-if="location3.length === 3" class="p1">
          <img :src="location3.length === 3 ? data3[0].imgUrl : ''" alt="" srcset="" >
        </div>
        <div class="p2">
          <div><img :src="location3.length === 3 ? data3[1].imgUrl : ''" alt="" srcset="" ></div>
          <div><img :src="location3.length === 3 ? data3[2].imgUrl : ''" alt="" srcset="" ></div>
        </div>
      </div>
      <div>
        <PhoneTitle title-name="医生资料">
          <div class="doctorContainer">
            <div v-for="(item, index) in data4" :key="index" :style="{ marginRight: index === 0 ? '5px' : '' }" class="doctorItem">
              <div class="doctorHead">
                <img :src="item ? item.avatar : ''" alt="" srcset="" >
              </div>
              <div class="doctorContent">
                <div>
                  <span style="font-weight: 800">{{ item ? item.name : '' }}</span>
                  <span>{{ item ? item.title : '' }}</span>
                </div>
                <div>
                  <span>{{ item ? item.hospital : '' }}</span>
                </div>
              </div>
            </div>
          </div>
        </PhoneTitle>
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
    location1: {
      type: Array,
      required: false,
      default: function(params) {
        return []
      }
    },
    location2: {
      type: Array,
      required: false,
      default: function(params) {
        return []
      }
    },
    location3: {
      type: Array,
      required: false,
      default: function(params) {
        return []
      }
    },
    location4: {
      type: Array,
      required: false,
      default: function(params) {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    data1: function() {
      return this.location1
    },
    data2: function() {
      return this.location2
    },
    data3: function() {
      if (this.location3.length === 3) {
        return this.location3
      }
    },
    data4: function() {
      return this.location4
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.slideshow {
  width: 100%;
  height: 113px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
.categories {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .categories_item {
    width: 20%;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: auto;
    }
    p {
      font-size: 10px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  }
}
.lt {
  margin-top: 8px;
  width: 100%;
  height: auto;
}
.commend {
  width: 100%;
  display: flex;
  .p1 {
    width: calc(40% - 5px);
    margin: 6px 0 6px 6px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .p2 {
    margin: 6px;
    width: calc(60% - 5px);
    img {
      width: 100%;
      height: auto;
    }
  }
}
.doctorContainer {
  width: 100%;
  margin-top: 20px;
  display: flex;
}
.doctorItem {
  width: calc(50% - 2.5px);
  border-radius: 8px;
  box-shadow: 0px 1px 5px #33333350;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .doctorHead {
    position: absolute;
    top: -20px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  .doctorContent {
    position: relative;
    padding: 30px 6px 10px 6px;
    font-size: 10px;
    text-align: center;

  }
}
</style>
