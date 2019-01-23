export const baseUrl = ''

export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {},
}

export const debug = process.env.NODE_ENV === 'development'
