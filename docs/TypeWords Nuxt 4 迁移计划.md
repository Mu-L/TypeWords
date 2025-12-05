# TypeWords Nuxt 4 迁移计划

## 1. 需求文档

### 1.1 项目概述

TypeWords 是一个基于 Web 的打字练习应用，专注于语言学习（英语单词和文章）。它提供多种练习模式、词典管理和进度跟踪功能。目标是将现有的 Vue 3 SPA（单页应用）迁移到 **Nuxt 4** 应用，以充分利用最新的框架特性、提升性能、SEO 和开发体验。

### 1.2 核心功能

* **单词练习**:
  * 学习模式：跟写、拼写、辨析、听音、听写。
  * 间隔重复：新词、复习、拼写、乱序。
  * 词典选择：CET-4、CET-6、雅思（IELTS）等。
  * 统计数据：花费时间、学习/复习单词数。

* **文章练习**:
  * 打字练习：支持音频同步（LRC）。
  * 阅读模式。
  * 句子级练习。

* **用户系统**:
  * 登录/注册。
  * VIP 会员状态。
  * 用户设置同步。

* **设置**:
  * 快捷键自定义。
  * 主题切换。
  * 声音/音量控制。
  * 翻译引擎选择。

* **离线/本地能力**:
  * PWA 支持（Service Worker）。
  * 本地数据存储（IndexedDB）。

### 1.3 非功能性需求

* **性能**: 流畅的打字体验，无延迟。
* **兼容性**: 支持现代浏览器。
* **离线优先**: 支持离线使用已下载的词典。

## 2. 技术规范

### 2.1 技术栈

| 组件 | 当前 (Vue 3) | 目标 (Nuxt 4) |
| :--- | :--- | :--- |
| **框架** | Vue 3.5 + Vite | **Nuxt 4.x** |
| **语言** | TypeScript | TypeScript |
| **状态管理** | Pinia | Pinia (Nuxt 模块) |
| **路由** | Vue Router (配置式) | Nuxt 基于文件的路由 |
| **UI/样式** | Sass, UnoCSS | Sass, UnoCSS (Nuxt 模块) |
| **图标** | Iconify (unplugin) | Nuxt Icon / Iconify |
| **HTTP** | Axios | $fetch / useFetch |
| **存储** | IndexedDB (idb-keyval) | IndexedDB (idb-keyval) |
| **工具库** | Lodash, Dayjs | Lodash, Dayjs |

### 2.2 数据模型

* **单词 (Word)**: JSON 结构，包含拼写、音标、翻译、例句、短语、同义词和词根。
* **文章 (Article)**: JSON 结构，包含标题、正文、音频链接、LRC 时间轴和问题。
* **词典 (Dictionary)**: 元数据 + 单词/文章列表。
* **用户 (User)**: 个人资料、设置、进度数据。

### 2.3 关键算法

* **打字引擎**: 处理输入匹配、错误高亮和 WPM（每分钟字数）计算。
* **间隔重复**: 决定哪些单词需要复习的逻辑。
* **音频同步**: 使用 LRC 数据将音频播放时间映射到文本位置。

## 3. 架构文档

### 3.1 目录结构映射 (采用 Nuxt 4 推荐结构)

Nuxt 4 推荐将源码主要放置在 `app/` 目录下，以保持根目录整洁（也可继续使用根目录模式，视具体配置而定）。以下以标准结构为例：

```
src/                  ->   app/ (或根目录)
  apis/               ->   composables/api/ 或 utils/api/
  assets/             ->   assets/
  components/         ->   components/
  config/             ->   app.config.ts / runtimeConfig
  directives/         ->   plugins/directives.ts
  hooks/              ->   composables/
  libs/               ->   utils/ 或 server/ (如果需要 API 路由)
  locales/            ->   i18n/
  pages/              ->   pages/
  stores/             ->   stores/
  types/              ->   types/ (或 utils/types)
  utils/              ->   utils/
  App.vue             ->   app.vue
  main.ts             ->   plugins/ (初始化逻辑)
  router.ts           ->   pages/ (文件路由)
public/               ->   public/
```

### 3.2 状态管理流

* **全局状态**: 保留 Pinia store (`user`, `setting`, `runtime`, `practice`)。
* **水合 (Hydration)**: Nuxt 处理状态水合。注意 `localStorage`/`IndexedDB` 的客户端仅有性（使用 `ClientOnly` 或 `onMounted`）。

### 3.3 路由策略

* **当前**: `router.ts` 定义显式路由。
* **目标**: `pages/` 目录结构。
  * `pages/words/index.vue`
  * `pages/practice-words/[id].vue`
  * `pages/articles/index.vue`
  * `pages/user/login.vue`
  * 等等。

## 4. 实施步骤

1. **初始化**: 创建一个新的 **Nuxt 4** 项目（使用 `nuxi init` 并选择最新版本）。
2. **依赖安装**: 安装 Pinia, UnoCSS, Sass 和其他库的 Nuxt 兼容版本。
3. **资源迁移**: 移动 `public/` 内容和 `assets/` 样式。
4. **核心逻辑迁移**:
   * 复制 `types/`。
   * 将 `utils/` 和 `hooks/` 转换为 `composables/`。
   * 设置 Pinia `stores/`。
5. **组件迁移**:
   * 移动 `components/`（利用自动导入）。
   * 修复导入路径。
6. **页面迁移**:
   * 在 `pages/` 中重建路由结构。
   * 移动页面组件，适配 Nuxt 页面元数据 (`definePageMeta`)。
7. **插件/配置**:
   * 注册自定义指令。
   * 配置 UnoCSS。
   * 处理 PWA/Service Worker（可能需要 `vite-pwa/nuxt`）。
8. **验证**: 测试所有练习模式和数据加载。
