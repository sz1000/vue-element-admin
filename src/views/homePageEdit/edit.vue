<template>
  <div>
    <div class="contant-container" style="margin-top:40px;">
      <div class="left-container">
        <TitleTabs text="预览" />
        <div class="sub-container">
          <homePagePreview
            :location1="location1"
            :location2="location2"
            :location3="location3"
            :location4="location4"
            class="homePage"
          />
        </div>
      </div>
      <!-- 右边了 -->
      <div class="right-container">
        <TitleTabs text="编辑" />
        <div class="sub-container">
          <div class="edit-container">
            <Row title="轮播图">
              <div class="slideshowContainer1">
                <div v-for="(item, index) in location1" :key="index" class="slideshowBox">
                  <div class="deleteItem" @click="deleteSlideItem(index)">
                    <i class="el-icon-circle-close" />
                  </div>
                  <slideshow :fixed-number="[750,340]" :value.sync="item" />
                </div>

                <div class="selectContainer newSlideshow" @click="addSlideshow">
                  <div class="addStyle">
                    <i style class="el-icon-plus avatar-uploader-icon" />
                    <p>添加图片</p>
                  </div>
                  <div>
                    <p>建议尺寸：750 * 340 像素</p>
                  </div>
                </div>
              </div>
            </Row>
            <Row title="类目">
              <categories :value.sync="location2" />
            </Row>

            <Row title="导航">
              <div class="wxapp_box">
                <draggable v-model="wxappNavList" class="wxappNav_container">
                  <div v-for="(item,index) in wxappNavList" :key="index" class="wxappNav_item" @click.stop="handleUpdateWxapp(index)">
                    <i v-if="!wxappNavSolt" class="el-icon-delete wxapp_item_delete" @click.stop="handleDeleteWxappNav(index)"/>
                    <el-image :src="item.icon.value" />
                    <div class="wxappNav_item_name">{{ item.name }}</div>
                  </div>
                  <div v-if="!wxappNavSolt" class="wxappNav_item addNav" @click="hangdleAddWxappNav">
                    <i class="el-icon-plus"/>
                  </div>
                </draggable>
                <div
                  :class="wxappNavSolt ? 'sort_button_action': ''"
                  class="sort_button"
                  size="small"
                  @click="handleSoltChange"
                >排序</div>

                <wxappNav
                  v-if="wxappDialogShow"
                  :data-item="wxappNavItem"
                  :type="wxappNavType"
                  :index="wxappNavItemIndex"
                  @cancle="handleWxappCancle"
                  @change="handleWxappNavChange" />
              </div>
            </Row>

            <Row title="特别推荐">
              <div v-for="(item, index) in location3" :key="index">
                <p>{{ location3Tip[index].name }}</p>
                <div class="location3">
                  <div class="delete" @click="deleteItem(index)">清空</div>
                  <slideshow
                    :fixed-number="location3Tip[index].fixedNumber"
                    :value.sync="location3[index]"
                  />
                </div>
              </div>
            </Row>
            <Row title="选择医生">
              <div v-for="(item, index) in location4" :key="index" class="doctor">
                <p>{{ index === 0 ? "位置一 (左侧)" : "位置二 (右侧)" }}</p>
                <selectDoctor :value.sync="location4[index]" />
              </div>
            </Row>
            <Row title="选择案例">
              <div>
                <AddList :value.sync="location5" :max="5" />
              </div>
            </Row>
            <el-button type="primary" style="width:100%; margin:50px 0;" @click="submitData">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTabs from '@/components/TitleTabs'
import Preview from '@/components/Preview'
import homePagePreview from './components/homePagePreview'
import Row from '@/components/Row'
import ImgCropper from '@/components/ImgCropper'
import AddList from '@/components/AddList'

import draggable from 'vuedraggable'

import slideshow from './components/slideshow'
import categories from './components/categories'
import selectDoctor from './components/selectDoctor'
import wxappNav from './components/wxappNav'

