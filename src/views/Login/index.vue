<template>
  <div>
    <!-- title -->
    <van-nav-bar title="标题" left-arrow class="navBar">
      <template #left>
        <van-icon name="cross" @click="backpage" />
      </template>
    </van-nav-bar>
    <!-- section -->
    <van-form @submit="onSubmit" class="from" ref="formLogin">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRuler"
        maxlength="11"
        type="number"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="codeRuler"
        maxlength="6"
        type="number"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma1"></span>
        </template>

        <template #right-icon>
          <van-count-down
            :time="1000 * 5"
            format="ss s"
            v-if="iscountDownShow"
            @finish="iscountDownShow = false"
          />
          <van-button
            v-else
            block
            class="code_btn"
            size="mini"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
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
import { login, sendSms } from '@/api/user'
import { mobileRuler, codeRuler } from './ruler'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '13911111111',
      code: '',
      mobileRuler,
      codeRuler,
      iscountDownShow: false
    }
  },
  methods: {
    backpage () {
      this.$router.back()
    },
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
        console.log(res)
      } catch (error) {
        const status = error.response.status
        let message = '登录失败，请稍后重试'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.formLogin.validate('mobile')
        await sendSms(this.mobile)
        this.iscountDownShow = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail(error.response.data.message)
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
