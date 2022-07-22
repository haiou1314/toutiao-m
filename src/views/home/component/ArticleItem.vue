<template>
  <div @click="toDetails">
    <!-- 0张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 0">
        <van-cell :title="articleinfo.title" :label="articlepl" />
      </van-cell-group>
    </div>

    <!-- 1张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 1">
        <van-cell :title="articleinfo.title">
          <template #default>
            <van-image
              width="80"
              height="80"
              :src="articleinfo.cover.images[0]"
            />
          </template>
          <template #label> {{ articlepl }} </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 3张图片的 -->
    <div>
      <van-cell-group v-if="articleinfo.cover.type === 3">
        <van-cell :title="articleinfo.title">
          <template #label>
            <van-image
              v-for="(item, ind) in articleinfo.cover.images"
              :key="ind"
              width="80"
              height="80"
              :src="item"
            />
            <p>{{ articlepl }}</p>
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
  },
  methods: {
    toDetails () {
      this.$emit('toDetails')
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell__label {
  .van-image {
    margin-left: 51px;
  }
  .van-image:nth-of-type(1) {
    margin-left: 0px;
  }
}
</style>
