import request from '@/utils/request'

export function getErrorInfoList(params) {
  return request({
    url: '/errorInfo/all_info',
    method: 'get',
    params
  })
}

export function deleteErrorInfo(data) {
  return request({
    url: '/errorInfo/delete_info',
    method: 'post',
    data
  })
}
