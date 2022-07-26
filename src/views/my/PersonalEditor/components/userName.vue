<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>
<script>
import { userProfile } from '@/api'
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('close')
    },
    async onClickRight () {
      //   console.log(this.message)
      try {
        await userProfile({
          name: this.message
        })
        this.$emit('close')
        this.$emit('userName')
      } catch (error) {
        this.$toast.fail('用户名上传失败')
      }
    }
  }
}
</script>
<style lang="less"></style>
