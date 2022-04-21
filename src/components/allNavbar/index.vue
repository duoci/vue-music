<template>
  <div class="allNarbar">
    <div class="navlist">
      <div class="item" v-for="(item, index) in allNavBarData" :key="index" @click="clickNavItem(index)" :class="activeNum == index ? 'active' : ''">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'allNarbar',
    data() {
      return {
        activeNum: 0,
      };
    },
    props: {
      allNavBarData: {
        type: Array,
        default() {
          return [];
        },
      },
      itemWidth: {
        type: Number,
        default() {
          return 40;
        },
      },
      currentTag: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      clickNavItem(index) {
        if (this.activeNum === index) {
          return;
        }
        this.activeNum = index;
        this.$emit('clickNavBarItem', index);
      },
    },
  };
</script>

<style lang="less" scoped>
  .allNarbar {
    width: calc(100% - 60px);
    .navlist {
      display: flex;
      flex-wrap: wrap;
      line-height: 33px;

      .item {
        width: 76px;
        font-size: 14px;
        padding: 0 10px;
        text-align: center;
        cursor: pointer;
        &.active {
          background-color: #fdf5f5;
          color: #ec4747;
          border-radius: 11px;
        }
      }
    }
  }
</style>
