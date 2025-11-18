# 🗺️ 助人×自利開放地圖平台

> **Help-and-Earn Open Map Platform**  
> 社群驅動的開放地圖服務，目標提供 100 種不同的「幫助他人同時幫助自己」的地圖功能

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Beta-blue.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0-green.svg)]()

---

## 🎯 專案願景

建立一個零維運成本的開放地圖平台，透過模板化架構快速擴展到 100+ 種地圖服務。

### 核心特色

- 🎨 **5 種地圖模板** - Point, Heatmap, Line, Zone, Mixed
- 🔍 **3 種搜尋意圖優化** - Local, Informational, Commercial
- 🤖 **GEO 優化** - 針對 AI 搜尋引擎優化 (ChatGPT, Claude, Perplexity)
- 🚀 **零維運** - 完全自動化的內容管理
- 💰 **多元變現** - B2C 訂閱 + B2B API + 廣告

---

## 📊 目前進度

### ✅ Phase 1: MVP (Week 1-2)
- [x] Supabase 資料庫設置
- [x] PostGIS 地理查詢
- [x] RLS 安全設定
- [x] Google Geocoding API 整合
- [x] 第一個地圖原型 (寵物友善)
- [x] 第二個地圖原型 (嫌惡設施)
- [x] 地址轉經緯度工具

### 🔄 Phase 2: 模板化系統 (Week 3-4)
- [ ] Preset JSON Schema
- [ ] Point Map Template
- [ ] 動態分類系統
- [ ] 搜尋意圖分類
- [ ] 批量匯入工具

### 📅 Phase 3-6: 詳見 [專案規劃](./docs/project-plan.md)

---

## 🏗️ 技術架構

```
Frontend: 純 HTML + CSS + JavaScript (無框架依賴)
Backend: Supabase (PostgreSQL + PostGIS + RLS)
地圖: Leaflet.js + OpenStreetMap
部署: Cloudflare Pages (免費)
自動化: n8n (未來)
變現: Lemon Squeezy (未來)
```

---

## 📂 專案結構

```
helpmap/
├── index.html              # 首頁
├── maps/                   # 地圖頁面
│   ├── pet-friendly.html   # 寵物友善地圖
│   └── nuisance.html       # 嫌惡設施地圖
├── presets/                # 功能配置檔 (JSON)
│   ├── pet-friendly.json
│   └── nuisance.json
├── tools/                  # 開發工具
│   └── geocode-tool.html   # 地址轉經緯度
├── assets/                 # 靜態資源
│   ├── css/
│   ├── js/
│   └── icons/
└── docs/                   # 文件
    └── project-plan.md
```

---

## 🎯 100 種地圖服務規劃

詳見 [data_sources_taiwan_only_FULL_100_series_FIXED.json](./data_sources_taiwan_only_FULL_100_series_FIXED.json)

### 已完成 (2/100)
1. ✅ 寵物友善地圖
2. ✅ 嫌惡設施地圖

### 優先開發 (Week 7)
3. 插座咖啡店地圖
4. 安靜咖啡店地圖
5. 24小時咖啡店地圖
6. 公廁地圖
7. ATM 地圖
8. 停車場地圖
9. 充電站地圖
10. 夜間安全區域地圖

---

## 🚀 快速開始

### 1. Clone 專案
```bash
git clone https://github.com/DCNex/helpmap.git
cd helpmap
```

### 2. 設定 Supabase
1. 前往 [Supabase](https://supabase.com) 建立專案
2. 執行 `database/schema.sql` 建立資料表
3. 更新地圖 HTML 中的 `SUPABASE_URL` 和 `SUPABASE_KEY`

### 3. 本地測試
直接用瀏覽器打開 `index.html` 即可!

---

## 📈 KPIs

### 第 3 個月目標
- 📊 MAU: 1,000
- 🔍 AI 引用: 50 次/月
- 💰 MRR: $30
- 🗺️ 功能數: 40+

### 第 12 個月目標
- 📊 MAU: 100,000
- 🔍 AI 引用: 500 次/月
- 💰 MRR: $4,230
- 🗺️ 功能數: 100

---

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

### 如何新增地圖功能

1. 在 `presets/` 建立 JSON 配置檔
2. 定義資料來源和分類
3. 選擇地圖模板 (Point/Heatmap/Line/Zone/Mixed)
4. 測試並提交 PR

---

## 📄 授權

MIT License - 詳見 [LICENSE](./LICENSE)

---

## 📞 聯絡

- 作者: DCNex (Arin)
- GitHub: [@DCNex](https://github.com/DCNex)
- Email: [你的email]

---

## 🙏 致謝

- OpenStreetMap 社群
- Supabase 團隊
- 台灣政府開放資料平台
- 所有貢獻者

---

⭐ 如果這個專案對你有幫助，請給我們一顆星星!
