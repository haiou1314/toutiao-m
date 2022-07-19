<template>
  <div>
    <div class="my">
      <div class="header" v-if="isLogin">
        <div class="headerDl">
          <div>
            <van-image
              class="avater"
              width="66"
              height="66"
              round
              fit="cover"
              :src="userInfo.photo"
            />
            <span class="text">{{ userInfo.name }}</span>
          </div>
          <van-button size="mini" class="btn">编辑资料</van-button>
        </div>

        <div class="box">
          <div>
            <p>{{ userInfo.art_count }}</p>
            <p>头条</p>
          </div>
          <div>
            <p>{{ userInfo.like_count }}</p>
            <p>关注</p>
          </div>
          <div>
            <p>{{ userInfo.fans_count }}</p>
            <p>粉丝</p>
          </div>
          <div>
            <p>{{ userInfo.follow_count }}</p>
            <p>获赞</p>
          </div>
        </div>
      </div>

      <div class="header" v-else>
        <div @click="$router.push('/login')" class="headerBar">
          <img src="@/assets/img/mobile.png" alt="" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>

      <!-- 收藏 -->
      <van-grid :column-num="2" class="item" clickable>
        <van-grid-item>
          <i slot="icon" class="iconfont icon-shoucang1"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="iconfont icon-lishi1"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- 单元格导航 -->
      <van-cell title="消息通知" is-link class="xiaoxi" />
      <van-cell title="小智同学" is-link />
      <van-cell
        class="logout-cell"
        title="退出登录"
        center
        v-if="isLogin"
        @click="loginout"
      />
    </div>
  </div>
</template>
<script>
import { getuserinfo } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getuserinfo()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    loginout () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    async getuserinfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getuserinfo()
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>
<style lang="less">
.my {
  height: calc(100vh - 60px);
  background-color: rgb(245, 239, 239);
}
.xiaoxi {
  margin-top: 10px;
}
.logout-cell {
  text-align: center;
  color: #d86262;
  margin: 5px 0;
  font-size: 15px;
}
.header {
  flex-direction: column;
  display: flex;
  height: 210px;
  background: url('@/assets/img/banner.png') no-repeat center;
  background-size: cover;
  .headerBar {
    margin-top: 78px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 66px;
      width: 66px;
    }
    .text {
      margin-top: 8px;
      font-size: 14px;
      color: white;
    }
  }

  .headerDl {
    margin-top: 58px;
    box-sizing: border-box;
    padding: 0 16px;
    height: 66px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avater {
      border: 1px solid white;
    }
    .text {
      margin-left: 11px;
      font-size: 15px;
      color: white;
    }
    .btn {
      width: 58px;
      height: 18px;
      border-radius: 10px;
      align-items: center;
    }
  }
  .box {
    margin-top: 0;
    height: 65px;
    justify-content: space-around;
    display: flex;
    div {
      height: 10px;
      text-align: center;
      p {
        height: 10px;
        font-size: 18px;
        color: white;
      }
      :nth-child(2) {
        font-size: 12px;
      }
    }
  }
}
.item {
  height: 70px;
  font-size: 14px;
  .iconfont {
    margin-bottom: 8px;
    font-size: 23px;
  }
  .icon-shoucang1 {
    color: #eb5253;
  }
  .icon-lishi1 {
    color: #ff9d1d;
  }
}
</style>
