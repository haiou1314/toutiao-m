<template>
  <div>
    <!-- 评论区域a -->
    <div class="comment" v-for="(item, ind) in reply" :key="ind">
      <div>
        <div>
          <van-image round width="36" height="36" :src="item.aut_photo" />
        </div>
        <div>{{ item.aut_name }}</div>
        <div>
          <span class="iconfont icon-dianzan">{{ item.reply_count }} 赞</span>
        </div>
      </div>
      <div>
        <p>{{ item.content }}</p>
        <div>{{ item.pubdate | articlepl }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import { getArticlecomment } from '@/api'
export default {
  data () {
    return {
      reply: []
    }
  },
  created () {
    this.getArticlecomment()
  },
  props: {
    cmmmentId: {
      type: [String, Number]
    }
  },
  methods: {
    // 获取评论的回复
    async getArticlecomment () {
      try {
        const res = await getArticlecomment('c', this.cmmmentId, 10)
        this.reply = res.data.data.results
        this.count = res.data.data.total_count
        this.$emit('count', res.data.data.total_count)
        console.log(res.data.data)
      } catch (error) {
        this.$toast.fail('请刷新重试')
      }
    }
  },
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
  .reply {
    margin-left: 100px;
    margin-top: -28px;
  }
}
</style>
