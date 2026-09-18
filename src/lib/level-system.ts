export type LevelTone = "default" | "star" | "space" | "hunter" | "warrior" | "legend";

export type LevelRow = {
  level: number;
  requiredExp: number;
  allyAccessKey: string | null;
  enemyAccessKey: string | null;
  descKey: string;
  titleKey: string | null;
  tone: LevelTone;
};

/** Görseldeki seviye tablosundan okunan veriler (1–25). */
export const LEVEL_ROWS: LevelRow[] = [
  { level: 1, requiredExp: 0, allyAccessKey: "x1", enemyAccessKey: null, descKey: "d1", titleKey: null, tone: "default" },
  { level: 2, requiredExp: 10_000, allyAccessKey: "x2", enemyAccessKey: null, descKey: "d2", titleKey: null, tone: "default" },
  { level: 3, requiredExp: 20_000, allyAccessKey: null, enemyAccessKey: null, descKey: "d3", titleKey: null, tone: "default" },
  { level: 4, requiredExp: 40_000, allyAccessKey: null, enemyAccessKey: null, descKey: "d4", titleKey: null, tone: "default" },
  { level: 5, requiredExp: 80_000, allyAccessKey: "x3", enemyAccessKey: null, descKey: "d5", titleKey: "t5", tone: "star" },
  { level: 6, requiredExp: 160_000, allyAccessKey: null, enemyAccessKey: null, descKey: "d6", titleKey: null, tone: "default" },
  { level: 7, requiredExp: 320_000, allyAccessKey: "x4", enemyAccessKey: "x3x4", descKey: "d7", titleKey: null, tone: "default" },
  { level: 8, requiredExp: 640_000, allyAccessKey: null, enemyAccessKey: null, descKey: "d8", titleKey: null, tone: "default" },
  { level: 9, requiredExp: 1_280_000, allyAccessKey: null, enemyAccessKey: null, descKey: "d9", titleKey: null, tone: "default" },
  { level: 10, requiredExp: 2_560_000, allyAccessKey: "pvp", enemyAccessKey: "pvp", descKey: "d10", titleKey: "t10", tone: "space" },
  { level: 11, requiredExp: 5_120_000, allyAccessKey: "x5", enemyAccessKey: null, descKey: "d11", titleKey: null, tone: "default" },
  { level: 12, requiredExp: 10_240_000, allyAccessKey: "pve", enemyAccessKey: "pve", descKey: "d12", titleKey: null, tone: "default" },
  { level: 13, requiredExp: 20_480_000, allyAccessKey: "x6", enemyAccessKey: "x2", descKey: "d13", titleKey: null, tone: "default" },
  { level: 14, requiredExp: 40_960_000, allyAccessKey: "x7", enemyAccessKey: "x5", descKey: "d14", titleKey: null, tone: "default" },
  { level: 15, requiredExp: 80_192_000, allyAccessKey: "x8", enemyAccessKey: "x8", descKey: "d15", titleKey: "t15", tone: "hunter" },
  { level: 16, requiredExp: 160_384_000, allyAccessKey: null, enemyAccessKey: "x6", descKey: "d16", titleKey: null, tone: "default" },
  { level: 17, requiredExp: 320_768_000, allyAccessKey: null, enemyAccessKey: "x1", descKey: "d17", titleKey: null, tone: "default" },
  { level: 18, requiredExp: 641_536_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d18", titleKey: null, tone: "default" },
  { level: 19, requiredExp: 1_283_072_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d19", titleKey: null, tone: "default" },
  { level: 20, requiredExp: 2_566_144_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d20", titleKey: "t20", tone: "warrior" },
  { level: 21, requiredExp: 5_132_288_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d21", titleKey: null, tone: "default" },
  { level: 22, requiredExp: 10_264_576_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d22", titleKey: null, tone: "default" },
  { level: 23, requiredExp: 20_529_152_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d23", titleKey: null, tone: "default" },
  { level: 24, requiredExp: 41_058_304_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d24", titleKey: null, tone: "default" },
  { level: 25, requiredExp: 82_116_608_000, allyAccessKey: "full", enemyAccessKey: "full", descKey: "d25", titleKey: "t25", tone: "legend" },
];

export const MILESTONE_LEVELS = LEVEL_ROWS.filter((row) => row.titleKey);

export function formatExp(value: number, locale: string) {
  return value.toLocaleString(locale === "en" ? "en-US" : locale === "de" ? "de-DE" : "tr-TR");
}
