<template>
  <span
    class="iconfont icon-shoucang"
    :class="{ bs: istrue }"
    @click="fn"
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
    async fn () {
      console.log(this.istrue)
      const id = this.articleId
      console.log(parseInt(id))
      try {
        if (this.istrue === false) {
          await addCollect(id)
        }
        if (this.istrue === true) {
          await deleteCollect(id)
        }
      } catch (error) {
        this.$toast.fail('操作失败')
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
