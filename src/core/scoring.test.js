import { describe, it, expect } from "vitest";
import { calcPoints, shouldAwardPoints } from "./scoring";

describe("calcPoints", () => {
  it("should return 0 if answer is incorrect", () => {
    const points = calcPoints({
      isCorrect: false,
      severity: "Critical",
    });

    expect(points).toBe(0);
  });

  it("should return 15 for correct Critical severity", () => {
    const points = calcPoints({
      isCorrect: true,
      severity: "Critical",
    });

    expect(points).toBe(15);
  });

  it("should return 13 for correct Major severity", () => {
    const points = calcPoints({
      isCorrect: true,
      severity: "Major",
    });

    expect(points).toBe(13);
  });

  it("should return 11 for correct Minor severity", () => {
    const points = calcPoints({
      isCorrect: true,
      severity: "Minor",
    });

    expect(points).toBe(11);
  });

  it("should return 10 if severity is unknown but answer is correct", () => {
    const points = calcPoints({
      isCorrect: true,
      severity: "Unknown",
    });

    expect(points).toBe(10);
  });
});

describe("shouldAwardPoints", () => {
  it("should allow points if mission was never answered", () => {
    const result = shouldAwardPoints({
      missionId: "M1",
      answers: [],
    });

    expect(result).toBe(true);
  });

  it("should prevent awarding points if mission already earned points", () => {
    const result = shouldAwardPoints({
      missionId: "M1",
      answers: [
        { missionId: "M1", earned: 15 },
      ],
    });

    expect(result).toBe(false);
  });

  it("should allow points if mission was answered but earned 0", () => {
    const result = shouldAwardPoints({
      missionId: "M1",
      answers: [
        { missionId: "M1", earned: 0 },
      ],
    });

    expect(result).toBe(true);
  });
});
