<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        background="#3296FA"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="shiqujd"
      />
    </form>

    <!-- 搜索建议 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->

    <component
      :is="componentId"
      :keywords="value"
      @goToResult="fn"
      @gotoindex="fn2"
      ref="demo"
    ></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      value: '',
      isShowSeatchResult: false
    }
  },
  methods: {
    // 回车触发
    onSearch (val) {
      this.isShowSeatchResult = true
    },
    // 返回上一级
    onCancel () {
      this.$router.go(-1)
    },
    shiqujd () {
      this.isShowSeatchResult = false
    },
    // 点击搜索历史去建议
    fn (val) {
      this.value = val
      // console.log(val)
    },
    // 点击搜索建议去结果页
    fn2 (val) {
      val = val.replace(/<span (.*?)>(.*?)<\/span>/g)
      val = val.replace(/undefine/g, '')
      this.value = val
      this.isShowSeatchResult = true
    }
  },
  computed: {
    componentId () {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSeatchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
