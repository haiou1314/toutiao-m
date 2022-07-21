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

    <component :is="componentId" :keywords="value"></component>
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
