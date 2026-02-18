import { Link, useLocation } from "react-router-dom";
import missions from "../data/missions.json";
import Layout from "../components/Layout";
import { loadState } from "../core/storage";

export default function Result() {
  const { state } = useLocation();
  const missionId = state?.missionId;

  const mission = missions.find((m) => m.id === missionId);

  // pega a última resposta dessa missão (a que acabou de ser salva)
  const game = loadState();
  const last = [...game.answers].reverse().find((a) => a.missionId === missionId);

  if (!mission || !last) {
    return (
      <Layout title="Result not found">
        <p className="text-slate-300">No result data. Go back and play a mission.</p>
        <div className="mt-4">
          <Link className="text-indigo-300 hover:text-indigo-200" to="/">
            Go to missions
          </Link>
        </div>
      </Layout>
    );
  }

  const correctLabel = mission.options.find((o) => o.id === mission.correctOptionId)?.label;
  const selectedLabel = mission.options.find((o) => o.id === last.selectedOptionId)?.label;

  return (
    <Layout title="Mission result">
      <div
        data-cy="result-card"
        className={[
          "rounded-2xl p-4 ring-1",
          last.isCorrect
            ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
            : "bg-rose-500/10 text-rose-200 ring-rose-400/20",
        ].join(" ")}
      >
        <div className="text-sm font-semibold">
          {last.isCorrect ? "Correct ✅" : "Not quite ❌"}
        </div>
        <div className="mt-1 text-sm" data-cy="points-earned">
          Points earned: <span className="font-semibold">{last.earned}</span>
        </div>
        {last.isCorrect && last.canAward === false ? (
        <div className="mt-2 text-xs text-slate-300" data-cy="no-points-message">
            Points were not awarded because this mission was already scored previously.
        </div>
        ) : null}
      </div>

      <div className="mt-5 rounded-2xl bg-slate-950/40 p-4 ring-1 ring-white/10">
        <h2 className="text-base font-semibold">{mission.title}</h2>
        <p className="mt-2 text-sm text-slate-300">
          <span className="text-slate-400">Your answer:</span>{" "}
          <span className="text-slate-100">{selectedLabel ?? last.selectedOptionId}</span>
        </p>
        <p className="mt-1 text-sm text-slate-300">
          <span className="text-slate-400">Correct:</span>{" "}
          <span className="text-slate-100">{correctLabel ?? mission.correctOptionId}</span>
        </p>

        <div className="mt-3 text-sm text-slate-300">
          <div className="text-xs font-semibold text-slate-200">Explanation</div>
          <p className="mt-1">{mission.explanation}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link
          to="/"
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700"
        >
          Back to missions
        </Link>

        <Link
          to={`/mission/${mission.id}`}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Play again
        </Link>
      </div>
    </Layout>
  );
}
