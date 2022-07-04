import request from './request.js'
// import requestDownload from './requestDownload.js'
import url from './url'

export const getZen = (params?: String) => {
  return request({
    method: 'get',
    url: url.github.zen,
    params
  })
}

export const getRepositories = (data: String) => {
  return request({
    method: 'get',
    url: url.repositories(data),
    data
  })
}
