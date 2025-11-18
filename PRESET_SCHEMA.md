# Preset JSON Schema 規範

**版本**: 1.0  
**更新日期**: 2025-11-18

---

## 📋 Preset 是什麼?

Preset 是一個 JSON 配置檔,定義了一個地圖功能的所有設定,包括:
- 基本資訊 (名稱、描述、圖標)
- 地圖模板類型
- 搜尋意圖分類
- 資料來源
- UI 設定
- SEO/GEO 優化

**核心理念**: 新增功能只需編寫 JSON,無需寫程式碼!

---

## 🎯 Schema 結構

```json
{
  "meta": {
    "id": "string (必填)",
    "version": "string (必填)",
    "template": "string (必填) [point|heatmap|line|zone|mixed]",
    "search_intent": "string (必填) [local|informational|commercial]",
    "status": "string (選填) [active|beta|coming_soon]",
    "priority": "number (選填) 1-10",
    "created_at": "string (ISO date)",
    "updated_at": "string (ISO date)"
  },
  
  "basic": {
    "name": "string (必填)",
    "name_en": "string (選填)",
    "slug": "string (必填)",
    "description": "string (必填)",
    "icon": "string (emoji 或 URL)",
    "color": "string (hex color)",
    "category": "string (選填)",
    "tags": ["array of strings"]
  },
  
  "data_source": {
    "supabase_table": "string (必填)",
    "filters": {
      "category": "string or array (選填)",
      "city": "string or array (選填)",
      "verified": "boolean (選填)"
    },
    "refresh_interval": "number (分鐘，選填)",
    "data_url": "string (外部資料源 URL，選填)"
  },
  
  "map_config": {
    "default_center": [number, number],
    "default_zoom": number,
    "min_zoom": number,
    "max_zoom": number,
    "search_radius_km": number,
    "cluster_enabled": boolean,
    "marker_icon_field": "string (從資料中取圖標的欄位)",
    "marker_color_field": "string (從資料中取顏色的欄位)"
  },
  
  "ui": {
    "sidebar": {
      "title": "string",
      "subtitle": "string",
      "show_filters": boolean,
      "show_search": boolean,
      "collapsible": boolean
    },
    "filters": [
      {
        "name": "string",
        "field": "string",
        "type": "string [select|multiselect|checkbox]",
        "options": "array or auto"
      }
    ],
    "info_window": {
      "fields": ["array of field names"],
      "show_directions": boolean,
      "show_phone": boolean,
      "show_website": boolean
    }
  },
  
  "seo": {
    "title": "string",
    "meta_description": "string",
    "keywords": ["array of strings"],
    "og_image": "string (URL)",
    "canonical_url": "string"
  },
  
  "geo": {
    "title_format": "string (含年份)",
    "h2_questions": ["array of natural language questions"],
    "faqs": [
      {
        "question": "string",
        "answer": "string"
      }
    ],
    "schema_org": {
      "type": "string [FAQPage|HowTo|LocalBusiness|ItemList]",
      "properties": {}
    }
  },
  
  "monetization": {
    "show_ads": boolean,
    "premium_required": boolean,
    "api_accessible": boolean
  }
}
```

---

## 📝 欄位說明

### meta (元資訊)

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| id | string | ✅ | 唯一識別碼,建議格式: `service-name-city` |
| version | string | ✅ | Preset 版本,格式: `1.0` |
| template | string | ✅ | 地圖模板類型 |
| search_intent | string | ✅ | 搜尋意圖分類 |
| status | string | ❌ | 功能狀態 |
| priority | number | ❌ | 顯示優先順序 (1 最高) |

**template 選項**:
- `point`: 點狀地圖 (咖啡店、ATM、公廁)
- `heatmap`: 熱力圖 (人潮、安全區域)
- `line`: 線狀地圖 (步道、自行車道)
- `zone`: 區域地圖 (學區、行政區)
- `mixed`: 混合模板 (組合多種類型)

**search_intent 選項**:
- `local`: 本地搜尋意圖 (立即需求)
- `informational`: 資訊搜尋意圖 (學習研究)
- `commercial`: 商業搜尋意圖 (比較選擇)

---

### basic (基本資訊)

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| name | string | ✅ | 功能名稱 (中文) |
| name_en | string | ❌ | 功能名稱 (英文) |
| slug | string | ✅ | URL slug,格式: `kebab-case` |
| description | string | ✅ | 簡短描述 |
| icon | string | ✅ | Emoji 或圖標 URL |
| color | string | ❌ | 主題色 (hex) |
| category | string | ❌ | 分類 |
| tags | array | ❌ | 標籤 |

---

### data_source (資料來源)

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| supabase_table | string | ✅ | Supabase 資料表名稱 |
| filters | object | ❌ | 資料篩選條件 |
| refresh_interval | number | ❌ | 資料更新間隔(分鐘) |
| data_url | string | ❌ | 外部資料源 URL |

