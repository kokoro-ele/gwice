import { useCallback, useEffect, useMemo, useState } from "react";
import { members, type Member } from "../data/members";
import MemberImage from "./MemberImage";

interface Stats {
  total: number;
  correct: number;
  streak: number;
  best: number;
}

interface Question {
  member: Member;
  imageIndex: number;
  options: Member[];
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQuestion(prevId?: string): Question {
  let answer = pickRandom(members);
  // 尽量不连续出同一个人
  if (prevId && members.length > 1) {
    let guard = 0;
    while (answer.id === prevId && guard < 10) {
      answer = pickRandom(members);
      guard++;
    }
  }
  const distractors = shuffle(members.filter((m) => m.id !== answer.id)).slice(
    0,
    3
  );
  const options = shuffle([answer, ...distractors]);
  const imageIndex = Math.floor(Math.random() * answer.images.length);
  return { member: answer, imageIndex, options };
}

export default function Quiz() {
  const [question, setQuestion] = useState<Question>(() => makeQuestion());
  const [selected, setSelected] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    correct: 0,
    streak: 0,
    best: 0,
  });
  const [celebrate, setCelebrate] = useState(false);

  const answered = selected !== null;
  const isCorrect = answered && selected === question.member.id;

  const handleSelect = useCallback(
    (id: string) => {
      if (answered) return;
      setSelected(id);
      const right = id === question.member.id;
      setStats((s) => {
        const streak = right ? s.streak + 1 : 0;
        return {
          total: s.total + 1,
          correct: s.correct + (right ? 1 : 0),
          streak,
          best: Math.max(s.best, streak),
        };
      });
      if (right) {
        setCelebrate(true);
      }
    },
    [answered, question.member.id]
  );

  const next = useCallback(() => {
    setQuestion((q) => makeQuestion(q.member.id));
    setSelected(null);
    setCelebrate(false);
  }, []);

  // 键盘支持：1-4 选项，空格/回车下一题
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!answered && /^[1-4]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        if (question.options[idx]) handleSelect(question.options[idx].id);
      } else if (answered && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, question.options, handleSelect, next]);

  const accuracy = useMemo(
    () => (stats.total ? Math.round((stats.correct / stats.total) * 100) : 0),
    [stats]
  );

  const celebrationBits = useMemo(
    () => Array.from({ length: 14 }, (_, i) => i),
    []
  );

  return (
    <div className="quiz">
      <div className="scoreboard">
        <div className="score-item">
          <span className="score-num">{stats.correct}</span>
          <span className="score-label">答对</span>
        </div>
        <div className="score-item">
          <span className="score-num">{stats.total}</span>
          <span className="score-label">总题</span>
        </div>
        <div className="score-item">
          <span className="score-num">{accuracy}%</span>
          <span className="score-label">正确率</span>
        </div>
        <div className="score-item">
          <span className="score-num">🔥{stats.streak}</span>
          <span className="score-label">连对(最佳{stats.best})</span>
        </div>
      </div>

      <div className="question-card">
        <p className="question-title">她是九人中的哪一位？ 🤔</p>
        <div className="photo-wrap">
          <MemberImage
            member={question.member}
            index={question.imageIndex}
            width={700}
          />
          {celebrate && (
            <div className="celebration" aria-hidden>
              {celebrationBits.map((i) => (
                <span
                  key={i}
                  className="bit"
                  style={{
                    left: `${(i / celebrationBits.length) * 100}%`,
                    animationDelay: `${(i % 5) * 0.08}s`,
                  }}
                >
                  {["💖", "⭐", "✨", "🎀", "🌸"][i % 5]}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="options">
          {question.options.map((opt, i) => {
            let state = "";
            if (answered) {
              if (opt.id === question.member.id) state = "correct";
              else if (opt.id === selected) state = "wrong";
              else state = "dim";
            }
            return (
              <button
                key={opt.id}
                className={`option ${state}`}
                onClick={() => handleSelect(opt.id)}
                disabled={answered}
                style={
                  !answered ? { borderColor: `${opt.color}` } : undefined
                }
              >
                <span className="option-idx">{i + 1}</span>
                <span className="option-name">{opt.nameZh}</span>
                <span className="option-en">{opt.nameEn}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`feedback ${isCorrect ? "good" : "bad"}`}>
            <div className="feedback-head">
              {isCorrect ? "答对啦！太棒了 🎉" : "差一点～她是 👇"}
            </div>
            <div className="feedback-answer">
              <span className="feedback-emoji">{question.member.emoji}</span>
              <strong>{question.member.nameZh}</strong>
              <span className="feedback-en">
                {question.member.nameEn} · {question.member.nameKo}
              </span>
            </div>
            <ul className="feedback-tips">
              {question.member.tips.map((t, idx) => (
                <li key={idx}>
                  <span className="tip-star">★</span>
                  {t}
                </li>
              ))}
            </ul>
            <button className="next-btn" onClick={next}>
              下一题 →
            </button>
          </div>
        )}
      </div>

      <p className="kbd-hint">
        小提示：可用键盘 <kbd>1</kbd>–<kbd>4</kbd> 选答案，<kbd>空格</kbd> 下一题
      </p>
    </div>
  );
}
