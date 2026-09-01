export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#efefeb] text-slate-900 transition-colors duration-200 dark:bg-[#0b1220] dark:text-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.2s] dark:bg-slate-100" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.1s] dark:bg-slate-100" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 dark:bg-slate-100" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Loading Ovrin docs
        </p>
      </div>
    </div>
  );
}
