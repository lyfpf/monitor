import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/user/all_user',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add_user',
    method: 'post',
    data
  })
}

export function userDetailInfo(data) {
  return request({
    url: '/user/detail_info',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/update_password',
    method: 'post',
    data
  })
}

export function updataUserInfo(data) {
  return request({
    url: '/user/update_info',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete_user',
    method: 'post',
    data
  })
}
