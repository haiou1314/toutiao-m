<template>
  <div>
    <div class="update-birthdy">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>
<script>
import dayJs from 'dayjs'
import { userProfile } from '@/api'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      const val = dayJs(this.currentDate).format('YYYY-MM-DD')
      console.log(val + '')
      await userProfile({
        birthday: val
      })
      this.$emit('birthdy')
      this.$emit('close')
    }
  }
}
</script>
<style lang="less"></style>
