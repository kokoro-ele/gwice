import { useEffect, useMemo, useState } from "react";
import { imageUrl, type Member } from "../data/members";

interface Props {
  member: Member;
  /** 起始图片索引（测验里随机传入）；从这里开始环形尝试所有候选 */
  index?: number;
  width?: number;
  className?: string;
  rounded?: boolean;
}

/**
 * 从 index 起按环形顺序尝试该成员的所有候选图：
 * 当前图加载失败就换下一张，直到试遍全部都失败，才显示
 * 「主题色 + emoji + 名字」占位。这样坏链不会把可用图“吞掉”，
 * 变化也最大化。
 */
export default function MemberImage({
  member,
  index = 0,
  width = 640,
  className,
  rounded = true,
}: Props) {
  const n = member.images.length;

  // 以 index 为起点的环形访问顺序，例如 n=5、index=2 -> [2,3,4,0,1]
  const order = useMemo(
    () => Array.from({ length: n }, (_, i) => (index + i) % n),
    [n, index]
  );

  const [step, setStep] = useState(0); // 当前尝试到 order 的第几个
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setStep(0);
    setFailed(false);
  }, [member.id, index]);

  const src =
    !failed && step < order.length
      ? imageUrl(member.images[order[step]], width)
      : undefined;

  if (!src) {
    return (
      <div
        className={`member-img member-img--fallback ${
          rounded ? "is-rounded" : ""
        } ${className ?? ""}`}
        style={{
          background: `linear-gradient(135deg, ${member.color}, #ffffff)`,
        }}
        role="img"
        aria-label={`${member.nameZh} 占位图`}
      >
        <span className="fallback-emoji">{member.emoji}</span>
        <span className="fallback-name">{member.nameEn}</span>
      </div>
    );
  }

  return (
    <img
      key={src}
      className={`member-img ${rounded ? "is-rounded" : ""} ${className ?? ""}`}
      src={src}
      alt={`${member.nameZh} (${member.nameEn})`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (step + 1 < order.length) setStep((s) => s + 1);
        else setFailed(true);
      }}
    />
  );
}
