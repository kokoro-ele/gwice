# TWICE 认脸小课堂 🍭

一个帮“脸盲”的朋友区分 **TWICE 九位成员** 的小网站：以卡片式「看图选名字」选择题为核心，配韩式可爱风界面。

成员：娜琏 Nayeon · 定延 Jeongyeon · 桃 Momo · 纱夏 Sana · 志效 Jihyo · 美娜 Mina · 多贤 Dahyun · 彩瑛 Chaeyoung · 子瑜 Tzuyu

## 功能

- 🎯 **测验**：随机展示一位成员的照片，从 4 个名字里选出正确答案。
  - 实时计分：答对数 / 总题数 / 正确率 / 连对（含最佳连胜）。
  - 答完即时反馈：高亮对错、撒花动画，并展示该成员的「区分技巧卡」。
  - 键盘操作：`1`–`4` 选答案，`空格` / `回车` 下一题。
- 📖 **图鉴**：九位成员一览卡片（头像 + 中/英/韩名 + 国籍 + 定位 + 区分特征），答题前先认脸。
- 📱 响应式，移动端友好；尊重 `prefers-reduced-motion`。

## 技术栈

- React 18 + TypeScript + Vite
- 纯前端，无后端

## 本地运行

```bash
npm install
npm run dev      # 打开 http://localhost:5173
```

构建产物：

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建结果
```

## 图片来源与版权

- 成员照片直接 **热链** 自 [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Members_of_Twice_(musical_group))，多为 CC 授权，版权归原拍摄者所有。
- 通过 `Special:FilePath/<文件名>` 引用（见 [`src/data/members.ts`](src/data/members.ts) 中的 `imageUrl()`），自动重定向到真实图片并取缩略图。
- **健壮性兜底**：每位成员配置多张候选图，运行时按顺序加载；某张坏链会自动切换到下一张，全部失败则显示「主题色 + emoji + 名字」占位，保证测验不中断（见 [`src/components/MemberImage.tsx`](src/components/MemberImage.tsx)）。
- 本项目仅用于认脸学习/娱乐，非官方、不作商业用途。

### 想换图 / 加图？

编辑 [`src/data/members.ts`](src/data/members.ts) 里对应成员的 `images` 数组即可，每一项可以是：

- 一个 Wikimedia Commons 文件名（不含 `File:` 前缀），例如 `"241024 TWICE Nayeon.jpg"`；
- 或一个以 `http` 开头的完整图片 URL（任意可热链的图床）。

## 项目结构

```
src/
  data/members.ts          # 九位成员数据 + 图片 URL 助手
  components/
    MemberImage.tsx        # 多候选图片 + onError 自动回退/占位
    MemberCard.tsx         # 成员卡（图鉴 / 答题反馈复用）
    Quiz.tsx               # 测验：抽题 / 4 选 1 / 计分 / 撒花
    Gallery.tsx            # 图鉴
  App.tsx / App.css        # 布局、Tab、韩式可爱风样式
```

made with 💗 for ONCE
