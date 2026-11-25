type Stat = {
  label: string;
  value: string;
  note?: string;
};

type StatPanelProps = {
  label: string;
  stats: Stat[];
};

export default function StatPanel({ label, stats }: StatPanelProps) {
  return (
    <section aria-label={label} className="rounded-xl bg-night text-white">
      <dl className="divide-y divide-night-line">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6">
            <dt className="text-sm text-night-soft">{stat.label}</dt>
            <dd className="mt-2 text-3xl font-bold">{stat.value}</dd>
            {stat.note ? <p className="mt-1 text-xs text-night-soft">{stat.note}</p> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}