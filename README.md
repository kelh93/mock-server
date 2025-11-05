# Mock Server 一个基于 Koa 的 Mock 服务器，支持自动从 JSON 文件创建 API 接口。 

## 本地开发 
```bash 
# 安装依赖 
npm install 
# 启动服务器 
npm start 
# 开发模式（自动重启） 
npm run dev 
``` 
服务器默认运行在 `http://localhost:5000` 

## 功能特性 
- 自动扫描 `src/mock` 目录下的 JSON 文件 
- 根据文件名自动创建对应的 GET 接口 
- 例如：`list.json` → `GET /list` 
- 支持 CORS - 健康检查接口：`GET /health` 

## 部署到 Vercel 

### 方式一：使用 Vercel CLI 
```bash 
# 安装 Vercel CLI 
npm i -g vercel 
# 登录 Vercel 
vercel login 
# 部署 
vercel 

# 生产环境部署 
vercel --prod 
``` 

### 方式二：通过 GitHub 集成 
1. 将代码推送到 GitHub 

2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 中导入项目 

3. Vercel 会自动检测配置并部署 

## 项目结构 

``` 
mock-server
├── README.md
├── package.json
├── src
│   ├── index.js # 本地开发服务器
│   └── mock
│       └── list.json # Mock 数据文件
└── vercel.json # Vercel 配置文件
``` 

## 添加新的 Mock 接口 
只需在 `src/mock` 目录下添加新的 JSON 文件，服务器会自动创建对应的路由： 
- `user.json` → `GET /user` 
- `products.json` → `GET /products` 
- `orders.json` → `GET /orders` 

## 注意事项 
- Vercel 使用 serverless functions，所有请求都会路由到 `api/index.js` 
- Mock 文件路径在 Vercel 环境中会自动调整 
- 确保所有依赖都在 `package.json` 的 `dependencies` 中