import { useEffect, useState } from "react";
import { imageUrl, type Member } from "../data/members";

interface Props {
  member: Member;
  /** 固定使用某个索引的图片（图鉴用）；不传则用第一个可用的 */
  index?: number;
  width?: number;
  className?: string;
  rounded?: boolean;
}

/**
 * 按候选 URL 顺序加载图片，单张失败自动切换到下一张；
 * 全部失败则显示成员主题色 + emoji 的占位，保证 UI 不破。
 */
export default function MemberImage({
  member,
  index,
  width = 640,
  className,
  rounded = true,
}: Props) {
  const start = index ?? 0;
  const [cursor, setCursor] = useState(start);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCursor(start);
    setFailed(false);
  }, [member.id, start]);

  const src =
    cursor < member.images.length
      ? imageUrl(member.images[cursor], width)
      : undefined;

  if (failed || !src) {
    return (
      <div
        className={`member-img member-img--fallback ${rounded ? "is-rounded" : ""} ${
          className ?? ""
        }`}
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
      className={`member-img ${rounded ? "is-rounded" : ""} ${className ?? ""}`}
      src={src}
      alt={`${member.nameZh} (${member.nameEn})`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (cursor + 1 < member.images.length) {
          setCursor((c) => c + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
