import { Link } from "react-router";
import PageHeader from "../components/PageHeader";

export default function NotFoundPage() {
  return (
    <div>
      <PageHeader title="Page not found" description="That address does not exist in the staff app." />
      <Link to="/dashboard" className="text-ink underline">
        Go to Dashboard
      </Link>
    </div>
  );
}