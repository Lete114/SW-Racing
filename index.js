const defaultOptions = {
  enable: true,
  register: true,
  file: 'sw.js',
  location: 'head_begin',
  page: 'default'
}

hexo.extend.filter.register('after_generate', function () {
  const { enable, register, file, location, page } = Object.assign(defaultOptions, this.config.SWRacing)

  if (!enable) return

  const registerSW = `
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('${file || 'sw.js'}')
      .then((res) => console.log('注册sw成功'))
      .catch(() => console.log('注册sw失败'))
  }
  `

  const unregisterSW = `
  navigator.serviceWorker
  .getRegistrations()
  .then((r) => {
    for (let i of r) i.unregister()
    console.log('注销sw成功')
  })
  .catch(() => console.log('注销sw失败'))`

  const script = register ? registerSW : unregisterSW

  hexo.extend.injector.register(location || 'head_begin', script, page || 'default')
})
