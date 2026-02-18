import { Link, useLocation } from "react-router-dom";
import { loadState } from "../core/storage";

export default function Layout({title, children }) {
    const { pathname } = useLocation();
    const state = loadState();

    return(
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-3xl px-4 py-8">
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <Link to="/" className="block">
                            <h1 className="text-2xl font-bold tracking-tight hover:text-white">
                                Bug Hunter Game
                            </h1>
                        </Link>
                        {title ? <p className="mt-1 text-sm text-slate-300">{title}</p> : null}
                    </div>
                    <div className="shrink-0 rounded-2xl bg-slate-900/60 px-4 py-3 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">Score</div>
                        <div className="text-lg font-semibold leading-tight">{state.score}</div>
                        <div className="mt-1 text-xs text-slate-400">
                            Answers: <span className="text-slate-200">{state.answers.length}</span>
                        </div>
                    </div>
                </header>
                <main className="rounded-2xl bg-slate-900/60 p-5 shadow-xl ring-1 ring-white/10">
                    {children}
                </main>

                <footer className="mt-6 text-xs text-slate-500">
                    {pathname !== "/" ? (
                        <Link className="hover:text-slate-300" to="/">
                        ← Back to missions
                        </Link>
                    ) : (
                        <span>React + Tailwind • QA gamification</span>
                    )}
                </footer>
            </div>
        </div>
    )
}