export const VIDEO_1080_MIN_MBPS = 6;

const SLOW_EFFECTIVE_TYPES = new Set(["slow-2g", "2g", "3g"]);

export function chooseAdaptiveVideoQuality(signals = {}) {
  const effectiveType = String(signals.effectiveType || "").toLowerCase();
  const measuredMbps = toPositiveNumber(signals.measuredMbps);
  const deviceMemoryGb = toPositiveNumber(signals.deviceMemoryGb);

  if (signals.saveData === true) {
    return { quality: "900", reason: "économie de données active" };
  }
  if (deviceMemoryGb > 0 && deviceMemoryGb <= 2) {
    return { quality: "900", reason: "appareil à mémoire limitée" };
  }
  if (SLOW_EFFECTIVE_TYPES.has(effectiveType)) {
    return { quality: "900", reason: `réseau ${effectiveType}` };
  }
  if (signals.probeSucceeded !== true) {
    return { quality: "900", reason: "mesure de débit indisponible" };
  }
  if (measuredMbps < VIDEO_1080_MIN_MBPS) {
    return { quality: "900", reason: "débit mesuré insuffisant" };
  }
  return { quality: "1080", reason: "débit mesuré suffisant" };
}

export function calculateMegabitsPerSecond(bytes, elapsedMs) {
  const safeBytes = Number(bytes);
  const safeElapsedMs = Number(elapsedMs);
  if (!Number.isFinite(safeBytes) || safeBytes <= 0 || !Number.isFinite(safeElapsedMs) || safeElapsedMs <= 0) return 0;
  return (safeBytes * 8) / (safeElapsedMs * 1000);
}

function toPositiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
