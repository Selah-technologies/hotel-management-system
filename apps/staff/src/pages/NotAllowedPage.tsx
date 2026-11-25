import { Link } from "react-router";
import PageHeader from "../components/PageHeader";

export default function NotAllowedPage() {
  return (
    <div>
      <PageHeader
        title="You are not allowed to open this page"
        description="Your role does not include access to it. If you need it, ask an administrator."
      />
      <Link to="/dashboard" className="text-ink underline">
        Go to Dashboard
      </Link>
    </div>
  );
}