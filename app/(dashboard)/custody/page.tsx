"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  Lock,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function ChainOfCustodyPage() {
  const auditLogs = [
    {
      id: "LOG-901",
      caseNumber: "CR-2026-8819",
      action: "EVIDENCE_INGESTION",
      hash: "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
      timestamp: "2026-09-29 14:35:00 UTC",
      officer: "Lead Forensic Examiner",
      status: "VERIFIED",
    },
    {
      id: "LOG-902",
      caseNumber: "CR-2026-8819",
      action: "BITSTREAM_NORMALIZATION",
      hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      timestamp: "2026-09-29 14:37:12 UTC",
      officer: "TriNetra Transcoder Node 1",
      status: "VERIFIED",
    },
    {
      id: "LOG-903",
      caseNumber: "CR-2026-8820",
      action: "EVIDENCE_INGESTION",
      hash: "4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945",
      timestamp: "2026-09-29 16:12:00 UTC",
      officer: "Lead Forensic Examiner",
      status: "VERIFIED",
    },
    {
      id: "LOG-904",
      caseNumber: "CR-2026-8821",
      action: "INTEGRITY_AUDIT_PASS",
      hash: "11223344556677889900aabbccddeeff00112233445566778899aabbccddeeff",
      timestamp: "2026-09-30 00:05:00 UTC",
      officer: "Supervisory Auditor",
      status: "ATTESTED",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#09090b]">
        <div>
          <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
            [ IMMUTABLE RELATIONAL LEDGER ]
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[#09090b] mt-0.5">
            CRYPTOGRAPHIC CHAIN OF CUSTODY
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-600 px-3 py-1.5 font-mono text-xs text-emerald-900 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ZERO RECORD TAMPERING DETECTED</span>
        </div>
      </div>

      <div className="card-brutal p-6 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#09090b]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#2563eb]" />
            <h2 className="font-black text-lg tracking-tight">
              MASTER CUSTODY AUDIT LOG
            </h2>
          </div>
          <span className="text-xs font-mono bg-zinc-100 border border-[#09090b] px-2 py-0.5 font-bold">
            STANDARD: SEC 65B COMPLIANT
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#09090b] bg-[#fafafa]">
                <th className="p-3 font-bold text-[#09090b]">LOG ID</th>
                <th className="p-3 font-bold text-[#09090b]">CASE REF</th>
                <th className="p-3 font-bold text-[#09090b]">OPERATION</th>
                <th className="p-3 font-bold text-[#09090b]">SHA-256 BITSTREAM HASH</th>
                <th className="p-3 font-bold text-[#09090b]">TIMESTAMP</th>
                <th className="p-3 font-bold text-[#09090b]">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b border-[#09090b]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3 font-bold text-zinc-600">{log.id}</td>
                  <td className="p-3 font-bold text-[#2563eb]">
                    <Link href="/dashboard/evidence" className="hover:underline">
                      {log.caseNumber}
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className="bg-zinc-100 border border-[#09090b] px-2 py-0.5 font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-zinc-600">
                    <div className="truncate max-w-[200px]" title={log.hash}>
                      {log.hash}
                    </div>
                  </td>
                  <td className="p-3 text-zinc-700 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 border border-emerald-900 bg-emerald-100 text-emerald-950 text-[10px] font-bold">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
