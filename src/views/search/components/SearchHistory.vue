<template>
  <div>
    <!-- header -->
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon
            name="delete-o"
            v-if="btnisShow"
            @click="btnisShow = false"
          />
          <span v-else>
            <span class="text" @click="delHistory">全部删除&nbsp; </span>
            <span class="text" @click="btnisShow = true"> 完成 </span>
          </span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- senction -->
    <van-cell-group>
      <van-cell
        :title="item"
        v-for="(item, ind) in arr"
        :key="ind"
        @click="goToResult(item)"
      >
        <template #right-icon>
          <van-icon
            name="close"
            v-show="!btnisShow"
            @click="delHistorySingle(item)"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getSearchHistory, setSearchHistory } from '@/api'
export default {
  data () {
    return {
      arr: getSearchHistory() || [],
      btnisShow: true
    }
  },
  methods: {
    // 删除所有的历史搜索
    delHistory () {
      this.arr = []
      setSearchHistory([])
    },
    // 点击删单个历史搜索
    delHistorySingle (val) {
      console.log(val)
      const index = this.arr.findIndex((item) => item === val)
      console.log(index)
      this.arr.splice(index, 1)
      setSearchHistory(this.arr)
    },
    // 点击请求数据
    goToResult (val) {
      // console.log(val)
      this.$emit('goToResult', val)
    }
  }
}
</script>
<style lang="less" scoped>
.van-icon {
  margin-top: 3px;
  font-size: 15px;
}
.text {
  color: #666;
}
</style>
