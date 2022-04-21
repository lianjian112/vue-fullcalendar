import request from '@/utils/request'

//修改密码验证码
export function rePwdCode(data) {
  return request({
    url: '/sms-api/rePwdCode',
    method: 'get',
    params: data
  })
}

//注册验证码
export function getSmsRegisterCode(data) {
  return request({
    url: '/sms-api/getSmsRegisterCode',
    method: 'get',
    params: data
  })
}

//注册下一步验证电话和验证码
export function checkMobile(data) {
  return request({
    url: '/clinic-api/checkMobile',
    method: 'get',
    params: data
  })
}

//注册提交
export function addClinic(data) {
  return request({
    url: '/clinic-api/addClinic',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
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
