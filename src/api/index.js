let baseUrl = ''
let userBaseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api'
  userBaseUrl = '/api'
  // baseUrl = '/api/api-gateway-user'
  // userBaseUrl = '/api/api-gateway-user'
} else if (process.env.NODE_ENV === 'debug') {
  baseUrl = ''
  userBaseUrl = ''
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = `${location.origin}/api-gateway-user`
  userBaseUrl = `${location.origin}/api-gateway-user`
}

let apisObj = {}

const apiContext = require.context('./', true, /\.js$/)

apiContext.keys().forEach(api => {
  const apiModule = apiContext(api)

  const apis = apiModule.default || apiModule

  const key = apis.name

  delete apis.name

  let module = ''

  if (apis.module) {
    module = apis.module
  }

  for (const k in apis) {
    if (key === 'USER') {
      apis[k] = `${userBaseUrl}${module}${apis[k]}`
    } else {
      apis[k] = `${baseUrl}${module}${apis[k]}`
    }
  }

  const obj = {
    [key]: apis
  }

  apisObj = Object.assign(apisObj, obj)
})

export default apisObj
