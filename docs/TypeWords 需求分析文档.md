# TypeWords 需求分析文档

## 1. 项目概述
TypeWords 是一个专注于语言学习的 Web 打字练习应用。它结合了打字练习与英语/外语学习，提供单词记忆、文章阅读、听写练习等多种模式。核心理念是通过键盘输入强化记忆，同时提供丰富的词典资源和进度跟踪功能。

## 2. 用户角色
*   **游客**: 可以使用基础练习功能，但数据保存在本地，无法跨设备同步，部分高级功能（如VIP词典）受限。
*   **注册用户**: 可以同步学习进度、设置和收藏夹。
*   **VIP 用户**: 享有更多高级功能（如特定词典、无限发音等）。

## 3. 功能模块详解

### 3.1 单词练习 (Word Practice)
*   **练习模式**:
    *   **跟写 (FollowWrite)**: 屏幕显示单词，用户照着输入。
    *   **拼写 (Spell)**: 隐藏单词拼写，仅显示释义/发音，用户需拼写出单词。
    *   **辨析 (Identify)**: 给出单词，选择正确的释义（或是反过来）。
    *   **听音 (Listen)**: 播放单词发音，用户输入单词。
    *   **听写 (Dictation)**: 连续播放一组单词，用户依次输入。
*   **练习范围**:
    *   **新词学习**: 系统推荐的新单词。
    *   **复习**: 基于间隔重复算法（Spaced Repetition）复习旧单词。
    *   **乱序练习**: 随机抽取单词练习。
    *   **错词重练**: 针对历史错误单词进行强化练习。
*   **交互细节**:
    *   支持快捷键（如 Ctrl+P 播放发音，Enter 收藏）。
    *   打字错误实时高亮。
    *   练习结束后显示统计数据（WPM、准确率、用时）。

### 3.2 文章练习 (Article Practice)
*   **阅读/打字模式**: 用户可以对整篇文章进行打字练习。
*   **音频同步**: 支持 LRC 格式，实现音频播放与文本高亮同步。
*   **句式练习**: 将文章拆分为句子进行练习。
*   **辅助功能**:
    *   点击单词查询释义。
    *   句子翻译对照。
    *   支持填空题和选择题（基于文章内容）。

### 3.3 词典管理 (Dictionary Management)
*   **词典库**: 内置多种词典（CET-4/6, 雅思, 托福, 考研, 专四/八等）。
*   **自定义词典**: 支持用户导入词典数据。
*   **特殊词本**:
    *   **生词本 (Collect)**: 用户手动收藏的单词。
    *   **错题本 (Wrong)**: 自动记录拼写错误的单词。
    *   **熟词本 (Known)**: 用户标记为“已掌握”的单词，练习时会跳过。

### 3.4 用户系统 (User System)
*   **账号管理**: 注册、登录（支持验证码）、找回密码。
*   **个人中心**: 查看学习天数、打卡记录、VIP 状态。
*   **数据同步**: 学习进度、偏好设置云端同步。

### 3.5 设置系统 (Settings)
*   **界面偏好**: 主题切换（深色/浅色）、字体大小、界面布局。
*   **声音设置**: 音量调节、音效开关（打字音、错误音）。
*   **练习设置**: 每日学习量、每组单词数、自动发音设置。
*   **快捷键**: 全局快捷键自定义。

## 4. 数据实体 (Data Entities)

### 4.1 单词 (Word)
```typescript
interface Word {
  id: string;
  word: string;        // 拼写
  phonetic0: string;   // 英式音标
  phonetic1: string;   // 美式音标
  trans: { pos: string; cn: string }[]; // 释义列表
  sentences: { c: string; cn: string }[]; // 例句
  phrases: { c: string; cn: string }[];   // 短语
  synos: { pos: string; ws: string[] }[]; // 同义词
  relWords: { root: string; rels: ... }[]; // 词根/派生词
  etymology: { t: string; d: string }[];   // 词源
}
```

### 4.2 文章 (Article)
```typescript
interface Article {
  title: string;
  text: string;
  audioSrc: string;    // 音频链接
  lrcPosition: number[][]; // LRC 时间轴
  questions: Question[]; // 配套习题
}
```

### 4.3 词典 (Dict)
```typescript
interface Dict {
  id: string;
  name: string;
  category: string;
  words: Word[];
  lastLearnIndex: number; // 学习进度
}
```

## 5. 非功能性需求
*   **性能**: 打字响应延迟需极低（<50ms），确保跟手感。
*   **离线能力**: 已下载的词典应支持离线使用（PWA + IndexedDB）。
*   **兼容性**: 适配主流桌面浏览器（Chrome, Edge, Firefox, Safari）。
*   **SEO**: 首页和公共资源页需对搜索引擎友好（Nuxt SSR）。
