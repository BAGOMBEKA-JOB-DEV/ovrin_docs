import { PIPELINE_STAGES } from '@/content/home/moments';

export function StageRail() {
  return (
    <ol className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
      {PIPELINE_STAGES.map((stage, index) => (
        <li
          key={stage}
          className="flex items-baseline gap-1.5 rounded-pill border border-hairline px-3 py-1 text-micro text-ink-secondary"
        >
          <span className="tabular-nums opacity-60">{index + 1}</span>
          {stage}
        </li>
      ))}
    </ol>
  );
}
