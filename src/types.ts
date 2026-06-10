export type ParticleMode = "calm" | "chaos" | "constellation";

export type TimelineItem = {
  kind: "work" | "education";
  title: string;
  subtitle: string;
  dates: string;
  place?: string;
  meta?: string;
  details: string[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  metrics: string[];
  problem: string;
  built: string[];
  architecture: string[];
  learned: string;
  fun: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};
