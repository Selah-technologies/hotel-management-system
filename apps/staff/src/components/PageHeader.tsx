type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-ink">{title}</h1>
      {description ? (
        <p className="mt-1 max-w-prose text-sm text-ink-soft">{description}</p>
      ) : null}
    </header>
  );
}