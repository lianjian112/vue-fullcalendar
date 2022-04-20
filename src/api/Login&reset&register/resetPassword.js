import request from '@/utils/request'

export function rePwdCode(data) {
  return request({
    url: '/sms-api/rePwdCode',
    method: 'get',
    params: data
  })
}

//重置密码
export function rePassword(data) {
  return request({
    url: '/user-api/rePassword',
    method: 'post',
    data
  })
}
