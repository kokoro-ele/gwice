import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 用相对路径，部署到 GitHub Pages 的子路径（user.github.io/repo/）也能正常加载资源
  base: "./",
  plugins: [react()],
});
