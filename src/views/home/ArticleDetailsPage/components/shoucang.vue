<template>
  <span
    class="iconfont icon-shoucang"
    :class="{ bs: istrue }"
    @click="fn"
  ></span>
</template>
<script>
import { addCollect } from '@/api'
export default {
  props: {
    istrue: {
      type: Boolean
    },
    articleId: {
      type: String
    }
  },
  methods: {
    async fn () {
      console.log(this.istrue)
      const id = this.articleId
      console.log(parseInt(id))
      if (this.istrue === false) {
        addCollect(id)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bs {
  color: red;
}
</style>
