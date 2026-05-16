# Zinkai Notebook

Blog cá nhân tĩnh (Astro 4): Markdown trong repo, giao diện kiểu **terminal journal**, sidebar như sổ tay, copy code / copy cả bài.

## Chạy local

```bash
npm install
npm run dev
```

Mở **đúng URL** mà terminal in ra (mặc định Astro là `http://localhost:4321/`).

## Thêm / sửa bài

1. Tạo file mới trong `src/content/blog/`, ví dụ `bai-moi.md`.
2. Thêm frontmatter + nội dung Markdown:

```markdown
---
title: "Tiêu đề"
description: "Mô tả ngắn cho SEO và thẻ open graph"
pubDate: 2026-05-16
tags: ["tag1", "tag2"]
category: "Dev tools"
subcategory: "CLI"
draft: false
---

Nội dung...
```

- **`category` / `subcategory`** (tuỳ chọn): nhóm bài trên sidebar và mục "Theo danh mục" trên trang chủ. Không ghi `category` → bài vào **Không phân loại**. Chỉ có `category`, không `subcategory` → bài liệt kê trực tiếp dưới category đó. Các nhóm này **thu gọn/mở được** (click tiêu đề); trên trang bài viết sidebar **tự mở** đúng nhánh đang đọc.

- `draft: true` — bài nháp **chỉ hiện khi dev**, build production sẽ ẩn.
- `slug` URL lấy từ tên file (`bai-moi` → `/blog/bai-moi/`).

## Giao diện sáng / tối

Nút đổi **Sáng / Tối** nằm **góc phải trên** (floating); lựa chọn lưu ở `localStorage` (`zinkai-theme`). Lần đầu vào chưa lưu: theo `prefers-color-scheme`. Đổi theme sẽ vẽ lại **Mermaid** cho khớp (light → `default`, dark → `dark`).

## Sơ đồ Mermaid

````markdown
```mermaid
flowchart LR
  A --> B
```
````

## Copy như “ghi chú”

- Mỗi khối code có nút **Copy** (hover vào khối hoặc luôn hiện trên màn hình cảm ứng).
- Trang bài: **Copy text** (plain), **Copy rich** (HTML + text — paste vào Word/OneNote thường giữ định dạng tốt hơn).

_Cần trang chạy HTTPS hoặc localhost để Clipboard API hoạt động._

## Build & xem bản production

```bash
npm run build
npm run preview
```

Output: thư mục `dist/` (upload lên Netlify, Cloudflare Pages, GitHub Pages, v.v.).

## Cấu hình

- `astro.config.mjs` — `site`: đổi thành domain thật của bạn (ảnh hưởng RSS, sitemap, canonical).
- Theme code highlight: `markdown.shikiConfig.theme` trong cùng file.

## Node

Dự án dùng **Astro 4** để tương thích **Node 20**. (CLI `create-astro` mới hơn có thể yêu cầu Node 22.)
