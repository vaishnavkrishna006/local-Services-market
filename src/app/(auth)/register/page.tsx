"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed.");
      setLoading(false);
      return;
    }

    router.push("/providers/dashboard");
  }

  return (
    <div className="container section">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2>Create your account</h2>
        <p className="muted">Join as a customer or provider.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <FormInput label="Name" name="name" required />
          <FormInput label="Email" name="email" type="email" required />
          <FormInput label="Password" name="password" type="password" required />
          <label className="field">
            <span>Role</span>
            <select name="role" defaultValue="CUSTOMER">
              <option value="CUSTOMER">Customer</option>
              <option value="PROVIDER">Provider</option>
            </select>
          </label>
          {error ? <p style={{ color: "#7a2f1b" }}>{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
