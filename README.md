## Install

```bash
npm install hexo-sw-racing --save
```

## usage

将仓库 main 分支的 [sw.js](https://github.com/Lete114/SW-Racing/blob/main/sw.js) 文件复制到自己博客根目录的`/source/`目录下

## Configure

将配置文件写入 Hexo 的配置文件\_config.yml

> 以下都是默认配置，如果你就使用默认配置，这不用将配置信息写入配置文件


```yml
# SW-Racing
# https://github.com/Lete114/SW-Racing
SWRacing:
  enable: true              # 是否使用sw
  register: true            # true: 注册sw | false: 注销
  file: sw.js               # sw的文件名
  location: head_begin      # 插入页面的位置 https://hexo.io/zh-cn/api/injector#entry-lt-string-gt
  page: default             # 插入到哪些页面 https://hexo.io/zh-cn/api/injector#to-lt-string-gt
```
