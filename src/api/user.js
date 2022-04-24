import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user-api/login',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 随机字母+数字验证码
export function getKaptchaImg(data) {
  return request({
    url: '/captcha-api/getVerification',
    method: 'get',
    params: data
  })
}

