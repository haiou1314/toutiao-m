<template>
  <div>
    <van-button size="mini" round @click="replyToReply"
      >回复{{ item.reply_count }}</van-button
    >
    <!-- title -->
    <van-popup
      v-model="showReplyToReply"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar :title="count" />
      <div class="comment">
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
          </div>
        </div>
      </div>
      <!--  -->
      <van-cell-group :border="false">
        <van-cell title="全部回复" />
      </van-cell-group>
      <replyVue
        :cmmmentId="item.com_id"
        @count="countfn"
        ref="reply"
      ></replyVue>
      <!--  -->
      <van-tabbar>
        <van-tabbar-item>
          <van-button class="btn" round @click="onrelease()">回复</van-button>
          <!--  -->
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '20%' }"
          >
            <van-field
              class="cell"
              v-model.trim="message"
              rows="3"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            >
            </van-field>
            <van-button
              class="btn2"
              size="mini"
              @click="releasefn(item.com_id, item.aut_id)"
              >发布</van-button
            >
          </van-popup>
          <!--  -->
        </van-tabbar-item>
      </van-tabbar>
    </van-popup>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import replyVue from './reply.vue'
import { getRelease } from '@/api'
export default {
  components: {
    replyVue
  },
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      message: '',
      showReplyToReply: false,
      title: ''
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    },
    count () {
      if (this.title === '0') {
        return '暂无评论'
      }
      return this.title + '评论'
    }
  },
  methods: {
    // 显示弹出框
    replyToReply () {
      this.showReplyToReply = true
    },
    countfn (val) {
      val = val + ''
      this.title = val
    },
    onrelease () {
      this.show = true
    },
    // 发布评论
    async releasefn (comId, autId) {
      if (this.message.length === 0) {
        this.$toast.fail('评论不能为空')
        return
      }
      if (!this.isLogin) {
        this.$toast.fail('请登录在评论')
        return
      }
      try {
        await getRelease(comId, this.message, autId)
        this.message = ''
        this.show = false
        this.$refs.reply.getArticlecomment()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('评论内容或者评论目标为空')
        } else if (error.response.status === 401) {
          this.$toast.fail('请登录在评论')
        }
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
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 40px;
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
    > .van-button {
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
:deep(.van-icon-close) {
  color: red;
  margin-top: -5px;
}
:deep(.van-tabbar-item) {
  background-color: rgb(36, 66, 131);
  .btn {
    margin-top: -5px;
    height: 40px;
    width: 300px;
  }
}
.cell {
  margin-top: 20px;
  margin-left: 20px;
  width: 300px;
  background-color: rgb(233, 227, 227);
}
.btn2 {
  position: relative;
  top: -60px;
  left: 320px;
  border: none;
}
</style>
