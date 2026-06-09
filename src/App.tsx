import { useState } from "react";
import Quiz from "./components/Quiz";
import Gallery from "./components/Gallery";

type Tab = "quiz" | "gallery";

export default function App() {
  const [tab, setTab] = useState<Tab>("quiz");

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-emoji">🍭</span> TWICE 认脸小课堂
        </h1>
        <p className="app-subtitle">
          脸盲也不怕～跟着卡片和测验，轻松区分九位成员 ✨
        </p>
        <nav className="tabs">
          <button
            className={`tab ${tab === "quiz" ? "active" : ""}`}
            onClick={() => setTab("quiz")}
          >
            🎯 测验
          </button>
          <button
            className={`tab ${tab === "gallery" ? "active" : ""}`}
            onClick={() => setTab("gallery")}
          >
            📖 图鉴
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === "quiz" ? <Quiz /> : <Gallery />}
      </main>

      <footer className="app-footer">
        <p>
          图片来源：
          <a
            href="https://commons.wikimedia.org/wiki/Category:Members_of_Twice_(musical_group)"
            target="_blank"
            rel="noreferrer"
          >
            Wikimedia Commons
          </a>
          （多为 CC 授权，版权归原拍摄者所有）。本站仅作认脸学习用途，非官方、不作商业使用。
        </p>
        <p className="footer-made">made with 💗 for ONCE</p>
      </footer>
    </div>
  );
}
