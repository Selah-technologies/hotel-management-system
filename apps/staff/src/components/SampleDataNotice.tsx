import { USE_SAMPLE_DATA } from "../config";

export default function SampleDataNotice() {
  if (!USE_SAMPLE_DATA) return null;
  return (
    <p className="mb-6 rounded-lg border border-line bg-sidebar px-4 py-3 text-sm text-ink-soft">
      Showing sample data. This screen is not connected to the hotel&apos;s system yet.
    </p>
  );
}