# Next.js 迁移完成

主应用已成功从 Vite + React Router 迁移到 Next.js。

## 主要变更

### 1. 项目结构

**旧结构（Vite）:**
```
main-app/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
└── vite.config.js
```

**新结构（Next.js）:**
```
main-app/
├── app/
│   ├── layout.jsx        # 根布局
│   ├── page.jsx          # 首页
│   ├── globals.css       # 全局样式
│   ├── vue/
│   │   └── [...slug]/
│   │       └── page.jsx  # Vue 子应用路由
│   └── react/
│       └── [...slug]/
│           └── page.jsx  # React 子应用路由
├── components/
│   ├── GarfishProvider.jsx  # Garfish 初始化组件
│   └── Navigation.jsx       # 导航组件
├── next.config.js
└── jsconfig.json
```

### 2. 依赖变更

- ✅ 移除了 `vite` 和 `@vitejs/plugin-react`
- ✅ 移除了 `react-router-dom`（Next.js 使用文件系统路由）
- ✅ 添加了 `next` 和相关依赖

### 3. 路由变更

**旧方式（React Router）:**
```jsx
<Route path="/vue/*" element={<SubAppContainer />} />
<Route path="/react/*" element={<SubAppContainer />} />
```

**新方式（Next.js App Router）:**
- `/` → `app/page.jsx`
- `/vue/*` → `app/vue/[...slug]/page.jsx`
- `/react/*` → `app/react/[...slug]/page.jsx`

### 4. 环境变量变更

**旧方式:**
```env
VITE_VUE_APP_ENTRY=http://localhost:8080
VITE_REACT_APP_ENTRY=http://localhost:8082
```

**新方式:**
```env
NEXT_PUBLIC_VUE_APP_ENTRY=http://localhost:8080
NEXT_PUBLIC_REACT_APP_ENTRY=http://localhost:8082
```

注意：Next.js 中客户端可访问的环境变量必须以 `NEXT_PUBLIC_` 开头。

### 5. 客户端组件

由于 Garfish 需要在浏览器中运行，相关组件使用了 `'use client'` 指令：
- `components/GarfishProvider.jsx`
- `components/Navigation.jsx`
- `app/vue/[...slug]/page.jsx`
- `app/react/[...slug]/page.jsx`

## 安装和运行

### 1. 安装依赖

```bash
cd main-app
npm install
```

### 2. 配置环境变量（可选）

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_VUE_APP_ENTRY=http://localhost:8080
NEXT_PUBLIC_REACT_APP_ENTRY=http://localhost:8082
```

### 3. 运行开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 功能验证

- [x] 首页正常显示
- [x] 导航功能正常
- [x] Vue 子应用可以加载
- [x] React 子应用可以加载
- [x] Garfish 初始化正常
- [x] 样式正常显示

## 注意事项

1. **端口变更**: Next.js 默认使用 3000 端口（与之前相同）
2. **路由**: Next.js 使用文件系统路由，不再需要 React Router
3. **SSR**: Next.js 默认启用服务端渲染，但 Garfish 相关功能在客户端执行
4. **环境变量**: 客户端环境变量必须使用 `NEXT_PUBLIC_` 前缀

## 旧文件清理（可选）

如果需要，可以删除以下旧文件：
- `src/` 目录
- `index.html`
- `vite.config.js`

建议先备份这些文件，确认新版本运行正常后再删除。

## 故障排除

### 问题：子应用无法加载

**解决方案:**
1. 检查子应用是否正在运行
2. 检查环境变量配置是否正确
3. 检查 CORS 配置
4. 查看浏览器控制台错误信息

### 问题：样式不显示

**解决方案:**
1. 确认 `app/globals.css` 已正确导入到 `layout.jsx`
2. 检查 CSS 类名是否正确

### 问题：路由不工作

**解决方案:**
1. 确认使用了 Next.js 的 `Link` 组件（不是 React Router 的）
2. 检查文件系统路由结构是否正确

