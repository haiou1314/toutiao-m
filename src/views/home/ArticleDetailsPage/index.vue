<template>
  <div>
    <div class="title">
      <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="details">
      <!-- 标题 -->
      <h4>{{ articleDetailsPage.title }}</h4>
      <!--  -->
      <van-nav-bar left-text="返回" right-text="按钮" left-arrow>
        <template #left>
          <van-image
            round
            width="35"
            height="35"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="text">
            <span>{{ articleDetailsPage.aut_name }}<br /></span>
            <span>{{ articleDetailsPage.pubdate | articlepl }}</span>
          </div>
        </template>
        <template #right>
          <van-button size="mini" round>+ 关注</van-button>
        </template>
      </van-nav-bar>

      <!-- content -->
      <div
        class="box article-content markdown-body"
        v-html="articleDetailsPage.content"
      ></div>
    </div>
    <!-- footer -->
    <div class="footer">
      <p v-show="isshow">正文结束了</p>
      <!-- 展示评论的 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
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
              {{ item.pubdate | articlepl
              }}<van-button size="mini" round @click="replyToReply"
                >回复{{ item.reply_count }}</van-button
              >
              <van-popup
                v-model="showReplyToReply"
                closeable
                close-icon="close"
                position="bottom"
                :style="{ height: '100%' }"
              />
            </div>
          </div>
        </div>
        <!-- 评论区域s -->
      </van-list>
    </div>
    <div class="tabbar">
      <!-- 弹出层 -->
      <van-tabbar>
        <van-tabbar-item>
          <template #icon>
            <van-button @click="showPopup" round size="mini">写评论</van-button>
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '20%' }"
            >
              <van-field
                v-model="message"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
              >
              </van-field>
              <van-button class="btn" size="mini">发布</van-button>
            </van-popup>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon>
            <span class="iconfont icon-wenda"
              ><span class="pl">{{ total_count }}</span></span
            >
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon>
            <span class="iconfont icon-dianzan21"></span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon>
            <van-icon name="share" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {
  getArticleDetailsPage,
  setArticlesId,
  getArticlesId,
  getArticlecomment
} from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  created () {
    this.getArticleDetailsPage()
    this.getArticlecomment()
  },
  data () {
    return {
      showReplyToReply: true,
      loading: false,
      finished: false,
      articlesId: getArticlesId(),
      isshow: false,
      articleDetailsPage: {},
      show: false,
      message: '',
      comment: [],
      page: 10,
      total_count: 0
    }
  },
  // 处理时间的过滤器
  filters: {
    articlepl (val) {
      const relativeTime = dayjs(val).fromNow()
      return `${relativeTime}`
    }
  },
  methods: {
    // 根据文章id请求数据
    async getArticleDetailsPage () {
      // 保存文章id
      if (this.$route.params.id) {
        setArticlesId(this.$route.params.id)
      }
      try {
        const {
          data: { data }
        } = await getArticleDetailsPage(this.articlesId)
        this.articleDetailsPage = data
        this.isshow = true
        // console.log(this.articleDetailsPage)
      } catch (error) {
        this.$toast.fail('请刷新页面重试')
      }
    },
    // 返回上一级箭头
    onClickLeft () {
      this.$router.back()
    },
    showPopup () {
      this.show = true
    },
    // 获取文章评论
    async getArticlecomment () {
      try {
        const {
          data: { data }
        } = await getArticlecomment('a', this.articlesId, 10)
        this.comment = data.results
        console.log(data.results)
        this.total_count = data.total_count
        console.log(data)
      } catch (error) {
        this.$toast.fail('没有评论')
      }

      // console.log(data)
    },
    async onLoad () {
      try {
        // 最后一个评论的id,需要等待一下让先取到this.comment的数据不然会先触发这个事件导致取不到最后一个评论的id
        setTimeout(async () => {
          // 判断第一次取到评论没如果没有取到就不会在往下执行了
          if (this.comment.length === 0) {
            this.finished = true
            return
          }
          const comId = this.comment[this.comment.length - 1].com_id
          const res = await getArticlecomment('a', this.articlesId, 10, comId)
          if (res.data.data.results.length !== 0) {
            this.loading = false
            this.comment.push(...res.data.data.results)
          } else {
            this.finished = true
          }
        }, 100)
      } catch (error) {
        this.$toast.fail('获取评论失败请刷新重试')
      }
    },
    // 评论的评论
    replyToReply () {
      this.showReplyToReply = true
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.details {
  margin-top: 60px;
  font-size: 20px;
  box-sizing: border-box;
  padding: 0 10px;
  h4 {
    line-height: 30px;
    margin-bottom: 30px;
  }
  .text {
    display: flex;
    margin-left: 10px;
    flex-direction: column;
    justify-content: left;
    span:nth-of-type(2) {
      color: #999;
    }
  }
  .van-nav-bar {
    text-align: left;
  }
  .van-button {
    background-color: #3296fa;
    padding: 5px 15px;
    padding-top: 7px;
    color: #fff;
  }
  .box {
    color: #555;
    width: 360px;
    overflow: auto;
    font-size: 12px;
  }
}
.footer {
  text-align: center;
  color: #999;
  font-size: 15px;
  margin-bottom: 80px;
}
.tabbar {
  .pl {
    left: -3px;
    top: -8px;
    position: relative;
    font-size: 12px;
    color: red;
  }
  box-sizing: border-box;
  padding: 0 10px;
  .van-button {
    width: 150px;
    height: 22px;
    color: #999;
  }

  .van-cell {
    width: 300px;
    :deep(.van-field__control) {
      padding: 8px 8px;
    }
  }
  :deep(.van-cell__value) {
    background-color: rgb(248, 240, 240);
  }
  .btn {
    border: none;
    position: absolute;
    right: 30px;
    top: 50px;
    color: rgb(78, 78, 146);
    height: 40px;
    width: 50px;
  }
}
.comment {
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
}
.dianzan {
  color: red;
}
</style>
