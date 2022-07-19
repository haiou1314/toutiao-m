<template>
  <div>
    <!-- 0张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 0">
        <van-cell :title="articleinfo.title" :label="articlepl" />
      </van-cell-group>
    </div>

    <!-- 1张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 1">
        <van-cell :title="articleinfo.title" :label="articlepl" />
      </van-cell-group>
    </div>

    <!-- 3张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 3">
        <van-cell :title="articleinfo.title" :label="articlepl">
          <template #label>
            <van-image
              v-for="(item,ind) in articleinfo.cover.images"
              :key="ind"
              width="80"
              height="80"
              :src="item"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleinfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articlepl () {
      const relativeTime = dayjs(this.articleinfo.pubdate).fromNow()
      return `${this.articleinfo.aut_name} ${relativeTime}`
    }
  }
}
</script>
<style lang="less"></style>
