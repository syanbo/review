## XiaoZaoFE 规范

### 代码检查

- eslint
- prettier
- eslint-config-prettier
- lint-staged
- stylelint

eslint-plugin-prettier 的工作原理是，对比格式化前和用 Prettier 格式化后的代码，有不一致的地方就会报错，然后你可以手动运行 eslint --fix 来修复。

不过 Prettier 的格式化很可能和你使用的 ESLint 配置冲突，比如你的 ESLint 设定的不使用分号，而 Prettier 默认使用分号，这时候你需要配置 Prettier 让它不使用分号。反之如果你想使用 Prettier 的规则而不是 ESLint 的，为防止 ESLint 报错，你需要使用 eslint-config-prettier 来关闭所有可能引起冲突的规则。

#### rules 规则

[rules 列表](https://cn.eslint.org/docs/rules/)

| 规则                                                    | 描述     |
| ------------------------------------------------------- | -------- |
| "max-len": ["error", {"code": 200, "ignoreUrls": true}] | 最大行数 |
| "no-restricted-globals": "error"                        | 全局变量 |
| "no-console": "off"                                     | 日志打印 |

### 命名相关格式

| 命名对象               | 推荐名称            | 示例            |
| ---------------------- | ------------------- | --------------- |
| 图片                   | 小写字母，"-" 分割  | home-icon.png   |
| css（class,id）        | "-" 分割            | m-box           |
| 变量                   | 小驼峰命名          | productList     |
| 文件                   | 小写字母， "-" 分割 | auto-complete   |
| 组件单文件(index 除外) | 大驼峰命名          | Checkbox        |
| js 类（class）         | 大驼峰命名          | class Person {} |
| 常量                   | 大写字母，'\_' 分割 | PRICE_MAX       |

#### 函数命名

函数命名，一般都是动词开头。

##### 【获取值】

如果函数是为了获取值(函数最后会返回一个值的)，函数前面建议带有 get。

`getUserInfo = () => {}`

##### 【设置值】

如果函数是为了设置值(函数最后会返回一个值的)，函数执行就是为了给某一个变量赋值，函数前面建议带有 set。

`setUserInfo = () => {}`

##### 【处理动作】

如果函数是为了处理一些操作，比如登录，注册，渲染列表等。那么就建议命名前面带有 handle。

`handleRegister = () => {}`

### GIT

#### 分支命名

1. 功能分支以【feature】开头 feature/goods
2. bug 修复分支以【fix】开头 fix/list

#### 提交规范

| 动作     | 描述                                |
| -------- | ----------------------------------- |
| add      | 新增                                |
| change   | 修改                                |
| fix      | 修复 bug                            |
| upgrade  | 更新                                |
| refactor | 重构代码                            |
| docs     | 文档修改                            |
| style    | 不影响代码含义的更改 空格换行格式等 |
| chore    | 杂项 构建或者配置文件等             |

### ADD Less

`yarn add -D less-loader less`

修改 webpack

```
const cssRegex = /\.(css|less)/;
const cssModuleRegex = /\.module\.(css|less)/;
// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    ...
    {
      loader: require.resolve('less-loader'), // compiles Less to CSS
      options: { javascriptEnabled: true },
    },
  ];
  ...
  return loaders;
};
```

### ADD react-hot-loader 局部热更新

`yarn add -D react-hot-loader`

修改 webpack.config.dev

```$xslt
// Process application JS with Babel.
// The preset includes JSX, Flow, and some ESnext features.
   {
      test: /\.(js|mjs|jsx)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader'),
      options: {
         customize: require.resolve('babel-preset-react-app/webpack-overrides'),

           plugins: [
              ...
              'react-hot-loader/babel',
           ],
         ...
      },
   },
```

入口新增

```$xslt
import { AppContainer } from 'react-hot-loader';
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
```

### ADD react-loadable 基于路由拆分 拆分bundle

`yarn add react-loadable`

使用

```$xslt
import { Router, Link } from '@reach/router';
import Loadable from 'react-loadable';
const AsyncDashboard = Loadable({
  loader: () => import('./pages/dashboard'),
  loading: err => {
    console.log(err);
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  },
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <nav>
          <Link to="/">Home</Link>
          <Link to="dashboard">Dashboard</Link>
          <Link to="dash">Dash</Link>
          <Link to="users/123">Bob</Link>
        </nav>
        <Router>
          <Home path="/" />
          <AsyncDashboard path="dashboard/*" />
          <Dash path="dash" />
        </Router>
      </div>
    );
  }
}

export default App;
```
