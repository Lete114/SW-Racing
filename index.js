const defaultOptions = {
  enable: true,
  register: true,
  file: '/sw.js',
  location: 'head_begin',
  page: 'default'
}

hexo.extend.filter.register('after_generate', function () {
  const { enable, register, file, location, page } = Object.assign(defaultOptions, this.config.SWRacing)

  if (!enable) return

  const registerSW = `
  ;(function () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('${file}')
        .then((result) => {
          // 判断是否安装了sw
          if (!localStorage.getItem('installSW')) {
            localStorage.setItem('installSW', true)
            // 这里就不用清理setInterval了，因为页面刷新后就没有了
            const timer = setInterval(() => {
              // 判断sw安装后，是否处于激活状态，激活后刷新页面
              if (result && result.active && result.active.state === 'activated') {
                clearInterval(timer)
                location.reload() // sw注册后，会在下次访问时才工作，所以这里调用reload()刷新一次页面
              }
            }, 100)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })()
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

  hexo.extend.injector.register(location || 'head_begin', `<script>${script}</script>`, page || 'default')
})