---

### map_config (地圖設定)

| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| default_center | array | ❌ | 預設中心點 [lat, lng] |
| default_zoom | number | ❌ | 預設縮放層級 |
| search_radius_km | number | ❌ | 搜尋半徑(公里) |
| cluster_enabled | boolean | ❌ | 是否啟用標記聚合 |

---

### seo (SEO 優化)

所有欄位都是選填,但強烈建議填寫以提升 SEO 效果。

---

### geo (GEO 優化)

**Informational Intent 必填欄位**:
- `h2_questions`: 至少 3 個自然語言問句
- `faqs`: 至少 3 個 FAQ
- `schema_org`: 完整的 Schema.org 標記

---

## 📋 範例 Presets

### 範例 1: 寵物友善地圖 (Local Intent)

```json
{
  "meta": {
    "id": "pet-friendly-taipei",
    "version": "1.0",
    "template": "point",
    "search_intent": "local",
    "status": "active",
    "priority": 1
  },
  "basic": {
    "name": "寵物友善地圖",
    "name_en": "Pet-Friendly Places",
    "slug": "pet-friendly",
    "description": "找尋對毛孩友善的場所,讓帶寵物出門更安心",
    "icon": "🐾",
    "color": "#4caf50",
    "category": "寵物",
    "tags": ["寵物", "友善", "咖啡店", "餐廳"]
  },
  "data_source": {
    "supabase_table": "pet_places",
    "filters": {
      "verified": true
    },
    "refresh_interval": 60
  },
  "map_config": {
    "default_center": [25.0330, 121.5654],
    "default_zoom": 13,
    "search_radius_km": 2,
    "cluster_enabled": true
  },
  "ui": {
    "sidebar": {
      "title": "🐾 寵物友善地圖",
      "subtitle": "帶毛孩出門必備 - 找尋友善的場所",
      "show_filters": true,
      "collapsible": true
    },
    "filters": [
      {
        "name": "場所類別",
        "field": "category",
        "type": "select",
        "options": "auto"
      }
    ]
  },
  "seo": {
    "title": "台北寵物友善地圖 | 帶毛孩出門必備",
    "meta_description": "找台北最友善的寵物場所!查看地圖、評分、營業時間,立即導航。",
    "keywords": ["寵物友善", "台北寵物", "寵物咖啡店", "寵物地圖"]
  }
}
```

### 範例 2: 適合讀書的咖啡店 (Informational Intent)

```json
{
  "meta": {
    "id": "study-cafe-taipei",
    "version": "1.0",
    "template": "point",
    "search_intent": "informational",
    "status": "beta"
  },
  "basic": {
    "name": "台北適合讀書的咖啡店指南",
    "slug": "study-cafes",
    "description": "完整的讀書咖啡店指南!了解如何選擇、必備條件、Top 5 推薦",
    "icon": "📖",
    "color": "#795548"
  },
  "data_source": {
    "supabase_table": "pet_places",
    "filters": {
      "category": ["cafe", "咖啡廳"],
      "city": "台北市"
    }
  },
  "geo": {
    "title_format": "台北適合讀書的咖啡店完整指南 (2025)",
    "h2_questions": [
      "台北哪裡有適合讀書的咖啡店？",
      "讀書咖啡店應該具備哪些條件？",
      "台北哪些咖啡店有插座和 WiFi？"
    ],
    "faqs": [
      {
        "question": "台北哪裡有適合讀書的咖啡店？",
        "answer": "推薦大安區的 XYZ 咖啡（超安靜、插座多）、信義區的 ABC 咖啡（24 小時營業）..."
      }
    ],
    "schema_org": {
      "type": "FAQPage"
    }
  }
}
```

---

## 🚀 使用流程

1. **建立 Preset JSON** - 複製範本,填寫欄位
2. **放入 presets/** 目錄
3. **測試** - 用瀏覽器打開對應的地圖模板
4. **部署** - Push 到 GitHub,自動部署

---

## 📝 最佳實踐

### DO ✅

- 使用清晰的 ID 和 slug
- 為 Informational Intent 提供完整的 FAQs
- 填寫所有 SEO 欄位
- 使用 emoji 圖標增加視覺吸引力
- 測試不同裝置和瀏覽器

### DON'T ❌

- 不要使用特殊字元在 slug 中
- 不要遺漏必填欄位
- 不要複製貼上沒有修改
- 不要忘記更新 version

---

## 🔄 版本控制

當 Preset 更新時:
1. 增加 `version` (如 1.0 → 1.1)
2. 更新 `updated_at`
3. 在 Git commit 中說明變更

---

**維護者**: DCNex (Arin)  
**最後更新**: 2025-11-18
