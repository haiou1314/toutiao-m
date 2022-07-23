import request from '@/utils/request'
/**
 *获取评论的
 * @param {String} type 评论类型
 * @param {String} source 文章id
 * @returns Promise
 */
export const getArticlecomment = (type, source, limit, offset) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: {
      type,
      source,
      limit,
      offset
    }
  })
}
