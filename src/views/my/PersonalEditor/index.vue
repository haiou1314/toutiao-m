<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <!-- 头像 -->
    <userImage :photo="userData.photo" @userImage="userImagefn"></userImage>
    <!-- 头像 -->

    <!-- 昵称a -->
    <van-cell title="昵称" is-link :value="userData.name" @click="showName" />
    <van-popup
      v-model="isshowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <userName @close="isshowName = false" @userName="userNamefn"></userName>
    </van-popup>
    <!-- 昵称s -->

    <!-- 性别a -->
    <van-cell
      title="性别"
      is-link
      :value="userData.gender === 1 ? '女' : '男'"
      @click="showGender"
    />
    <van-popup
      v-model="isshowGender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <gender
        @usergender="usergenderfn"
        @clost="isshowGender = false"
        :value="userData.gender"
        v-if="isshowGender"
      ></gender>
    </van-popup>
    <!-- 性别s -->

    <!-- 生日a -->
    <van-cell
      title="生日"
      @click="isShowUpdateBirthdy = true"
      :value="userData.birthday || '1977-00-00'"
      is-link
    />
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <update-birthdy
        @birthdy="userProfileFn"
        v-model="userData.birthday"
        @close="isShowUpdateBirthdy = false"
      />
    </van-popup>
    <!-- 生日s -->
  </div>
</template>
<script>
import { userPersonalData } from '@/api'
import updateBirthdy from './components/birthday.vue'
import gender from './components/gender.vue'
import userName from './components/userName.vue'
import userImage from './components/userImage.vue'
export default {
  created () {
    this.userPersonalData()
  },
  data () {
    return {
      isshowGender: false,
      isshowName: false,
      isShowUpdateBirthdy: false,
      userData: {}
    }
  },
  components: {
    updateBirthdy,
    gender,
    userName,
    userImage
  },
  methods: {
    // 返回上一级
    onClickLeft () {
      this.$router.back()
    },
    // 获取用户个人资料
    async userPersonalData () {
      try {
        const {
          data: { data }
        } = await userPersonalData()
        console.log(data)
        this.userData = data
      } catch (error) {
        this.$toast.fail('请刷新重试')
      }
    },
    showName () {
      this.isshowName = true
    },
    showGender () {
      this.isshowGender = true
    },
    // 子组件上传的生日时间
    userProfileFn () {
      this.userPersonalData()
    },
    // 子组件上传的昵称
    userNamefn () {
      this.userPersonalData()
    },
    // 子组件上传的性别
    usergenderfn () {
      this.userPersonalData()
    },
    userImagefn () {
      this.userPersonalData()
    }
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-icon-arrow-left) {
    color: white;
  }
  :deep(.van-nav-bar__title) {
    color: white;
  }
}
</style>
