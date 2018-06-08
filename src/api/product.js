import request from '@/utils/requets'

export async function fetchList (query) {
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

export async function updateProduct (payload) {
  return request({
    url: '',
    method: 'post',
    payload
  })
}
