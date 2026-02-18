const KEY = "bugHunterGameState_v1";

export function loadState() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return { score: 0, answers: [] };
        const parsed = JSON.parse(raw);
        return {
            score: typeof parsed.score === "number" ? parsed.score: 0,
            answers: Array.isArray(parsed.answers) ? parsed.answers : [],
        };
    } catch {
        return { score: 0, answers: [] };
    }
}

export function saveState(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
    localStorage.removeItem(KEY);
}