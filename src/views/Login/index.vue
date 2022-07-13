<template>
  <div>
    <!-- title -->
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      class="navBar"
    >
      <template #left>
        <van-icon name="cross" @click="backpage" />
      </template>
    </van-nav-bar>
    <!-- section -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma1"></span>
        </template>

        <template #right-icon>
          <van-button block class="code_btn" size="mini">发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="button"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    backpage () {
      this.$router.back()
    },
    onSubmit () {
      login(this.mobile, this.code)
    }
  }
}
</script>
<style scoped lang="less">
.navBar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: white;
  }
  .van-icon-cross {
    color: white;
  }
}
.from {
  :deep(.van-field__label) {
    flex: 0.1;
  }
  :deep(.van-field__control) {
    flex: 20;
  }
  .iconfont {
    font-size: 0.5rem;
  }
  .button {
    border-radius: 5px;
  }
  .code_btn {
    padding: 0 4px;
    border-radius: 10px;
    background-color: rgb(233, 227, 227);
  }
}
</style>
