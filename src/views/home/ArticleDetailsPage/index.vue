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
          <!-- <van-button size="mini" round>+ 关注</van-button> -->
          <follow
            @fn="fn"
            :isfollowed="articleDetailsPage.is_followed"
            :id="articleDetailsPage.aut_id"
          ></follow>
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
        <!-- <div class="comment" v-for="(item, ind) in comment" :key="ind">
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
        </div> -->
        <commentsItemVue :comment="comment"></commentsItemVue>

        <!-- 评论区域s -->
      </van-list>
    </div>
    <div class="tabbar">
      <!-- 弹出层 -->
      <van-tabbar>
        <van-tabbar-item>
          <template #icon>
            <van-button @click="showpopup" round size="mini">写评论</van-button>
            <!-- 写回复 -->
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '20%' }"
            >
              <van-field
                v-model.trim="message"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
              >
              </van-field>
              <van-button class="btn" size="mini" @click="release"
                >发布</van-button
              >
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
            <shoucang
              :articleId="aut_id"
              :istrue="is_followed"
            ></shoucang>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon>
            <dianzan></dianzan>
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
  getArticlecomment,
  getRelease
} from '@/api'
import dayjs from '@/utils/dayjs'
import follow from './follow'
import commentsItemVue from './components/commentsItem.vue'
import shoucang from './components/shoucang.vue'
import dianzan from './components/dianzan.vue'
export default {
  created () {
    this.getArticleDetailsPage()
    // this.getArticlecomment()
  },
  components: {
    commentsItemVue,
    follow,
    shoucang,
    dianzan
  },
  data () {
    return {
      loading: false,
      finished: false,
      articlesId: getArticlesId(),
      isshow: false,
      articleDetailsPage: {},
      message: '',
      comment: [],
      page: 10,
      show: false,
      total_count: 0,
      aut_id: '',
      last_id: '',
      is_followed: '',
      art_id: ''
    }
  },
  // 处理时间的过滤器
  filters: {
    articlepl (val) {
      const relativeTime = dayjs(val).fromNow()
      return `${relativeTime}`
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    fn () {
      this.getArticleDetailsPage()
    },
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
        this.aut_id = data.aut_id
        this.is_followed = data.is_followed
        this.art_id = data.art_id
        console.log(data)
      } catch (error) {
        this.$toast.fail('请刷新页面重试')
      }
    },
    // 返回上一级箭头
    onClickLeft () {
      this.$router.back()
    },
    // 滚动到底部开始获取文章评论
    async onLoad () {
      try {
        const res = await getArticlecomment(
          'a',
          this.articlesId,
          10,
          this.last_id
        )
        // this.comment.push(...res.data.data.results)
        this.total_count = res.data.data.total_count

        if (res.data.data.results.length !== 0) {
          this.loading = false
          this.comment.push(...res.data.data.results)
          this.last_id = res.data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('获取评论失败')
      }

      // console.log(res.data.data)
    },
    showpopup () {
      this.show = true
    },
    // 发布评论
    async release () {
      if (this.message.length === 0) {
        this.$toast.fail('评论不能为空')
        return
      }
      if (!this.isLogin) {
        this.$toast.fail('请登录在评论')
        return
      }
      // console.log(this.message)
      // console.log(this.articlesId)
      // console.log(this.aut_id)
      try {
        await getRelease(this.articlesId, this.message)
        this.message = ''
        // console.log(res)
        this.show = false
        this.getArticlecomment()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('评论内容或者评论目标为空')
        } else if (error.response.status === 401) {
          this.$toast.fail('请登录在评论')
        }
      }
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
.bs {
  color: red;
}
</style>
