<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onLoad"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, ind) in article"
          :key="ind"
          :articleinfo="item"
          @toDetails="toDetailsFn(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      article: [],
      pre_timestamp: '',
      error: false
    }
  },
  created () {
    this.getArticleList()
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.article = data.data.results
      } catch (error) {
        if (error.response.status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败请刷新重试')
        }
      }
    },
    async onLoad () {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
          return
        }
        if (this.refreshing) {
          this.article.unshift(...data.data.results)
        }
        this.article.push(...data.data.results)
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    // 跳转去详情页
    toDetailsFn (id) {
      this.$router.push({
        name: 'details',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="less"></style>
