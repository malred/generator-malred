// 封装的axios
import request from '../utils/request'

export const Hello = params => request({
    method: 'GET',
    url: '/hello',
    params
})