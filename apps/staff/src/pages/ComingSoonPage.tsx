import PageHeader from "../components/PageHeader";

type ComingSoonPageProps = {
  title: string;
};

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <div>
      <PageHeader title={title} description="This page is built in a later step." />
    </div>
  );
}