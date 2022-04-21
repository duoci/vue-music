<template>
  <div class="rankingTab">
    <div class="tabBox">
      <div class="left">
        <img :src="officialListDetailItem.coverImgUrl" alt="" class="auto-img" @click="clickCheckAll(officialListDetailItem.id)" />
      </div>
      <div class="right">
        <table>
          <tr
            v-for="(item, index) in officialListDetailItem.tracks.slice(0, 5)"
            :key="index"
            class="listRows"
            @dblclick="handleRowDbClick(officialListDetailItem.id, index)"
          >
            <th class="index">{{ index + 1 }}</th>
            <th class="musicName">{{ item.name }}</th>
            <th class="singer">{{ item.ar[0].name }}</th>
          </tr>
        </table>
        <div class="lookAll" @click="clickCheckAll(officialListDetailItem.id)">查看全部<i class="iconfont icon-arrow-right-bold"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rankingTab',
    props: {
      officialListDetailItem: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      // 双击行的回调 播放
      // id 为当前歌单的id index为双击歌曲在歌单的索引
      handleRowDbClick(id, index) {
        const { listId } = this;
        this.$emit('handleRowDbClick', { id, index, listId });
      },
      clickCheckAll(id) {
        const { listId } = this;
        this.$emit('clickCheckAll', { id, listId });
      },
    },
  };
</script>

<style lang="less" scoped>
  .rankingTab {
    margin-bottom: 30px;
    .tabBox {
      display: flex;
      min-width: 700px;
      .left {
        width: 200px;
        margin-right: 30px;
        img {
          overflow: hidden;
          border-radius: 20px;
        }
      }
      .right {
        width: calc(100% - 200px);
        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 5px;
          overflow: hidden;
        }
        .listRows {
          height: 38px;
          font-size: 12px;
          color: rgb(153, 153, 153);
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          &:nth-child(odd) {
            background-color: #f9f9f9;
          }
          &:hover {
            background-color: #f4f4f4;
          }

          td {
            transform: scale(0.9);
          }
          .index {
            width: 50px;
          }
          .musicName {
            color: #757575;
            transform: translate(-5%, -5%) scale(0.9);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 50%;
            text-align: left;
            font-size: 12px;
          }
          .singer {
            text-align: right;
            position: absolute;
            right: 10px;
          }
        }
        .lookAll {
          font-size: 14px;
          color: rgb(112, 110, 110);
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
