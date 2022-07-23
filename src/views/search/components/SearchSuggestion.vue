<template>
  <div>
    <van-cell v-for="(item, ind) in highlightData" :key="ind" @click="fn(item)">
      <template #title>
        <van-icon name="search" />
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSeatchSuggeston } from '@/api'
export default {
  data () {
    return {
      options: []
    }
  },
  computed: {
    highlightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.options.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSeatchSuggeston () {
      try {
        const { data } = await getSeatchSuggeston(this.keywords)
        if (data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.options = data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    fn (val) {
      this.$emit('gotoindex', val)
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSeatchSuggeston()
      }
    }
  }
}
</script>
<style lang="less"></style>
