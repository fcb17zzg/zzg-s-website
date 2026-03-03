const SUMMARY_MAX_CHARS = 140;

export function truncateSummary(text: string, maxChars: number = SUMMARY_MAX_CHARS): string {
  const normalized = text.trim();

  if (!normalized) {
    return '';
  }

  if (normalized.length <= maxChars) {
    return normalized;
  }

  return `${normalized.slice(0, maxChars).trimEnd()}…`;
}
