# Research Request — Kiểm chứng & hiệu chỉnh định vị 21 brand túi xách (MateMade Matrix)

> Gửi cho: AI agent / researcher phụ trách **nghiên cứu sản phẩm + nghiên cứu định vị thương hiệu**.
> Mục tiêu: xác minh và hiệu chỉnh **tọa độ (x, y)**, **orbit**, **territory** và **7 metrics** của 21 brand trên một bản đồ định vị (territory map) túi xách. Output của bạn sẽ được nạp ngược lại vào ứng dụng ma trận tương tác.

---

## 1. Bối cảnh

MateMade là thương hiệu túi xách Gen Z Việt Nam, hiện ở vùng "Generic Candy Sweet / Charm-heavy" nhưng thiếu lõi định vị riêng. Để định hướng chiến lược, chúng tôi dựng một **bản đồ định vị 2 trục** đặt các brand đối thủ/tham chiếu quanh một tâm là **"Mass Feminine Việt Nam"** (gu phổ thông nữ Việt: dễ dùng, dễ đẹp, nữ tính vừa phải, giá vừa tầm, không quá tuyên ngôn).

Tọa độ hiện tại là **ước lượng chủ quan ban đầu**, cần được kiểm chứng bằng nghiên cứu thực tế (sản phẩm thật, website, social, phân khúc giá, styling, tệp khách).

---

## 2. Hệ trục & quy ước (PHẢI tuân thủ đúng để dữ liệu khớp app)

### Trục
- **x**: `-1.45` (Cute / Sweet / Playful) ——→ `+1.45` (Cool / Minimal / Polished)
- **y**: `-1.45` (Daily / Utility / Value) ——→ `+1.45` (Statement / Design / Craft)
- Tâm `(0, 0)` = **Mass Feminine Việt Nam**.

### Orbit (vòng cách tâm, dựa trên khoảng cách `sqrt(x² + y²)`)
| orbit | bán kính ≈ | nhãn |
|---|---|---|
| 0 | ≤ 0.35 | Core Mass Feminine |
| 1 | ≤ 0.65 | Gần trung tâm |
| 2 | ≤ 0.95 | Lệch rõ — vẫn đại trà |
| 3 | ≤ 1.20 | Có tính cách rõ |
| 4 | > 1.20 | Xa / khác hệ |

> Lưu ý: orbit nên **nhất quán** với tọa độ (x,y). Nếu bạn đổi tọa độ, hãy tính lại orbit cho khớp.

### 7 metrics (thang 0–5, 1 chữ số thập phân)
1. **sweetness** — độ ngọt/cute/kẹo
2. **coolness** — độ cool/minimal/Seoul
3. **utility** — độ thực dụng/công năng/daily
4. **craft** — độ thủ công/chất liệu/story
5. **statement** — độ tuyên ngôn/nghệ thuật/gây chú ý
6. **maturity** — độ trưởng thành/polished (ngược với teen/non)
7. **identity** — độ có gu riêng/product philosophy rõ

---

## 3. Dữ liệu hiện tại cần kiểm chứng

> Cột `summary` và `territory` là mô tả định tính hiện có. Hãy phản biện cả chúng nếu sai.

