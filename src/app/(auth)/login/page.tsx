"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/listings");
  }

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
        <h2>Welcome back</h2>
        <p className="muted">Sign in to manage your bookings.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <FormInput label="Email" name="email" type="email" required />
          <FormInput label="Password" name="password" type="password" required />
          {error ? <p style={{ color: "#7a2f1b" }}>{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
