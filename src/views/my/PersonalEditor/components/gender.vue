<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>
<script>
import { userProfile } from '@/api'
export default {
  props: {
    value: {
      type: Number
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      ind: 0
    }
  },
  methods: {
    async onConfirm () {
      try {
        await userProfile({
          gender: this.ind
        })
        this.$emit('usergender')
        this.$emit('clost')
      } catch (error) {
        this.$toast.fail('性别上传失败')
      }
    },
    onChange (picker, value, index) {
      this.ind = index
    },
    onCancel () {
      this.$emit('clost')
    }
  }
}
</script>
<style lang="less"></style>
