<template>
  <div>
    <van-cell title="头像" is-link @click="fn">
      <template #default>
        <van-image width="30" round height="30" :src="photo" />
      </template>
    </van-cell>
    <!-- 文件选择框 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 弹出层 -->
    <van-popup
      v-model="isshowGender"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="poput">
        <!-- <img :src="img" ref="img" /> -->
        <imgage :img="img" class="jz" ref="img"></imgage>
        <div>
          <p @click="isshowGender = false">取消</p>
          <p @click="confirm">完成</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import Cropper from 'cropperjs'
// import 'cropperjs/dist/cropper.css'
import { updateUserPhoto } from '@/api'
import imgage from '../components/img.vue'
export default {
  components: {
    imgage
  },
  props: {
    photo: {
      type: String
    }
  },
  data () {
    return {
      isshowGender: false,
      img: null
    }
  },
  methods: {
    fn () {
      this.$refs.file.click()
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isshowGender = true
      this.$refs.file.value = ''
    },
    async confirm () {
      console.log(
        this.$refs.img.cropper1.getCroppedCanvas().toBlob(async (blob) => {
          const formData = new FormData()
          formData.append('photo', blob)
          try {
            await updateUserPhoto(formData)
            this.isshowGender = false
            this.$emit('userImage')
          } catch (error) {
            this.$toast.fail('上传头像失败')
          }
        })
      )
    }
  }
}
</script>
<style lang="less" scoped>
.jz {
  position: relative;
  top: 0;
}
.poput {
  display: block;
  width: 100%;
  height: 100%;
  // background-color: #000;
  div {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 20px;
      width: 40px;
      color: aliceblue;
    }
    p:nth-child(1) {
      position: absolute;
      left: 5px;
    }
    p:nth-child(2) {
      margin-left: 320px;
    }
  }
}
</style>
