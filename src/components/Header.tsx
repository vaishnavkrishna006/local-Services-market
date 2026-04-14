import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { getCurrentUser } from "@/lib/current-user";

export default async function Header() {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch user in Header:", error);
  }

  const links = [
    { href: "/listings", label: "Explore" },
    { href: "/providers/dashboard", label: "Local Pro" },
    { href: "/bookings", label: "Bookings" },
    { href: "/admin", label: "Admin" }
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          LocalPulse
        </Link>
        <nav className="nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          {user ? (
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="button ghost">
                Log out
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" className="button ghost">
                Log in
              </Link>
              <Link href="/register" className="button primary">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
