import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import missions from "../data/missions.json";
import Layout from "../components/Layout";
import { calcPoints, shouldAwardPoints } from "../core/scoring";
import { loadState, saveState } from "../core/storage";

export default function Mission() {
  const { id } = useParams();
  const nav = useNavigate();

  const mission = useMemo(() => missions.find((m) => m.id === id), [id]);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!mission) {
    return (
      <Layout title="Mission not found">
        <p className="text-slate-300">This mission does not exist.</p>
      </Layout>
    );
  }

  const stateNow = loadState();
  const alreadyAnswered = stateNow.answers.some((a) => a.missionId === mission.id);

  function submit() {
    if (!selected || submitting) return;

    setSubmitting(true);

    const state = loadState();

    const isCorrect = selected === mission.correctOptionId;

    const canAward = shouldAwardPoints({
      missionId: mission.id,
      answers: state.answers,
    });

    const earned = canAward
      ? calcPoints({ isCorrect, severity: mission.severity })
      : 0;

    const next = {
      score: state.score + earned,
      answers: [
        ...state.answers,
        {
          missionId: mission.id,
          selectedOptionId: selected,
          correctOptionId: mission.correctOptionId,
          isCorrect,
          earned,
          canAward,
          severity: mission.severity,
          answeredAt: new Date().toISOString(),
        },
      ],
    };

    saveState(next);

    nav("/result", {
      state: {
        missionId: mission.id,
      },
    });
  }

  return (
    <Layout title={`Mission ${mission.id}`}>
      {alreadyAnswered ? (
        <div className="mb-4 rounded-2xl bg-amber-500/10 p-4 text-sm text-amber-200 ring-1 ring-amber-400/20">
          You already answered this mission before. You can play again, but points will only be awarded once.
        </div>
      ) : null}

      <h2 className="text-xl font-semibold">{mission.title}</h2>
      <p className="mt-2 text-slate-300">{mission.context}</p>

      <div className="mt-4 rounded-2xl bg-slate-950/40 p-4 ring-1 ring-white/10">
        <h3 className="text-sm font-semibold text-slate-200">Evidence</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {mission.evidence.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-200">{mission.question}</h3>

        <div className="mt-3 grid gap-2">
          {mission.options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                data-cy={`option-${opt.id}`}
                onClick={() => setSelected(opt.id)}
                className={[
                  "text-left rounded-2xl p-4 ring-1 transition",
                  active
                    ? "bg-slate-800 ring-white/20"
                    : "bg-slate-900/40 ring-white/10 hover:bg-slate-900/70",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold ring-1 ring-white/10">
                    {opt.id}
                  </span>
                  <div className="text-sm text-slate-200">{opt.label}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Severity: <span className="text-slate-200">{mission.severity}</span>
          </div>

          <button
            onClick={submit}
            data-cy="submit-answer"
            disabled={!selected || submitting}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
