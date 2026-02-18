const bonusBySeverity = {
    Critical: 5,
    Major: 3,
    Minor:1,
};

export function calcPoints({ isCorrect, severity }) {
    if (!isCorrect) return 0;
    const base = 10;
    const bonus = bonusBySeverity[severity] ?? 0;
    return base + bonus;
}