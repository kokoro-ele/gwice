import { type Member } from "../data/members";
import MemberImage from "./MemberImage";

interface Props {
  member: Member;
  imageIndex?: number;
  showTips?: boolean;
}

export default function MemberCard({
  member,
  imageIndex,
  showTips = true,
}: Props) {
  return (
    <div className="member-card" style={{ borderColor: member.color }}>
      <div
        className="member-card__photo"
        style={{ background: `${member.color}33` }}
      >
        <MemberImage member={member} index={imageIndex} width={500} />
      </div>
      <div className="member-card__body">
        <div className="member-card__names">
          <span className="member-card__emoji">{member.emoji}</span>
          <h3 className="member-card__zh">{member.nameZh}</h3>
          <span className="member-card__en">{member.nameEn}</span>
          <span className="member-card__ko">{member.nameKo}</span>
        </div>
        <div className="member-card__meta">
          <span className="pill" style={{ background: `${member.color}55` }}>
            {member.nationality}
          </span>
          <span className="pill" style={{ background: `${member.color}55` }}>
            {member.position}
          </span>
        </div>
        {showTips && (
          <ul className="member-card__tips">
            {member.tips.map((tip, i) => (
              <li key={i}>
                <span className="tip-star">★</span>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
