let componentsObj = {}

const componentContext = require.context('./', true, /\.vue$/)

componentContext.keys().forEach(component => {
  const componentModule = componentContext(component)

  const components = componentModule.default || componentModule

  const key = components.name

  const obj = {
    [key]: components
  }

  componentsObj = Object.assign(componentsObj, obj)
})

export default componentsObj
