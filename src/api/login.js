import request from '@/utils/request'

export async function login (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '',
    method: 'post',
    data
  })
}

export async function logout () {
  return request({
    url: '',
    method: 'post'
  })
}
