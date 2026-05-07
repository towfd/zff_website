# EFF - Efficient International Technology Website

企業官方網站DEMO使用，使用 Vue 3 + Vite + Tailwind CSS 建置。

## Tech Stack

- **Vue 3** – Composition API
- **Vite** – 建置工具
- **Vue Router 4** – 前端路由
- **Tailwind CSS v4** – 樣式
- **Swiper** – 輪播元件

## 專案結構

```
src/
├── assets/
│   ├── index/        # 首頁素材（hero、products、applications、news）
│   ├── foot/         # 頁尾素材（logo、icons）
│   └── head_logo.png # 頁首 logo
├── components/
│   ├── AppHeader.vue # 頁首（含 RWD 漢堡選單）
│   └── AppFooter.vue # 頁尾
├── views/
│   ├── HomeView.vue  # 首頁（Hero / Products / Applications / Quotation / News）
│   ├── AboutView.vue
│   └── ContactView.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

## 開始開發

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```
