import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  children: ReactNode;
};

export default function Panel({ title, children }: PanelProps) {
  return (
    <section className="rounded-xl border border-line bg-white p-6">
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}