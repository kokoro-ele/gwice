export interface Member {
  id: string;
  nameZh: string;
  nameEn: string;
  nameKo: string;
  nationality: string;
  position: string;
  color: string;
  emoji: string;
  tips: string[];
  /**
   * 图片来源：可以是 Wikimedia Commons 文件名（不含 "File:" 前缀），
   * 也可以是以 http 开头的完整 URL。运行时按顺序尝试加载，坏链自动回退。
   */
  images: string[];
}

/**
 * 把 Commons 文件名转成可热链的图片 URL。
 * 用 Special:FilePath 自动 302 到真实图片，并请求 ~640px 缩略图以加速加载。
 * 已是完整 URL（http 开头）的则原样返回。
 */
export function imageUrl(nameOrUrl: string, width = 640): string {
  if (/^https?:\/\//i.test(nameOrUrl)) return nameOrUrl;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    nameOrUrl
  )}?width=${width}`;
}

export const members: Member[] = [
  {
    id: "nayeon",
    nameZh: "娜琏",
    nameEn: "Nayeon",
    nameKo: "나연",
    nationality: "韩国",
    position: "主唱 · 门面 · 队内大姐",
    color: "#ff8fab",
    emoji: "🐰",
    tips: [
      "标志性的“兔牙”，笑起来上排门牙很可爱",
      "队内年纪最大（1995 年生），气质偏成熟甜美",
      "眼睛圆而有神，笑容灿烂、亲和力强",
    ],
    images: [
      "241024 TWICE Nayeon.jpg",
      "Nayeon 241024 1.jpg",
      "Nayeon of Twice at Maison Kitsune event, October 24, 2024.png",
      "Nayeon.jpg",
      "NAYEON 2022.jpg",
      "220701 Nayeon(나연) of Twice MusicBank Fancam.jpg",
      "Nayeon in 2022.jpg",
    ],
  },
  {
    id: "jeongyeon",
    nameZh: "定延",
    nameEn: "Jeongyeon",
    nameKo: "정연",
    nationality: "韩国",
    position: "副主唱",
    color: "#9ad0c2",
    emoji: "🌿",
    tips: [
      "经常留中短发，是队内最常见“短发”的成员，帅气中性",
      "五官干净利落，眉眼带英气、像“校草”",
      "笑起来有种爽朗的少年感",
    ],
    images: [
      "260306 Twice Hamilton Jeongyeon 트와이스 정연 (1).jpg",
      "260306 Twice Hamilton Jeongyeon 트와이스 정연 (3).jpg",
      "260306 Twice Hamilton Jeongyeon 트와이스 정연 (10).jpg",
      "Twice in Seattle 2026 - TWICE. Joengyeon (55044093862).jpg",
      "Jeongyeon in 2015.jpg",
      "Yoo Jeong-yeon performing at SAC 2016.jpg",
    ],
  },
  {
    id: "momo",
    nameZh: "桃",
    nameEn: "Momo",
    nameKo: "모모",
    nationality: "日本",
    position: "主舞 · Rapper",
    color: "#ffd6a5",
    emoji: "🍑",
    tips: [
      "主舞担当，身材线条偏运动、跳舞时存在感极强",
      "眼睛偏单眼皮、带点“猫系”慵懒感",
      "笑起来脸颊圆润，元气满满",
    ],
    images: [
      "TWICE MOMO April 2024.jpg",
      "Momo from TWICE in Las Vegas (53594960167).jpg",
      "20230918 Momo Hirai 平井 もも 2023 09.jpg",
      "20230918 Momo Hirai 平井 もも 2023 08.jpg",
      "Momo Hirai at Twice Sudden Attack Fan Meeting on March 25, 2017 (1).jpg",
    ],
  },
  {
    id: "sana",
    nameZh: "纱夏",
    nameEn: "Sana",
    nameKo: "사나",
    nationality: "日本",
    position: "副主唱",
    color: "#ffc8dd",
    emoji: "🌸",
    tips: [
      "眼睛大而圆、笑起来弯成月牙，娃娃脸",
      "招牌“Shy Shy Shy”就是她，氛围软萌可爱",
      "说话带点日系软糯口音，表情丰富",
    ],
    images: [
      "TWICE Sana Minatozaki April 2024.jpg",
      "20240809 Sana Minatozaki 湊﨑 紗夏 for PRADA 2024 07.jpg",
      "20240809 Sana Minatozaki 湊﨑 紗夏 for PRADA 2024 02.jpg",
      "20240809 Sana Minatozaki 湊﨑 紗夏 for PRADA 2024 05.jpg",
      "20240809 Sana Minatozaki 湊﨑 紗夏 for PRADA 2024 08.jpg",
      "Sana Minatozaki 2022 (2) (cropped).jpg",
    ],
  },
  {
    id: "jihyo",
    nameZh: "志效",
    nameEn: "Jihyo",
    nameKo: "지효",
    nationality: "韩国",
    position: "队长 · 主唱",
    color: "#cdb4db",
    emoji: "👑",
    tips: [
      "队长，主唱担当，唱功最稳、台风强",
      "脸型偏圆、五官端正，笑容有亲和的“狐系”感",
      "气场沉稳，站位常在中间",
    ],
    images: [
      "Twice in Seattle 2026 - TWICE. Jihyo (55044093797).jpg",
      "Twice in Seattle 2026 - TWICE. Jihyo (55045327170).jpg",
      "Park Ji-hyo at 2015 SAF on December 27, 2015.jpg",
      "Park Ji-hyo at Suwon Fansign on December 13, 2015 (2).jpg",
      "Park Ji-hyo at Suwon Fansign on December 13, 2015 (1).jpg",
    ],
  },
  {
    id: "mina",
    nameZh: "美娜",
    nameEn: "Mina",
    nameKo: "미나",
    nationality: "日本（生于美国）",
    position: "副主唱",
    color: "#a2d2ff",
    emoji: "🦢",
    tips: [
      "学过芭蕾，气质优雅、体态笔直，外号“企鹅 / 黑天鹅”",
      "五官精致清冷，安静文静、表情偏淡",
      "侧脸线条流畅，像“瓷娃娃”",
    ],
    images: [
      "Mina Sharon Myoui 名井 南 2024 06.jpg",
      "Mina Sharon Myoui 名井 南 2024 07.jpg",
      "Mina Sharon Myoui 名井 南 2024 01.png",
      "Mina H&M Rokh 1.jpg",
      "Myoui Mina at WFMF concert in September 2016 01.jpg",
      "Myoui Mina performing at SAC 2016 01.jpg",
    ],
  },
  {
    id: "dahyun",
    nameZh: "多贤",
    nameEn: "Dahyun",
    nameKo: "다현",
    nationality: "韩国",
    position: "Rapper · 副唱",
    color: "#e9edc9",
    emoji: "🦅",
    tips: [
      "皮肤超级白（队内出名的“白”），外号豆腐（Dubu）",
      "招牌“老鹰舞”出处就是她，表情包女王、搞怪鬼马",
      "脸型偏圆、笑容呆萌可爱",
    ],
    images: [
      "DAHYUN (다현) – 2024.02.12 – P1.png",
      "DAHYUN (다현) – 2024.02.12 – P5.png",
      "DAHYUN (다현) – 2024.02.12 – P4.png",
      "DAHYUN (다현) – 2024.02.12 – P2.png",
      "DAHYUN (다현) – 2024.02.12 – P3.png",
    ],
  },
  {
    id: "chaeyoung",
    nameZh: "彩瑛",
    nameEn: "Chaeyoung",
    nameKo: "채영",
    nationality: "韩国",
    position: "主 Rapper",
    color: "#bde0fe",
    emoji: "🍓",
    tips: [
      "队内个子最矮、娃娃脸，外号“草莓公主 / 小猛兽”",
      "经常换发色、爱个性穿搭，文艺有想法",
      "脸颊肉肉的、笑起来有酒窝感，反差萌",
    ],
    images: [
      "241204 Chaeyoung at Rokh H&M (2).png",
      "Chaeyoung at Music Bank in Hong Kong on January 20, 2019 (1).jpg",
      "Chaeyoung at Gaon Awards red carpet on January 23, 2019.jpg",
      "Chaeyoung at Idol Star Athletics Championships on January 7, 2019 (1).jpg",
      "Chaeyoung at Seoul Music Awards on January 15, 2019 (1).jpg",
    ],
  },
  {
    id: "tzuyu",
    nameZh: "子瑜",
    nameEn: "Tzuyu",
    nameKo: "쯔위",
    nationality: "中国台湾",
    position: "门面 · 副唱",
    color: "#bdb2ff",
    emoji: "🦌",
    tips: [
      "队内个子最高、门面担当，腿长气场足",
      "五官立体精致、像“洋娃娃 / 小鹿”，妥妥的颜值天花板",
      "性格偏内敛安静，笑起来很乖巧",
    ],
    images: [
      "20240305 Chou Tzuyu 周子瑜 03.jpg",
      "20240305 Chou Tzuyu 周子瑜 01.jpg",
      "20240305 Chou Tzuyu 周子瑜 02.jpg",
      "20240305 Chou Tzuyu 周子瑜 04.jpg",
      "Tzuyu at Gucci Ancora on 05032024 (1).png",
      "Tzuyu at Gucci Ancora on 05032024 (3).png",
    ],
  },
];
