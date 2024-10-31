import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <main className="flex h-screen flex-1 flex-col gap-3 overflow-hidden bg-primary p-5 text-accent lg:flex-col">
      <span> LoginPage</span>
      <Link className="btn" to="/admin">
        Admin
      </Link>
      <Link className="btn" to="/">
        User
      </Link>
    </main>
  );
}
