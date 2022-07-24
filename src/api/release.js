import request from '@/utils/request'
/**
 * 发布评论
 * @param {*} target 文章id
 * @param {*} content 内容
 * @param {*} artid 评论id
 * @returns promise
 */
export const getRelease = (target, content, artid) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content,
      art_id: artid
    }
  })
}
