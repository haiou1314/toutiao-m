import request from '@/utils/request'
/**
 * 编辑用户个人资料
 * @param {*} name 昵称
 * @param {*} gender 性别
 * @param {*} birthday 生日
 * @param {*} realName 真实姓名
 * @param {*} intro 个人介绍
 * @returns promise
 */
export const userProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

export const userPersonalData = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新头像
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
