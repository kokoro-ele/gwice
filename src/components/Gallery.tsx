import { members } from "../data/members";
import MemberCard from "./MemberCard";

export default function Gallery() {
  return (
    <div className="gallery">
      <p className="gallery-intro">
        先来认认脸吧～记住每个人的小特征，再去测验会更有把握 💪
      </p>
      <div className="gallery-grid">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  );
}
