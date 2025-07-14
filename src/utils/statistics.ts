import { type ReformulationStats } from "../types";

const STATS_KEY = 'reformulake-stats';

export const getStats = (): ReformulationStats => {
  const stored = localStorage.getItem(STATS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { french: 0, english: 0, total: 0 };
};

export const updateStats = (language: 'french' | 'english'): void => {
  const stats = getStats();
  stats[language]++;
  stats.total++;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const getStatsPercentage = (): { french: number; english: number } => {
  const stats = getStats();
  if (stats.total === 0) {
    return { french: 0, english: 0 };
  }
  return {
    french: Math.round((stats.french / stats.total) * 100),
    english: Math.round((stats.english / stats.total) * 100),
  };
};