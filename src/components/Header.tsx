import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/listings", label: "Explore" },
  { href: "/providers/dashboard", label: "Provider" },
  { href: "/bookings", label: "Bookings" },
  { href: "/admin", label: "Admin" }
];

export default function Header() {
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
          <Link href="/login" className="button ghost">
            Log in
          </Link>
          <Link href="/register" className="button primary">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
