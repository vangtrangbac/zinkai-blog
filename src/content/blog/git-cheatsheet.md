---
title: "Git: lệnh hay dùng (cheatsheet)"
description: "Tập hợp lệnh Git thường gặp khi làm blog hoặc side project."
pubDate: 2026-05-15
tags: ["git", "cheatsheet"]
category: "Dev tools"
subcategory: "Git"
---

Những lệnh dưới đây đủ cho hầu hết luồng làm việc cá nhân.

## Nhánh & commit

```bash
git switch -c feature/post-moi
git add -p
git commit -m "content: thêm bài git cheatsheet"
```

## Xem lịch sử gọn

```bash
git log --oneline -n 15 --decorate
```

## Hoàn tác nhẹ (chưa push)

```bash
git restore --staged .
git restore .
```

Nếu cần **undo sau khi push**, nên dùng `git revert` thay vì force push trên nhánh dùng chung.
