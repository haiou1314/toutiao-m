<template>
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部标签 -->
    <van-tabbar v-model="active" class="icon">
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>

      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode1"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less">
.icon {
  .iconfont {
    font-size: 20px;
  }
}
</style>