import { getCategoriesList } from '@/api/categories'
import { getHomePage, putHomePage } from '@/api/homePage'

export default {
  components: {
    draggable,
    TitleTabs,
    Preview,
    Row,
    homePagePreview,
    ImgCropper,
    slideshow,
    categories,
    selectDoctor,
    AddList,
    wxappNav
  },
  data() {
    return {
      wxappDialogShow: false,
      wxappNavSolt: false,
      categoriesTagter: [],
      wxappNavList: [],
      wxappNavItem: null,
      wxappNavType: 'add',
      wxappNavItemIndex: undefined,
      location1: [],
      location2: [],
      location3: [
        {
          bindId: '',
          imgUrl: '',
          type: '',
          temp: {
            label: '',
            router: ''
          }
        },
        {
          bindId: '',
          imgUrl: '',
          type: '',
          temp: {
            label: '',
            router: ''
          }
        },
        {
          bindId: '',
          imgUrl: '',
          type: '',
          temp: {
            label: '',
            router: ''
          }
        }
      ],
      location4: ['', ''],
      location5: [],
      location3Tip: [
        {
          name: '位置一（左侧）',
          fixedNumber: [152, 190]
        },
        {
          name: '位置二（右上）',
          fixedNumber: [422, 165]
        },
        {
          name: '位置三（右下）',
          fixedNumber: [422, 165]
        }
      ],
      temp: {}
    }
  },
  async mounted() {
    const servePage = await getHomePage()
    console.log('TCL: mounted -> servePage', servePage)
    if (servePage.data) {
      this.location1 = servePage.data.location1 ? servePage.data.location1 : []
      console.log('TCL: mounted -> this.location1 ', this.location1)

      this.location2 = servePage.data.location2 ? servePage.data.location2 : []
      this.location3 = servePage.data.location3
        ? servePage.data.location3
        : this.location3Init(servePage.data.location3)
      this.location4 = this.location4Init(servePage.data.location4)
      this.location5 = servePage.data.location5 || []
      this.wxappNavList = servePage.data.wxappNavList || []
    }
    const cateList = await getCategoriesList()
    this.categoriesList = cateList.data
  },
  methods: {
    deleteItem(index) {
      const tempObj = {
        bindId: '',
        imgUrl: '',
        type: '',
        temp: {
          label: '',
          router: ''
        }
      }
      this.location3.splice(index, 1, tempObj)
    },
    location3Init(data) {
      if (!data) {
        const teampData = []
        for (let index = 0; index < 3; index++) {
          teampData.push({
            bindId: '',
            imgUrl: '',
            type: '',
            temp: {
              label: '',
              router: ''
            }
          })
        }
        return teampData
      }
    },
    location4Init(data) {
      console.log('TCL: location4Init -> data', data)
      const tempData = []
      data.forEach((element, index) => {
        if (!element) {
          tempData.push({
            name: '',
            title: '',
            id: null
          })
        } else {
          tempData.push(element)
        }
      })
      return tempData
    },
    async submitData() {
      const data = {
        location1: this.location1,
        location2: this.location2,
        location3: this.location3,
        location4: this.location4,
        location5: this.location5,
        wxappNavList: this.wxappNavList
      }
      console.log('TCL: submitData -> data', data)
      await putHomePage(data).catch(err => {
        console.error('提交首页出错：', err)
        this.$message.error('保存失败！请检查网络，或者联系管理员。')
      })
      this.$message({
        message: '保存成功请前往小程序查看',
        type: 'success'
      })
      // this.$router.push({
      //   path: '/homePage/list'
      // })
    },
    deleteSlideItem(index) {
      console.log('TCL: deleteSlideItem -> index', index)
      this.location1.splice(index, 1)
    },
    addSlideshow() {
      if (this.location1.length < 4) {
        this.location1.push({
          bindId: '',
          imgUrl: '',
          type: '',
          temp: {
            label: '',
            router: ''
          }
        })
      } else {
        this.$message.error('轮播图最多只能添加四个！')
      }
    },
    handleWxappNavChange(e) {
      console.log('TCL: handleWxappNavChange -> e', e)

      if (e.type == 'add') {
        this.wxappNavList.push(e.data)
        this.wxappDialogShow = false
      } else {
        this.wxappNavList[e.index] = e.data
        this.wxappDialogShow = false
      }
    },
    handleSoltChange() {
      this.wxappNavSolt = !this.wxappNavSolt
    },
    hangdleAddWxappNav(e) {
      this.wxappNavType = 'add'
      this.wxappNavItem = {}
      this.wxappDialogShow = true
    },
    handleDeleteWxappNav(e) {
      this.wxappNavList.splice(e, 1)
    },
    handleUpdateWxapp(e) {
      console.log('TCL: 跟新 -> e', e)
      this.wxappNavType = 'update'
      this.wxappNavItemIndex = e
      this.wxappNavItem = this.wxappNavList[e]
      this.wxappDialogShow = true
    },
    handleWxappCancle(e) {
      this.wxappDialogShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  width: 240px;
  margin: 0 auto;
  padding-top: 40px;
}
.edit-container {
  padding-left: 30px;
  padding-top: 28px;
}
.slideshowContainer {
  width: 100%;
  height: 100px;
  background: #ffffff;
  border: 1px solid #d7dae2;
  border-radius: 2px;
  display: flex;
  align-items: center;
}
.addStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;
  font-weight: 500;
  p {
    color: #409eff;
    padding: 10px;
  }
}

.newSlideshow {
  width: 398px;
  height: 82px;
  p {
    font-size: 12px;
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.slideContainer {
  width: 398px;
  height: 100px;
  background: #ffffff;
  border: 1px solid #d7dae2;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.selectContainer {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.selectContainer:hover {
  border-color: #409eff;
}
.doctor {
  width: 398px;
  height: 100px;
  margin-bottom: 50px;
}
.homePage {
  position: fixed;
  top: 254px;
  margin-left: 70px;
}
.slideshowContainer1 {
  position: relative;
}
.slideshowBox {
  width: 398px;
  height: 100%;
  position: relative;
}
.deleteItem {
  position: absolute;
  z-index: 10;
  right: 0px;
  top: 0px;
  cursor: pointer;
  color: #85858598;
  font-size: 18px;
}
.delete {
  position: absolute;
  font-size: 12px;
  color: #fff;
  z-index: 100;
  right: 0px;
  top: 0;
  padding: 6px;
  border-bottom-left-radius: 10px;
  background: #66b1ff;
  cursor: pointer;
}
.location3 {
  width: 398px;
  position: relative;
}

.wxappNav_item {
  position: relative;
  cursor: pointer;
  width: 68px;
  height: 68px;
  background-color: #ffffff;
  margin: 4px;
  border-radius: 2px;
  border: 1px dashed #d9d9d9;
  .wxapp_item_delete{
    position: absolute;
    z-index: 999;
    top: -8px;
    right: -8px;
    color: #ffffff;
    background: #F56C6C;
    font-size: 12px;
    padding: 4px;
    border-radius: 10px;
  }
  &_name {
    position: absolute;
    bottom: 0;
    font-size: 10px;
    width: 68px;
    text-align: center;
    color: #596174;
  }
}
.wxappNav_container {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  border: 1px solid #59617430;
  border-radius: 4px;
  background: #ffffff;
}
.addNav{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #59617460;
}
.wxapp_box {
  // display: flex;
}
.sort_button {
  margin-top:4px;
  color: #409eff;
  background: #ffffff;
  padding: 8px 12px;
  font-size: 12px;
  border: #59617430 1px solid;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
}
.sort_button:focus,.sort_button:hover{
  color: #409eff;
  border: 1px solid #DCDFE6;
}

.sort_button_action{
  color: #ffffff;
  background: #409eff
}

</style>
