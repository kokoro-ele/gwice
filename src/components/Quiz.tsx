import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const AUTO_NEXT_MS = 1100;

/** 避免最近出现过的成员，增加随机性 */
function makeQuestion(recentIds: string[] = []): Question {
  const pool = members.filter((m) => !recentIds.includes(m.id));
  const answer = pickRandom(pool.length ? pool : members);

  const distractors = shuffle(members.filter((m) => m.id !== answer.id)).slice(
    0,
    3
  );
  const options = shuffle([answer, ...distractors]);
  const imageIndex = Math.floor(Math.random() * answer.images.length);
  return { member: answer, imageIndex, options };
}

export default function Quiz() {
  const recentRef = useRef<string[]>([]);
  const timerRef = useRef<number | undefined>(undefined);

  const [question, setQuestion] = useState<Question>(() => {
    const q = makeQuestion();
    recentRef.current = [q.member.id];
    return q;
  });
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

  const next = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setQuestion(() => {
      const q = makeQuestion(recentRef.current);
      // 记录最近 3 位成员，避免短期内重复
      recentRef.current = [q.member.id, ...recentRef.current].slice(0, 3);
      return q;
    });
    setSelected(null);
    setCelebrate(false);
  }, []);

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
        timerRef.current = window.setTimeout(next, AUTO_NEXT_MS);
      }
    },
    [answered, question.member.id, next]
  );

  // 卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 键盘：1-4 选项，空格/回车 下一题（答错时）
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
                style={!answered ? { borderColor: `${opt.color}` } : undefined}
              >
                <span className="option-idx">{i + 1}</span>
                <span className="option-name">{opt.nameZh}</span>
                <span className="option-en">{opt.nameEn}</span>
              </button>
            );
          })}
        </div>

        {answered && isCorrect && (
          <div className="feedback good feedback--mini">
            <div className="feedback-head">
              答对啦！是 {question.member.emoji} {question.member.nameZh} —— 自动下一题中…
            </div>
          </div>
        )}

        {answered && !isCorrect && (
          <div className="feedback bad">
            <div className="feedback-head">差一点～她是 👇</div>
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
        小提示：可用键盘 <kbd>1</kbd>–<kbd>4</kbd> 选答案，答错后 <kbd>空格</kbd>{" "}
        看下一题；答对会自动跳题
      </p>
    </div>
  );
}
