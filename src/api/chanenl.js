import request from '@/utils/request'
import storages from '@/utils/storage'

export const getMyChanenls = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const getAllMyChanenls = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const delMyChanenl = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}

export const addMyChanenl = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTAO_CHANNELS = 'HEIMA_TOUTAO_CHANNELS'
export const getMyChannelsByLocal = () => storages.get(HEIMA_TOUTAO_CHANNELS)
export const setMyChannelsByLocal = (channel) => storages.set(HEIMA_TOUTAO_CHANNELS, channel)
