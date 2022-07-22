import request from '@/utils/request'
import storages from '@/utils/storage'
/**
 * 请求详情页数据的
 * @param {String} id 文章页面的id
 * @returns Pomsies
 */
export const getArticleDetailsPage = (id) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}

// 用来持久化文章Id的
const HEIMA_TOUTAO_ARTICLES = 'HEIMA_TOUTAO_ARTICLES'
export const getArticlesId = () => storages.get(HEIMA_TOUTAO_ARTICLES)
export const setArticlesId = (channel) => storages.set(HEIMA_TOUTAO_ARTICLES, channel)
