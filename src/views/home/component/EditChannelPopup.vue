<template>
  <van-popup
    close-icon-position="right"
    v-model="show"
    position="bottom"
    :style="{ height: '98%' }"
  >
    <div @click="show = false" class="x">x</div>
    <div class="box">
      <div>
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
      </div>

      <div>
        <van-grid :border="false" gutter="8">
          <van-grid-item
            :text="item.name"
            v-for="(item, ind) in mychanenls"
            :key="item.id"
            @click="onChanal(item, ind)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <div>
        <div>
          <van-cell title="推荐频道"> </van-cell>
        </div>

        <div>
          <van-grid :border="false" gutter="8">
            <van-grid-item
              :text="item.name"
              v-for="(item, ind) in tecommendChannels"
              :key="ind"
              @click="addmychannel(item)"
            >
              <template #icon> <van-icon name="plus" /> </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getAllMyChanenls } from '@/api'
export default {
  props: {
    mychanenls: {
      type: Array,
      require: true
    }
  },
  created () {
    this.getAllMyChanenls()
  },
  data () {
    return {
      isEdit: false,
      show: false,
      allMyChanenls: []
    }
  },
  methods: {
    async getAllMyChanenls () {
      const {
        data: { data }
      } = await getAllMyChanenls()
      this.allMyChanenls = data.channels
    },
    onChanal (val, ind) {
      if (this.isEdit && val.name !== '推荐') {
        return this.$emit('delmychanenls', val.id)
      }
      if (!this.isEdit) {
        this.show = false
        this.$emit('active_channel', ind)
      }
    },
    addmychannel (ind) {
      this.$emit('add-mychannel', { ...ind })
    }
  },
  computed: {
    tecommendChannels () {
      return this.allMyChanenls.filter(
        (item) => !this.mychanenls.find((i) => i.id === item.id)
      )
    }
  }
}
</script>
<style lang="less">
.x {
  font-size: 25px;
  color: rgb(218, 214, 210);
  margin: 5px;
}
.box {
  .btn {
    border: red solid 1px;
    width: 60px;
    height: 30px;
  }
  margin-top: 60px;
  button {
    color: red;
  }
  > div:nth-of-type(2) {
    .van-grid-item__content {
      background-color: #f4f5f6;
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          font-size: 12px;
          width: 15px;
          height: 15px;
          position: absolute;
          top: 5px;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid rgb(197, 196, 196);
          border-radius: 50%;
          text-align: center;
          line-height: 15px;
        }
      }
    }
  }

  > div:nth-of-type(3) {
    .van-grid-item__content {
      padding-left: 25px;
      background-color: #f4f5f6;
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-plus {
          font-size: 20px;
          width: 15px;
          height: 15px;
          position: absolute;
          top: 18px;
          left: -80px;
          border-radius: 50%;
          text-align: center;
          line-height: 15px;
        }
      }
    }
  }
}
.color {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
</style>
