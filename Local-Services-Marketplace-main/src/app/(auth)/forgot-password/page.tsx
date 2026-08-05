"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    // Simulating API call for password reset
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="bg-[#f8f6f6] min-h-[calc(100vh-140px)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ec5b13]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#ec5b13]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#ec5b13] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#ec5b13]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 15h10"/><path d="M12 15v2"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Forgot Password?</h1>
          <p className="text-slate-600 mt-3 text-center px-4 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-focus-within:text-[#ec5b13] transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/50 focus:border-[#ec5b13] transition-all" 
                  id="email" name="email" placeholder="name@example.com" required type="email"
                />
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-semibold py-3.5 rounded-lg shadow-md shadow-[#ec5b13]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Sending..." : "Send Reset Link"}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </form>

          {/* Success Indicator */}
          {success && (
            <div className="mt-6 p-4 bg-[#ec5b13]/10 border border-[#ec5b13]/20 rounded-lg flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec5b13] mt-0.5 shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              <p className="text-sm text-slate-800">
                If an account exists for that email, you will receive reset instructions shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link className="inline-flex items-center gap-2 text-slate-600 hover:text-[#ec5b13] transition-colors font-medium" href="/login">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Support Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Having trouble? <Link className="text-[#ec5b13] hover:underline" href="#">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
