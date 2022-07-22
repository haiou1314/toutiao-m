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
            <span>{{ articlepl }}</span>
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
      <p v-show="isshow">没有更多了</p>
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
            <span class="iconfont icon-wenda"></span>
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
import { getArticleDetailsPage, setArticlesId, getArticlesId } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  created () {
    this.getArticleDetailsPage()
  },
  data () {
    return {
      articlesId: getArticlesId(),
      isshow: false,
      articleDetailsPage: {},
      show: false,
      message: ''
    }
  },
  computed: {
    articlepl () {
      const relativeTime = dayjs(this.articleDetailsPage.pubdate).fromNow()
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
        console.log(this.articleDetailsPage)
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
</style>
