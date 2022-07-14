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
        :rules="userForm.mobile"
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
        :rules="userForm.code"
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
export default {
  name: 'Login',
  data () {
    return {
      mobile: '13911111111',
      code: '',
      userForm: {
        mobile: [
          { required: true, message: '请填手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
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
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.formLogin.validate('mobile')
      } catch (error) {
        return console.log('失败')
      }
      this.iscountDownShow = true
      try {
        await sendSms(this.mobile)
        this.$toast.success('发送成功')
      } catch (error) {
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
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
