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
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register('${file}'')
        .then((result) => {
          // 判断是否安装了sw
          if (localStorage.getItem('installSW')) return
          localStorage.setItem('installSW', true)
          // 这里就不用清理setInterval了，因为页面刷新后就没有了
          const timer = setInterval(() => {
            // 判断sw安装后，是否处于激活状态，激活后刷新页面
            if (result.active.state === 'activated') {
              clearInterval(timer)
              fetch(window.location.href)
                .then((res) => res.text())
                .then((text) => {
                  document.open()
                  document.write(text)
                  document.close()
                })
            }
          }, 100)
        })
        .catch(console.log)
    }
  })()
  `

  const unregisterSW = `
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((r) => {
        for (let i of r) i.unregister()
        console.log('注销成功')
      })
      .catch(() => console.log('注销失败'))
  }`

  const script = register ? registerSW : unregisterSW

  hexo.extend.injector.register(location || 'head_begin', `<script>${script}</script>`, page || 'default')
})
