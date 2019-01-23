import { debug } from './index'

export function requestSuccessFunc(requestObj) {
  if (debug)
    console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  return requestObj
}

export function requestFailFunc(requestError) {
  return Promise.reject(requestError)
}

export function responseSuccessFunc(responseObj) {
  const resData = responseObj.data
  const { code } = resData

  switch (code) {
    case '200':
      return resData.data
    case '404':
      window.location.href = ''
      return null
    default:
      return Promise.reject(resData)
  }
}

export function responseFailFunc(responseError) {
  return Promise.reject(responseError)
}
