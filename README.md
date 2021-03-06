### fullcalendar

基于fullcalendar插件二次封装的vue日程表。支持：单多选，可选范围控制，单双击事件，禁用，自定义样式，事件拖拽动画

## Project setup

###将 npm 设置为淘宝镜像：

```
npm config set registry https://registry.npm.taobao.org
```

###全局安装 yarn， 如已经安装，请略过

```
npm install yarn -g
```

```
yarn install
```

### yarn 在 hBuilder 终端可能会报权限错误，请参考[about_execution_policies](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7)



### 本工程已经集成[tailwindcss](https://tailwindcss.com/)，使用详情请查阅官方文档

## IconFonts

1. 从 [iconfont](https://www.iconfont.cn/) 网站复制项目的 Font class url
2. 命令行执行 iconfont 命令更新

```shell
yarn iconfont -d <iconfont url>
```

## CSS 命名规范

**BEM** : http://getbem.com/introduction/

## Liners

**vscode 插件**

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

考虑到多人协同开发为保证代码统一风格和效率问题：建议使用vscode编辑器并且安装eslint和styleint插件！
强烈建议保存代码的时候自动去使用eslint和stylelint格式化代码
## Commitlint

```
- feat：新功能
- fix：修补 bug
- docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
- style： 不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
- refactor：重构（既不修复错误也不添加功能）
- perf: 优化相关，比如提升性能、体验
- test：增加测试，包括单元测试、集成测试等
- build: 构建系统或外部依赖项的更改
- ci：自动化流程配置或脚本修改
- chore: 非 src 和 test 的修改
- revert: 恢复先前的提交

```
