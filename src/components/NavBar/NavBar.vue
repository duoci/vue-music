<template>
  <div class="navBarContainer">
    <div class="navBar">
      <div
        class="barItem"
        :class="index === activeIndex ? 'active' : ''"
        v-for="(item, index) in navBarItem"
        :key="index"
        @click="clickBarItem(item.path, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        activeIndex: 0,
      };
    },
    props: {
      navBarItem: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    created() {
      this.navBarItem.forEach((item, index) => {
        if (decodeURI(this.$route.path).search(item.path) !== -1) {
          this.activeIndex = index;
        }
      });
    },
    methods: {
      clickBarItem(path, index) {
        if (this.activeIndex === index) {
          return;
        }
        this.activeIndex = index;
        this.$emit('clickBarItem', path);
      },
    },
  };
</script>

<style lang="less" scoped>
  .navBarContainer {
    height: 80px;
    width: 100%;
    position: relative;
    .navBar {
      display: flex;
      position: relative;
      left: 0px;
      top: 0;
      background-color: #fff;
      z-index: 100;
      width: 100%;
      color: rgb(49, 49, 49);
      align-items: center;
      padding: 20px 0 20px 20px;
    }

    .barItem {
      font-size: 18px;
      margin: 0 10px;
      text-align: center;
      cursor: pointer;
    }

    .active {
      font-size: 20px;
      color: black;
      font-weight: 600;
      padding-bottom: 5px;
      border-bottom: 3px solid #ec4141;
      transform: translateY(4px);
    }
  }
</style>
