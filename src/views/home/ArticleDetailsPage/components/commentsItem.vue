<template>
  <div>
    <!-- 评论区域a -->
    <div class="comment" v-for="(item, ind) in comment" :key="ind">
      <div>
        <div>
          <van-image round width="36" height="36" :src="item.aut_photo" />
        </div>
        <div>{{ item.aut_name }}</div>
        <div>
          <span
            :class="{ dianzan: item.is_liking }"
            class="iconfont icon-dianzan"
            >{{ item.like_count }} 赞</span
          >
        </div>
      </div>
      <div>
        <p>{{ item.content }}</p>
        <div>
          {{ item.pubdate | articlepl }}
          <!-- <van-button size="mini" round @click="replyToReply"
            >回复{{ item.reply_count }}</van-button
          >
          <van-popup
            v-model="showReplyToReply"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '100%' }"
          /> -->
          <relyItem :item="item" class="reply"></relyItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import relyItem from './replyItem.vue'
export default {
  components: {
    relyItem
  },
  props: {
    comment: {
      type: Array
    }
  },
  //   格式化时间的
  filters: {
    articlepl (val) {
      const relativeTime = dayjs(val).fromNow()
      return `${relativeTime}`
    }
  }
}
</script>
<style lang="less" scoped>
.comment {
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(240, 237, 237);
  > div:nth-child(1) {
    color: #000;
    display: flex;
    align-items: center;
    justify-content: left;
    > div:nth-of-type(1) {
      flex: 1;
      color: #000;
    }
    > div:nth-of-type(2) {
      color: #000;
      text-align: left;
      flex: 5;
      margin-left: 10px;
    }
    > div:nth-of-type(3) {
      color: #000;
      flex: 1.5;
    }
  }
  > div:nth-of-type(2) {
    color: #000;
    text-align: left;
    box-sizing: border-box;
    padding-left: 55px;
    .van-button {
      height: 20px;
      padding: 0 10px;
      margin-left: 20px;
      margin-top: -20px;
    }
  }
  .reply{
    margin-left: 100px;
    margin-top: -28px;
  }
}

</style>
