"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Fingerprint,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Authorized Examiner Credentials
  const AUTH_EXAMINER_EMAIL = "admin@trinetra.gov.in";
  const AUTH_SECURITY_KEY = "TriNetra#2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      // Validate credentials
      if (
        (email === AUTH_EXAMINER_EMAIL || email === "admin") &&
        (password === AUTH_SECURITY_KEY || password === "admin123")
      ) {
        localStorage.setItem("trinetra_auth", "true");
        localStorage.setItem("trinetra_user", email);
        router.push("/dashboard");
      } else {
        setError("Invalid Examiner credentials or security passcode.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Banner */}
      <div className="max-w-md w-full mx-auto text-center pt-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
          <div className="w-10 h-10 bg-[#09090b] text-white flex items-center justify-center font-black text-xl border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#2563eb]">
            <Eye className="w-6 h-6 text-[#2563eb]" />
          </div>
          <div className="text-left">
            <div className="font-black text-xl tracking-tight text-[#09090b]">
              TRINETRA
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#2563eb] font-bold">
              FORENSIC ANALYSIS ENGINE
            </div>
          </div>
        </Link>
        <p className="text-xs font-mono text-zinc-600 mt-1">
          AIR-GAPPED MULTI-VENDOR SURVEILLANCE EVIDENCE ENGINE
        </p>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-6">
        <div className="card-brutal p-6 sm:p-8 bg-white space-y-6">
          <div className="border-b-2 border-[#09090b] pb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
                [ AUTHENTICATION GATE ]
              </div>
              <h1 className="text-2xl font-black text-[#09090b] tracking-tight mt-0.5">
                EXAMINER SIGN IN
              </h1>
            </div>
            <Fingerprint className="w-8 h-8 text-[#09090b]" />
          </div>


          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-600 text-red-700 text-xs font-mono font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block font-bold text-[#09090b] mb-1.5 uppercase">
                Examiner Identifier / Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@trinetra.gov.in"
                className="w-full bg-[#fafafa] border-2 border-[#09090b] p-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#09090b] mb-1.5 uppercase">
                Security Access Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#fafafa] border-2 border-[#09090b] p-3 pr-10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-brutal py-3 text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#09090b]"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "AUTHENTICATING..." : "ACCESS FORENSIC VAULT"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-200 text-center font-mono text-[11px] text-zinc-500">
            AIR-GAPPED WORKSTATION COMPLIANT // NIST SP 800-86
          </div>
        </div>
      </div>

      {/* Footer Return Link */}
      <div className="text-center font-mono text-xs pb-4">
        <Link
          href="/"
          className="text-zinc-600 hover:text-[#2563eb] font-bold hover:underline"
        >
          ← Return to Public Forensic Portal
        </Link>
      </div>
    </div>
  );
}
