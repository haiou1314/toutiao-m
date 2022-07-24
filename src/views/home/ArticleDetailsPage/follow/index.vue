<template>
  <div>
    <van-button size="mini" round class="btn" @click="getFollow">{{
      isfollowed ? '关注' : '+ 关注'
    }}</van-button>
  </div>
</template>
<script>
import { deleteFollow, getFollow } from '@/api'
export default {
  props: {
    isfollowed: {
      type: Boolean
    },
    id: {
      type: String
    }
  },
  computed: {
    isdata () {
      return this.isfollowed
    }
  },
  methods: {
    async getFollow () {
      if (this.isdata === true) {
        try {
          await deleteFollow(this.id)
          this.$emit('fn')
        } catch (err) {
          this.$toast.fail('操作失败')
        }
      }
      if (this.isdata === false) {
        try {
          await getFollow(this.id)
          this.$emit('fn')
        } catch (err) {
          this.$toast.fail('操作失败')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  background-color: #3296fa;
  padding: 5px 15px;
  padding-top: 7px;
  color: #fff;
}
</style>
