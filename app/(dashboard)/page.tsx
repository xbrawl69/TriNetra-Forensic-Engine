import React from "react";
import Link from "next/link";
import {
  FolderOpen,
  Upload,
  Cpu,
  ShieldCheck,
  Clock,
  Layers,
  FileCheck2,
  HardDrive,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const metrics = [
    {
      title: "TOTAL RECOVERED STREAMS",
      value: "148",
      subtext: "+12 in last 24h",
      icon: HardDrive,
      accent: "#2563eb",
    },
    {
      title: "CRYPTOGRAPHIC ATTESTATIONS",
      value: "100%",
      subtext: "0 Hash Violations",
      icon: ShieldCheck,
      accent: "#16a34a",
    },
    {
      title: "ACTIVE WORKER JOBS",
      value: "3",
      subtext: "BullMQ queue healthy",
      icon: Cpu,
      accent: "#f59e0b",
    },
    {
      title: "NORMALIZED STORAGE",
      value: "4.82 TB",
      subtext: "Retention: 90 Days",
      icon: Layers,
      accent: "#7c3aed",
    },
  ];

  const recentIncidents = [
    {
      caseNumber: "CASE-2026-0912",
      title: "Main Entrance Vault Corridor NVR",
      officer: "Lead Forensic Examiner",
      vendor: "HIKVISION",
      status: "NORMALIZED",
      date: "2026-09-29 18:20",
      id: "ev-01",
    },
    {
      caseNumber: "CASE-2026-0913",
      title: "Perimeter Sector 7 Dahua Backup Drive",
      officer: "Digital Forensic Unit",
      vendor: "DAHUA",
      status: "PROCESSING",
      date: "2026-09-29 21:05",
      id: "ev-02",
    },
    {
      caseNumber: "CASE-2026-0914",
      title: "Loading Dock Cam-03 Proprietary CP Plus Dump",
      officer: "Lead Forensic Examiner",
      vendor: "CP PLUS",
      status: "ANALYZED",
      date: "2026-09-30 00:10",
      id: "ev-03",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#09090b]">
        <div>
          <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
            [ FORENSIC COMMAND & CONTROL ]
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[#09090b] mt-0.5">
            SURVEILLANCE EVIDENCE ENGINE
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/evidence"
            className="btn-brutal text-xs flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Ingest Raw Footage</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="card-brutal p-5 bg-white flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <div
                  className="w-8 h-8 border-2 border-[#09090b] flex items-center justify-center text-white"
                  style={{ backgroundColor: item.accent }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black tracking-tight font-mono text-[#09090b]">
                  {item.value}
                </div>
                <div className="text-xs font-mono text-zinc-600 mt-1">
                  {item.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Case Files */}
        <div className="lg:col-span-8 card-brutal p-6 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#09090b]">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#2563eb]" />
              <h2 className="font-black text-lg tracking-tight">
                ACTIVE EVIDENCE VAULT
              </h2>
            </div>
            <Link
              href="/dashboard/evidence"
              className="text-xs font-mono font-bold text-[#2563eb] hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#09090b] bg-[#fafafa]">
                  <th className="p-3 font-bold text-[#09090b]">CASE REF</th>
                  <th className="p-3 font-bold text-[#09090b]">TITLE</th>
                  <th className="p-3 font-bold text-[#09090b]">VENDOR</th>
                  <th className="p-3 font-bold text-[#09090b]">STATUS</th>
                  <th className="p-3 font-bold text-[#09090b]">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-[#09090b]">
                {recentIncidents.map((incident) => (
                  <tr key={incident.caseNumber} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-3 font-bold text-[#2563eb]">
                      {incident.caseNumber}
                    </td>
                    <td className="p-3 font-sans font-medium text-zinc-900">
                      {incident.title}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 border border-[#09090b] bg-zinc-100 font-bold text-[10px]">
                        {incident.vendor}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 border border-[#09090b] text-[10px] font-bold ${
                          incident.status === "ANALYZED"
                            ? "bg-emerald-100 text-emerald-900"
                            : incident.status === "NORMALIZED"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/dashboard/evidence/${incident.id}`}
                        className="btn-brutal-secondary text-[11px] py-1 px-2.5"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Engine Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-brutal p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#09090b]">
              <Cpu className="w-5 h-5 text-[#2563eb]" />
              <h2 className="font-black text-lg tracking-tight">
                PROCESSING QUEUE
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 border-2 border-[#09090b] bg-[#fafafa]">
                <div className="flex justify-between font-bold mb-1">
                  <span>BULLMQ WORKER #1</span>
                  <span className="text-emerald-600">ONLINE</span>
                </div>
                <div className="text-[11px] text-zinc-600">
                  Transcoding DHFS H.264 stream to standardized MP4 container.
                </div>
                <div className="w-full bg-zinc-200 h-2 mt-2 border border-[#09090b] overflow-hidden">
                  <div className="bg-[#2563eb] h-full w-3/4 animate-pulse" />
                </div>
              </div>

              <div className="p-3 border-2 border-[#09090b] bg-[#fafafa]">
                <div className="flex justify-between font-bold mb-1">
                  <span>YOLOv8 DETECTOR</span>
                  <span className="text-emerald-600">READY</span>
                </div>
                <div className="text-[11px] text-zinc-600">
                  Inference latency: 14.2ms / frame. Facial bounding vector
                  ready.
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900 text-white font-mono text-[11px] border-2 border-[#09090b]">
              <div className="text-zinc-400 text-[10px]">INTEGRITY SIGNATURE</div>
              <div className="truncate text-emerald-400 font-bold mt-1">
                SHA256: 4f8b2d19e07b5a83c74d619...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
