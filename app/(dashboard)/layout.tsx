"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  HardDrive,
  FolderOpen,
  Activity,
  Cpu,
  LogOut,
  Eye,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("admin@trinetra.gov.in");
  // In the start, no item is pre-clicked; all items look uniform
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("trinetra_auth");
    const storedUser = localStorage.getItem("trinetra_user");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      if (storedUser) setUserEmail(storedUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("trinetra_auth");
    localStorage.removeItem("trinetra_user");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const navItems = [
    {
      name: "Engine Overview",
      href: "/dashboard",
      icon: Activity,
    },
    {
      name: "Evidence Vault",
      href: "/dashboard/evidence",
      icon: FolderOpen,
    },
    {
      name: "DVR Carving",
      href: "/dashboard/carving",
      icon: HardDrive,
    },
    {
      name: "Chain of Custody",
      href: "/dashboard/custody",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#09090b] text-white border-b-2 border-[#09090b] px-5 py-3 flex items-center justify-between font-mono text-xs z-30">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-black text-sm tracking-tight text-white hover:text-blue-400 transition-colors"
        >
          <span className="w-6 h-6 bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs border border-white">
            <Eye className="w-3.5 h-3.5" />
          </span>
          <span className="tracking-wider text-sm font-black">TRINETRA FORENSICS</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-zinc-400 text-xs font-mono">
            v1.0.0
          </span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Stark Neo-Brutalist Sidebar */}
        <aside className="w-64 bg-white border-r-2 border-[#09090b] flex flex-col justify-between shrink-0">
          <div className="p-4 space-y-6">
            {/* System Status Node Badge */}
            <div className="p-3 bg-[#fafafa] border-2 border-[#09090b] shadow-[3px_3px_0px_0px_#09090b]">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                <span>SYSTEM KERNEL</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="font-mono font-bold text-xs text-[#09090b] mt-0.5">
                TRINETRA FORENSICS
              </div>
              <div className="text-[10px] font-mono text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>INTEGRITY VERIFIED 100%</span>
              </div>
            </div>

            {/* Navigation links - All uniform by default, real-time click feedback on any part */}
            <nav className="space-y-1.5">
              <div className="px-2 py-1 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                NAVIGATION
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isClicked = clickedItem === item.name;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setClickedItem(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                      isClicked
                        ? "border-[#09090b] bg-[#fafafa] shadow-[2px_2px_0px_0px_#09090b] text-[#09090b]"
                        : "border-transparent text-zinc-700 hover:border-[#09090b] hover:bg-[#fafafa] hover:shadow-[2px_2px_0px_0px_#09090b]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isClicked ? "text-[#2563eb]" : "text-zinc-600"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* System Status Block */}
            <div className="pt-2 border-t-2 border-[#09090b]/10 space-y-2">
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                ENGINE INTEGRITY
              </div>
              <div className="font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-zinc-700">
                  <span>STORAGE CORE:</span>
                  <span className="font-bold text-emerald-600">CONNECTED</span>
                </div>
                <div className="flex justify-between text-zinc-700">
                  <span>QUEUE ENGINE:</span>
                  <span className="font-bold text-emerald-600">ACTIVE</span>
                </div>
                <div className="flex justify-between text-zinc-700">
                  <span>HASH ALGO:</span>
                  <span className="font-bold text-[#09090b]">SHA-256 / MD5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar bottom with Authentication Controls */}
          <div className="p-4 border-t-2 border-[#09090b] bg-[#fafafa] space-y-2">
            <div className="p-2 border border-[#09090b] bg-white font-mono text-[11px]">
              <div className="text-[9px] text-zinc-500 uppercase font-bold flex items-center justify-between">
                <span>SESSION</span>
                <span className="text-emerald-600 font-bold">ACTIVE</span>
              </div>
              <div className="truncate font-bold text-zinc-800 text-[10px] mt-0.5">
                {userEmail}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSignOut}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono font-bold text-[#09090b] border-2 border-[#09090b] bg-white shadow-[2px_2px_0px_0px_#09090b] hover:bg-zinc-100 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>SIGN OUT</span>
              </button>

              <Link
                href="/login"
                className="p-1.5 border-2 border-[#09090b] bg-white shadow-[2px_2px_0px_0px_#09090b] hover:bg-zinc-100 text-[#09090b]"
                title="Switch User / Sign In"
              >
                <Lock className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Dashboard Main Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
