import request from '@/utils/request'
export function login(userName, password, captcha) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      password,
      captcha
    }
  })
}

export function getCaptcha() {
  return request({
    url: '/user/captcha',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/user_info',
    method: 'get'
  })
}
