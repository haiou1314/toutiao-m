<template>
  <div>
    <van-list
      v-model="loading"
      :error.sync="error"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, ind) in SearchResult"
        :key="ind"
        :title="item.title"
      ></van-cell>
    </van-list>
  </div>
</template>
<script>
import { getSearchResult, setSearchHistory, getSearchHistory } from '@/api'
export default {
  created () {
    this.getSearchResult()
    this.setSearchHistory()
  },
  data () {
    return {
      arr: getSearchHistory() || [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      index: 20,
      SearchResult: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const {
          data: { data }
        } = await getSearchResult(this.keywords, this.index, this.page)
        if (data.results.length === 0) {
          this.finished = true
          // this.$toast.fail('抱歉没有搜索结果')
          return
        }
        this.SearchResult = data.results
        console.log(data)
      } catch (error) {
        this.$toast.fail('请刷新重试')
      }
    },
    async onLoad () {
      this.index++
      try {
        const {
          data: { data }
        } = await getSearchResult(
          this.keywords,
          this.index,
          this.page * this.index
        )
        if (data.results.length === 0) {
          this.finished = true
          // this.$toast.fail('抱歉没有搜索结果')
          return
        }
        this.loading = false
        console.log(this.SearchResult)
        // console.log(1)
        // console.log(data.results)
        this.SearchResult.push(...data.results)
      } catch (error) {
        this.error = true
      }
    },
    // 存历史搜索
    setSearchHistory () {
      const istrue = this.arr.some((item) => item === this.keywords)
      if (!istrue) {
        this.arr.unshift(this.keywords)
      }
      setSearchHistory(this.arr)
    }
  }
}
</script>
<style lang="less"></style>
