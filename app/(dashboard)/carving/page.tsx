"use client";

import React, { useState } from "react";
import {
  HardDrive,
  Cpu,
  RefreshCw,
  CheckCircle2,
  FileSearch,
  Layers,
  Database,
  Terminal,
} from "lucide-react";

export default function DvrCarvingPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [vendor, setVendor] = useState("Dahua (DHFS)");
  const [logs, setLogs] = useState([
    "[04:12:01] Initialized direct block reader at /dev/sdb1",
    "[04:12:02] Magic bytes matched: 0x44 0x48 0x46 0x53 ('DHFS')",
    "[04:12:05] Scanning unallocated blocks for fragmented H.264 NAL units...",
    "[04:12:08] Recovered frame cluster #01: Offset 0x00A41000 - Size 2.4 MB",
    "[04:12:11] Recovered frame cluster #02: Offset 0x00B82000 - Size 4.8 MB",
    "[04:12:14] Checksum validated against parent partition table. Status: OK",
  ]);

  const handleStartCarve = () => {
    setIsScanning(true);
    setTimeout(() => {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Deep carving pass triggered for ${vendor}`,
        `[${new Date().toLocaleTimeString()}] Rebuilding fragmented index tables...`,
        `[${new Date().toLocaleTimeString()}] Extracted 1,420 intact video blocks without filesystem headers`,
        ...prev,
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#09090b]">
        <div>
          <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider">
            [ UNALLOCATED SPACE RECOVERY ]
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[#09090b] mt-0.5">
            DVR / NVR RAW FILE SYSTEM CARVING
          </h1>
        </div>

        <button
          onClick={handleStartCarve}
          disabled={isScanning}
          className="btn-brutal text-xs py-2.5 px-5 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "SCANNING SECTORS..." : "EXECUTE DEEP CARVE"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="card-brutal p-4 bg-white">
          <div className="text-zinc-500 uppercase font-bold text-[10px]">
            ACTIVE CARVER ENGINE
          </div>
          <div className="text-xl font-black mt-1 text-[#09090b]">
            TriNetra Carve v2.4
          </div>
          <div className="text-emerald-600 font-bold mt-1 text-[11px]">
            PROPRIETARY DHFS / HIKFS
          </div>
        </div>

        <div className="card-brutal p-4 bg-white">
          <div className="text-zinc-500 uppercase font-bold text-[10px]">
            RECOVERED STREAM BLOCKS
          </div>
          <div className="text-xl font-black mt-1 text-[#2563eb]">
            1,420 BLOCKS
          </div>
          <div className="text-zinc-600 mt-1 text-[11px]">
            Zero header corruption
          </div>
        </div>

        <div className="card-brutal p-4 bg-white">
          <div className="text-zinc-500 uppercase font-bold text-[10px]">
            BUFFER THROUGHPUT
          </div>
          <div className="text-xl font-black mt-1 text-[#09090b]">
            480 MB/s
          </div>
          <div className="text-zinc-600 mt-1 text-[11px]">
            Hardware DMA Active
          </div>
        </div>
      </div>

      {/* Terminal Carving Stream */}
      <div className="card-brutal p-6 bg-zinc-950 text-emerald-400 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">
              LIVE SECTOR SCAN & RAW STREAM EXTRACTION
            </span>
          </div>
          <span className="text-[11px]">TARGET: /dev/sdb1 (RAW DISK DUMP)</span>
        </div>

        <div className="space-y-1.5 max-h-80 overflow-y-auto pt-2 font-mono text-[11px] leading-relaxed">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-emerald-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
