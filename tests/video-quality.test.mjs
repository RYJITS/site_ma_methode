import assert from "node:assert/strict";
import { test } from "node:test";
import {
  VIDEO_1080_MIN_MBPS,
  calculateMegabitsPerSecond,
  chooseAdaptiveVideoQuality
} from "../src/video-quality.js";

test("selectionne 1080p quand le debit reel laisse une marge suffisante", () => {
  const result = chooseAdaptiveVideoQuality({
    effectiveType: "4g",
    downlinkMbps: 10,
    measuredMbps: VIDEO_1080_MIN_MBPS + 1,
    probeSucceeded: true
  });
  assert.equal(result.quality, "1080");
});

test("le debit reel rapide prime sur une estimation navigateur trop prudente", () => {
  const result = chooseAdaptiveVideoQuality({
    effectiveType: "4g",
    downlinkMbps: 1.5,
    measuredMbps: 25,
    probeSucceeded: true
  });
  assert.equal(result.quality, "1080");
});

test("selectionne 900p quand le debit mesure est trop faible", () => {
  const result = chooseAdaptiveVideoQuality({
    effectiveType: "4g",
    downlinkMbps: 10,
    measuredMbps: VIDEO_1080_MIN_MBPS - 0.5,
    probeSucceeded: true
  });
  assert.equal(result.quality, "900");
});

test("selectionne 900p pour economie de donnees, 3g ou mesure impossible", () => {
  assert.equal(chooseAdaptiveVideoQuality({ saveData: true, probeSucceeded: true, measuredMbps: 20 }).quality, "900");
  assert.equal(chooseAdaptiveVideoQuality({ effectiveType: "3g", probeSucceeded: true, measuredMbps: 20 }).quality, "900");
  assert.equal(chooseAdaptiveVideoQuality({ probeSucceeded: false }).quality, "900");
});

test("calcule le debit en megabits par seconde", () => {
  assert.equal(calculateMegabitsPerSecond(750000, 1000), 6);
  assert.equal(calculateMegabitsPerSecond(0, 1000), 0);
});
