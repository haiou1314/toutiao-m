import request from '@/utils/request'
import storages from '@/utils/storage'
// 搜索建议
export const getSeatchSuggeston = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export const getSearchResult = (q, perPage, page) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: {
      q,
      per_page: perPage,
      page
    }
  })
}

const HEIMA_TOUTAO_HISTORY = 'HEIMA_TOUTAO_CHANNELS'
export const getSearchHistory = () => storages.get(HEIMA_TOUTAO_HISTORY)
export const setSearchHistory = (channel) => storages.set(HEIMA_TOUTAO_HISTORY, channel)
