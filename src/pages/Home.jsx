import { Link } from "react-router-dom";
import missions from "../data/missions.json";
import Layout from "../components/Layout";
import { resetState } from "../core/storage";

export default function Home() {
    return(
        <Layout title="Pick a mission and hunt the bug.">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-300">
                    Each correct answer: <span className="text-slate-100 font-semibold">10</span> + severity bonus.
                </p>
                <button
                    data-cy="reset-progress"
                    onClick={() => {
                        resetState();
                        location.reload();
                    }}
                    className="rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
                    >
                    Reset progress
                </button>
            </div>
            <div className="grid gap-3">
                {missions.map((m) => (
                    <Link
                        key={m.id}
                        to={`/mission/${m.id}`}
                        data-cy={`mission-card-${m.id}`}
                        className="group rounded-2xl bg-slate-800/40 p-4 ring-1 ring-white/10 hover:bg-slate-800/70"
                    >
                        <div className="flex items-center justify-between gap-3">
                        <h2 className="min-w-0 truncate text-base font-semibold group-hover:text-white">
                            {m.title}
                        </h2>
                        <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                            {m.severity}
                        </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-300">{m.context}</p>
                        <p className="mt-3 text-xs text-slate-400">Start mission →</p>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}