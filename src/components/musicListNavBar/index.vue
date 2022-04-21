<template>
  <div class="musiclistnavbar">
    <div class="left">
      <el-popover
        placement="bottom-start"
        width="350"
        popper-class="sortPop"
        trigger="click"
        :visible-arrow="false"
        v-model="isSortPopShow"
        @show="showSortPop"
      >
        <div class="SortBox" slot="reference">{{ currentTag.name }} <i class="iconfont icon-arrow-right-bold"></i></div>
        <div class="tips" v-if="sortList.length == 0">正在加载分类数据...</div>
        <div class="sortList" v-else>
          <div
            class="sortItme"
            :class="currentTag.name == item.name ? 'currentItem' : ''"
            v-for="(item, index) in sortList"
            :key="index"
            @click="clickItem(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="right">
      <div class="navlist">
        <div class="item" v-for="(item, index) in navData" :key="index" @click="clickNavItem(index)" :class="activeNum == index ? 'active' : ''">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'musiclistnavbar',
    props: {
      sortList: {
        type: Array,
        default() {
          return [];
        },
      },
      currentTag: {
        type: Object,
        default() {
          return {};
        },
      },
      navData: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        isSortPopShow: false,
        activeNum: 0,
      };
    },
    methods: {
      showSortPop() {
        // 判断是否有sortList数据
        if (this.sortList.length === 0) {
          this.$emit('getSortList');
        }
      },
      // 点击分类item的回调
      clickItem(item) {
        this.$emit('clickSortBoxItem', item);
        this.isSortPopShow = false;
      },
      clickNavItem(index) {
        if (this.activeNum === index) {
          return;
        }
        this.activeNum = index;
        this.$emit('clickSecondBarItem', index);
      },
    },
    watch: {
      currentTag(current) {
        this.activeNum = this.navData.findIndex(item => {
          return item.name === current.name;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .musiclistnavbar {
    display: flex;
    justify-content: space-between;
    .left {
      .SortBox {
        width: 105px;
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        cursor: pointer;
        transform: scale(0.9);
        text-align: center;
        font-size: 15px;
        i {
          font-size: 14px;
        }
      }
      .sortList {
        display: flex;
      }
    }
    .right {
      .navlist {
        display: flex;
        align-items: center;
        line-height: 33px;
        .item {
          font-size: 14px;
          padding: 0 10px;
          cursor: pointer;
          &.active {
            background-color: #fdf5f5;
            color: #ec4747;
            border-radius: 11px;
          }
        }
      }
    }
  }
</style>
