<template>
  <span
    class="iconfont icon-shoucang"
    :class="{ bs: istrue }"
    @click="islike"
  ></span>
</template>
<script>
import { addCollect, deleteCollect } from '@/api'
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
    async islike () {
      console.log()
      if (this.istrue === true) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
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