| id | name | x | y | orbit | territory | sweetness | coolness | utility | craft | statement | maturity | identity |
|---|---|--:|--:|:-:|---|--:|--:|--:|--:|--:|--:|--:|
| matemade | MateMade | -0.75 | -0.05 | 2 | Cute sweet playful / Charmable | 5.0 | 1.5 | 2.5 | 1.5 | 2.0 | 1.5 | 2.0 |
| vascara | Vascara | 0.30 | -0.10 | 0 | Core Mass Feminine / Polished daily | 2.5 | 2.5 | 3.5 | 2.0 | 1.5 | 3.5 | 2.5 |
| juno | Juno | 0.10 | -0.15 | 0 | Core Mass Feminine | 2.8 | 2.0 | 3.0 | 1.5 | 1.0 | 3.0 | 1.8 |
| hapas | Hapas | 0.20 | 0.00 | 0 | Core Mass Feminine / Mass aspiration | 2.6 | 2.4 | 3.0 | 2.0 | 1.5 | 3.4 | 2.4 |
| yuumy | Yuumy | 0.00 | -0.55 | 1 | Mass value utility | 2.0 | 1.5 | 3.8 | 1.0 | 1.0 | 2.5 | 1.8 |
| camelia | Camelia | 0.25 | -0.75 | 1 | Minimal functional canvas | 1.0 | 2.5 | 4.5 | 2.5 | 1.5 | 2.8 | 2.4 |
| lesac | Lesac | 0.40 | -0.20 | 1 | Minimal young lifestyle | 2.5 | 3.0 | 3.2 | 2.0 | 1.5 | 2.6 | 2.8 |
| toutou | Toutou bag | -1.15 | -0.05 | 3 | Kawaii trend item | 5.0 | 0.5 | 2.0 | 0.5 | 1.5 | 0.5 | 1.5 |
| vanwalk | Vanwalk | -0.95 | -0.35 | 2 | Toy-like campus cute | 4.5 | 1.5 | 4.0 | 1.0 | 1.5 | 1.0 | 2.0 |
| oui | Oui The Brand | -0.85 | -0.25 | 2 | Japanese-lite charmable daily | 4.0 | 2.0 | 3.5 | 1.5 | 1.5 | 2.0 | 2.2 |
| samantha_vega | Samantha Vega | -0.80 | 0.25 | 2 | Kawaii-chic | 4.0 | 2.5 | 2.8 | 2.5 | 2.5 | 3.0 | 3.2 |
| carlyn | Carlyn | -0.45 | -0.10 | 1 | Soft puffer daily | 3.5 | 3.0 | 3.2 | 2.0 | 2.0 | 2.8 | 3.0 |
| karatta | Karatta | -0.55 | 0.65 | 2 | Playful visual design | 3.5 | 2.5 | 2.8 | 2.5 | 3.5 | 2.5 | 3.6 |
| ngaos | Ngaos | -0.35 | 0.85 | 3 | Romantic embroidered craft | 3.0 | 2.0 | 2.2 | 4.5 | 3.0 | 2.8 | 3.8 |
| thergab | Ther Gab / R.Gab | -0.05 | 0.95 | 3 | Heritage self-expression | 2.5 | 3.0 | 2.5 | 4.0 | 3.5 | 3.0 | 4.0 |
| floralpunk | Floralpunk | 0.25 | 0.80 | 3 | Urban feminine polish | 2.0 | 3.5 | 3.0 | 3.0 | 3.5 | 3.5 | 3.5 |
| chautfifth | Chautfifth | 0.45 | 1.05 | 3 | Restrained statement object | 2.0 | 4.0 | 3.0 | 3.5 | 4.5 | 4.0 | 4.5 |
| standoil | Stand Oil | 1.00 | 0.35 | 3 | Seoul cool minimal | 1.5 | 4.5 | 3.2 | 2.5 | 3.5 | 3.8 | 4.2 |
| mossdoom | Mossdoom | 0.75 | -0.35 | 2 | Affordable Korean minimal utility | 2.0 | 3.5 | 4.0 | 2.0 | 1.5 | 2.8 | 2.6 |
| spoiled | Spoiled | 0.75 | -0.75 | 3 | Street sporty accessory | 1.5 | 4.0 | 4.0 | 2.0 | 3.0 | 3.2 | 3.7 |
| saigonswagger | Saigon Swagger | 0.65 | -1.10 | 4 | Street utility | 1.2 | 3.5 | 4.5 | 2.5 | 3.0 | 3.0 | 3.2 |

---

## 4. Việc cần làm

Với **từng brand** trong 21 brand trên:

1. **Nghiên cứu thực tế**: website chính thức, sàn TMĐT (Shopee/website), Instagram/TikTok, dải giá, dòng sản phẩm chủ lực, chất liệu, shape đặc trưng, kiểu styling, tệp khách hàng mục tiêu.
2. **Kiểm chứng tọa độ (x, y)**:
   - x: brand này thiên về *cute/sweet/playful* hay *cool/minimal/polished*? Định lượng trong khoảng [-1.45, +1.45].
   - y: thiên về *daily/utility/value* hay *statement/design/craft*? Định lượng trong khoảng [-1.45, +1.45].
   - Tọa độ phải phản ánh **vị trí tương đối** so với các brand khác (vd: Toutou phải "ngọt hơn" MateMade → x âm hơn).
3. **Tính lại orbit** cho khớp tọa độ mới.
4. **Chấm lại 7 metrics** (0–5).
5. **Phản biện territory & summary**: đề xuất sửa nếu mô tả hiện tại sai/lạc hậu.
6. **Ghi rõ độ tin cậy** (confidence: high/medium/low) và **nguồn** cho mỗi brand.

### Nguyên tắc nhất quán
- Tọa độ là **tương đối**, không tuyệt đối — quan trọng là thứ tự & khoảng cách giữa các brand hợp lý.
- Nếu thiếu dữ liệu về 1 brand, đánh dấu `confidence: low` thay vì đoán bừa.
- Giữ MateMade làm điểm tham chiếu trung tâm của phân tích (đây là brand chủ thể).

---

## 5. Định dạng OUTPUT (bắt buộc — để nạp lại vào app)

Trả về **một mảng JSON** đúng schema sau (giữ nguyên `id`):

```json
[
  {
    "id": "matemade",
    "name": "MateMade",
    "x": -0.75,
    "y": -0.05,
    "orbit": 2,
    "territory": "Cute sweet playful / Charmable",
    "summary": "...(sửa nếu cần)...",
    "metrics": {
      "sweetness": 5.0, "coolness": 1.5, "utility": 2.5,
      "craft": 1.5, "statement": 2.0, "maturity": 1.5, "identity": 2.0
    },
    "confidence": "high",
    "sources": ["https://...", "..."],
    "rationale": "Vì sao đặt ở tọa độ này; điểm khác biệt so với giá trị cũ."
  }
]
```

Kèm theo (ngoài JSON):
- **Changelog ngắn**: brand nào dịch chuyển nhiều nhất so với bảng gốc và tại sao.
- **Cảnh báo**: brand nào dữ liệu yếu / dễ gây tranh cãi.

---

## 6. Bàn giao ngược

Lưu output thành `brand-positions-verified.json` đặt tại thư mục gốc dự án. Khi có file này, đội kỹ thuật sẽ map ngược vào `matemade-matrix.html` (các trường `x, y, orbit, territory, summary, m[]`).
