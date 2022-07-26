<template>
  <div class="box1">
    <img :src="img" ref="img" />
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    img: {
      type: String
    }
  },
  data () {
    return {
      cropper1: ''
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper1 = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
}
img {
  width: 100%;
}
</style>
