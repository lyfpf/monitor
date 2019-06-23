import request from '@/utils/request'

export function getMonitorList(params) {
  return request({
    url: '/monitor/all_monitor',
    method: 'get',
    params
  })
}

export function addMonitor(data) {
  return request({
    url: '/monitor/add_monitor',
    method: 'post',
    data
  })
}

export function updateMonitor(data) {
  return request({
    url: '/monitor/update_monitor',
    method: 'post',
    data
  })
}

export function getByIdMonitor(params) {
  return request({
    url: '/monitor/get_by_id_monitor',
    method: 'get',
    params
  })
}
