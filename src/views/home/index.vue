<template>
  <div>
    <!-- title -->
    <div>
      <van-nav-bar class="navbar">
        <template #title
          ><van-button type="default" class="van-button" round>
            <van-icon name="search" />
            搜索
          </van-button>
        </template>
      </van-nav-bar>
    </div>

    <!-- tabs -->
    <div class="box">
      <van-tabs v-model="active" swipeable line-width="20px" color="#3296fa">
        <van-tab :title="item.name" v-for="item in mychanenl" :key="item.id">
          <ArticleList :id="item.id"></ArticleList>
        </van-tab>
        <span class="iconfont icon-gengduo1" @click="showPopup"></span>
      </van-tabs>
    </div>

    <!-- zs -->
    <EditChannelPopup
      ref="box"
      :mychanenls="mychanenl"
      @delmychanenls="delfn"
      @active_channel="active_channelfn"
      @add-mychannel="addmychannelfn"
    ></EditChannelPopup>
  </div>
</template>
<script>
import {
  getMyChanenls,
  setMyChannelsByLocal,
  getMyChannelsByLocal,
  delMyChanenl,
  addMyChanenl
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  components: {
    ArticleList,
    EditChannelPopup
  },
  created () {
    this.getMychanenl()
  },
  data () {
    return {
      show: false,
      active: 0,
      mychanenl: []
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getMychanenl () {
      try {
        // const { data } = await getMyChanenls()
        // this.mychanenl = data.data.channels
        if (!this.isLogin) {
          const mychanenls = getMyChannelsByLocal()
          if (mychanenls) {
            this.mychanenl = mychanenls
          } else {
            const { data } = await getMyChanenls()
            this.mychanenl = data.data.channels
          }
        } else {
          // 是登录
          const { data } = await getMyChanenls()
          this.mychanenl = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请刷新重试')
      }
    },
    showPopup () {
      this.$refs.box.show = true
    },
    active_channelfn (ind) {
      this.active = ind
    },
    async delfn (id) {
      this.mychanenl = this.mychanenl.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelsByLocal(this.mychanenl)
      } else {
        //
        try {
          await delMyChanenl(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    async addmychannelfn (val) {
      this.mychanenl.push(val)
      if (!this.isLogin) {
        setMyChannelsByLocal(this.mychanenl)
      } else {
        //
        try {
          await addMyChanenl(val.id, this.mychanenl.length)
        } catch (error) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      this.$toast.success('添加用户频道成功')
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  .van-button {
    width: 275px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs
.box {
  margin-top: 0;
  .icon-gengduo {
    position: absolute;
  }
  :deep(.van-tab) {
    margin-right: 25px;
  }
  /* 字体图标 */
  .icon-gengduo1 {
    z-index: 555;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    height: 41px;
    font-size: 20px;
    line-height: 41px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 60px;
  left: 0;
  z-index: 1;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 90px - 41px);
  overflow: auto;
}
</style>
