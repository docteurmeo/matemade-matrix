# MateMade · Brand DNA Matrix Pipeline

Automated tool để tạo ma trận định vị thương hiệu cho thị trường túi xách, dùng cho nghiên cứu chiến lược MateMade.

---

## Cài đặt nhanh

### Bước 1 — Lấy API key Claude (BẮT BUỘC để chạy analysis)

1. Vào https://console.anthropic.com/
2. Tạo tài khoản (hoặc đăng nhập)
3. Vào **API Keys** → **Create Key**
4. Copy key

### Bước 2 — Tạo file `.env`

```
copy .env.example .env
```

Rồi mở `.env` và thêm API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```

### Bước 3 — Chạy pipeline

```bash
# Bước 1: Tải ảnh từ website brand
npm run fetch

# Bước 2: Phân tích visual DNA với Claude
npm run analyze

# Bước 3: Cluster brands theo DNA
npm run cluster

# Bước 4: Tạo HTML visualization
npm run visualize
```

Kết quả HTML ở: `output/brand-matrix.html` — mở bằng trình duyệt.

---

## Chi tiết từng bước

### Script 1: Fetch Images
- **Không cần API key**
- Tự động thử Shopify API trước (nhiều brand dùng Shopify)
- Fallback sang HTML scraping
- Nếu brand không tự động được → ghi vào `data/fetch-failed.json`

**Manual fallback:** Với brand bị failed, tạo folder `images/{brand-id}/` và đặt 3-4 ảnh JPG vào đó.

### Script 2: Analyze
- **Cần `ANTHROPIC_API_KEY`**
- Gửi ảnh lên Claude claude-sonnet-4-6 (vision) để phân tích DNA
- Tự động resume nếu bị gián đoạn
- Kết quả lưu vào `data/brand-analysis.json`

### Script 3: Cluster
- **Cần `ANTHROPIC_API_KEY`**  
- Claude phân tích toàn bộ brands và assign vào cluster
- Phân tích đặc biệt cho MateMade: current position vs aspiration
- Tìm white space trên thị trường

### Script 4: Visualize
- **Không cần API key**
- Tạo file HTML với dark mode matrix
- Ảnh sản phẩm + DNA label cho từng brand
- MateMade được highlight đặc biệt

---

## Cấu trúc thư mục

```
brand-matrix/
├── data/
│   ├── brands.json           ← 72 brands, curated by hand
│   ├── brand-analysis.json   ← Claude vision analysis (auto-generated)
│   ├── clusters.json         ← Clustering result (auto-generated)
│   └── fetch-progress.json   ← Fetch progress tracker
├── images/
│   ├── matemade/
│   ├── stand-oil/
│   └── ...                   ← Product images per brand
├── output/
│   ├── brand-matrix.html     ← Main visualization
│   └── matrix-summary.json   ← Data for FigJam plugin
└── scripts/
    ├── 1-fetch-images.js
    ├── 2-analyze-brands.js
    ├── 3-cluster-brands.js
    └── 4-visualize.js
```

---

## Danh sách 12 Clusters

| Cluster | DNA | Brands tiêu biểu |
|---------|-----|-------------------|
| 🤍 Parisian Quiet Luxury | Clean lines, neutral, understated | Polène, A.P.C., Toteme |
| 🖤 Korean New Wave | Seoul cool, casual-elevated | Stand Oil, Matin Kim, Marhen.J |
| 🌸 Romantic Editorial | Feminine shapes, 90s nostalgia | By Far, Staud, Sandy Liang |
| 🪡 Artisan Craft | Handcraft story, natural materials | Manu Atelier, Cesta Collective |
| 🎨 Statement Art Object | Conceptual, sculptural | Jacquemus, JW Anderson, Loewe |
| ❄️ Scandinavian Cool | Effortless, ironic minimal | Ganni, Nanushka, Acne Studios |
| 🏮 Japanese Craft | Material-first, wabi-sabi | Hender Scheme, Aeta, Porter |
| 🇻🇳 Vietnam Mass Market | Accessible, OL image | Hapas, Vascara, Juno |
| ✨ Vietnam Gen Z Local | Young, experimental, local | **MateMade**, The Wayward |
| 🎭 Korean Conceptual | Art-driven, deconstructed | Ader Error, Low Classic |
| 🗽 New York Edge | Downtown, sporty-sexy | Alexander Wang |
| 💎 Luxury Reference | Market ceiling reference | Celine, The Row, Bottega Veneta |

---

## Thêm brand mới

Thêm vào `data/brands.json` theo format:

```json
{
  "id": "brand-slug",
  "name": "Brand Name",
  "country": "VN",
  "origin": "Vietnam",
  "priceRange": "affordable-mid",
  "priceUSD": "20-80",
  "website": "https://brand.com",
  "shopUrl": "https://brand.com/collections/all",
  "searchQuery": "Brand Name bag product",
  "designStyle": ["keyword1", "keyword2"],
  "targetCustomer": "Mô tả khách hàng"
}
```

Rồi chạy lại pipeline từ step 1.
