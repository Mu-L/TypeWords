# TypeWords 系统架构文档

## 1. 架构概览

本项目由 Vue 3 单页应用 (SPA) 迁移至 Nuxt 4 全栈框架。架构旨在提供高性能的客户端交互（打字体验）和优化的服务端渲染（SEO、首屏加载）。

### 1.1 技术栈对比

| 层级 | 原架构 (Vue 3) | 新架构 (Nuxt 4) | 说明 |
| :--- | :--- | :--- | :--- |
| **Runtime** | Browser Only | Node.js (Server) + Browser | 支持 SSR/SSG |
| **Framework** | Vue 3.5 + Vite | Nuxt 4.x | 约定优于配置 |
| **Language** | TypeScript | TypeScript | 强类型约束 |
| **State** | Pinia | Pinia (Nuxt Module) | 状态管理 |
| **Routing** | Vue Router (Manual) | Nuxt File System Routing | 自动路由生成 |
| **UI Framework** | UnoCSS + SCSS | UnoCSS (Nuxt Module) | 原子化 CSS |
| **HTTP Client** | Axios | $fetch / useFetch | Nuxt 内置 fetch |
| **Storage** | IndexedDB (idb-keyval) | IndexedDB (Client Only) | 本地大容量存储 |

## 2. 目录结构设计

遵循 Nuxt 4 的最佳实践，采用 `app/` 目录结构以保持根目录整洁。

```
nuxt-tw/
├── app/
│   ├── assets/            # 静态资源 (CSS, Images)
│   ├── components/        # Vue 组件 (自动导入)
│   │   ├── base/          # 基础 UI 组件 (Button, Input)
│   │   ├── business/      # 业务组件 (WordCard, TypingArea)
│   │   └── layout/        # 布局组件 (Header, Footer)
│   ├── composables/       # 组合式函数 (原 hooks + apis)
│   │   ├── api/           # API 接口封装
│   │   └── usePractice.ts # 练习逻辑封装
│   ├── layouts/           # 页面布局模板
│   ├── middleware/        # 路由中间件 (Auth 守卫)
│   ├── pages/             # 页面路由
│   ├── plugins/           # 插件 (Directives, 3rd-party libs)
│   ├── stores/            # Pinia 状态仓库
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   └── app.vue            # 应用入口
├── public/                # 公共静态文件 (favicon, robots.txt)
├── server/                # (可选) 服务端 API 路由
├── nuxt.config.ts         # Nuxt 配置文件
├── uno.config.ts          # UnoCSS 配置文件
└── package.json
```

## 3. 核心模块架构

### 3.1 状态管理 (State Management)
使用 Pinia 管理全局状态，主要 Store 模块：
*   **UserStore**: 用户认证信息、Token、个人资料。
*   **SettingStore**: 应用配置（主题、快捷键、音效）。
*   **RuntimeStore**: 运行时临时状态（当前路由、加载状态）。
*   **PracticeStore**: 核心业务状态（当前单词列表、输入状态、统计数据）。

### 3.2 数据持久化 (Data Persistence)
*   **IndexedDB**: 用于存储大型数据，如：
    *   下载的词典文件 (JSON)。
    *   文章音频数据 (Blob)。
*   **LocalStorage**: 用于存储轻量配置，如：
    *   用户 Token。
    *   用户偏好设置 (Settings)。
*   **SSR 注意事项**: IndexedDB 和 LocalStorage 仅在客户端可用。在 Nuxt 中需使用 `<ClientOnly>` 组件或在 `onMounted` 生命周期中访问，避免水合不匹配 (Hydration Mismatch)。

### 3.3 路由与导航 (Routing)
利用 Nuxt 的文件系统路由自动生成路由表：
*   `pages/words/index.vue` -> `/words` (单词列表)
*   `pages/practice-words/[id].vue` -> `/practice-words/:id` (单词练习)
*   `pages/articles/index.vue` -> `/articles` (文章列表)
*   `pages/user/login.vue` -> `/user/login` (登录)

### 3.4 网络请求 (Networking)
封装 `useFetch` 或 `$fetch` 替代 Axios：
*   统一处理请求拦截（添加 Token）。
*   统一处理响应拦截（错误提示、Token 过期跳转）。
*   支持 SSR 期间的服务端数据预取。

## 4. 部署架构
*   **构建**: `nuxt build` 生成生产环境包。
*   **模式**: 推荐使用 **SSG (Static Site Generation)** 或 **Hybrid** 模式，因为主要内容（词典、练习）强依赖客户端交互，但首页和文章页可预渲染以提升 SEO。
*   **服务器**: Node.js 服务器或静态托管 (Vercel/Netlify/Nginx)。
