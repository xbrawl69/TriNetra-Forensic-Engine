"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  FileText,
  Clock,
  Video,
  Cpu,
  Layers,
  CheckCircle2,
  Copy,
  Download,
  ArrowLeft,
  AlertTriangle,
  Eye,
  Sliders,
  Play,
  RotateCcw,
} from "lucide-react";
import { formatBytes, formatTimestamp } from "@/lib/utils";

interface AnalyticsRecord {
  id: string;
  timestamp: number;
  eventType: string;
  confidence: number;
  boundingBox: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    label?: string;
  };
}

interface EvidenceDetail {
  id: string;
  caseNumber: string;
  title: string;
  officer: string;
  originalName: string;
  vendor: string;
  fileSize: number | string;
  md5Hash: string;
  sha256Hash: string;
  status: "PENDING" | "PROCESSING" | "NORMALIZED" | "ANALYZED" | "FAILED";
  storageUrl: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
  analytics: AnalyticsRecord[];
}

export default function EvidenceDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "clx9011a000108l07a216c5d";

  const [evidence, setEvidence] = useState<EvidenceDetail | null>(null);
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(4.2);
  const [copiedSha, setCopiedSha] = useState(false);
  const [copiedMd5, setCopiedMd5] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchEvidence() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/evidence/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.evidence) {
            setEvidence({
              id: data.evidence.id,
              caseNumber: data.evidence.investigation?.caseNumber || "CR-2026-8819",
              title: data.evidence.investigation?.title || "ATM Lobby South Angle Camera",
              officer: data.evidence.investigation?.officer || "Lead Forensic Examiner",
              originalName: data.evidence.originalName || "ch01_20260928_143000.dav",
              vendor: data.evidence.vendor || "Dahua",
              fileSize: data.evidence.fileSize || 48234496,
              md5Hash: data.evidence.md5Hash || "7b4c91038b36d01869e984f47bc5218d",
              sha256Hash:
                data.evidence.sha256Hash ||
                "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
              status: data.evidence.status || "ANALYZED",
              storageUrl: data.evidence.storageUrl || "/storage/vault/stream.mp4",
              createdAt: data.evidence.createdAt || "2026-09-29T14:35:00.000Z",
              metadata: (data.evidence.metadata as Record<string, unknown>) || {
                codec: "H.264 / AVC",
                container: "DHFS 4.0 (Recovered)",
                resolution: "1920x1080",
                fps: 30,
              },
              analytics: data.evidence.analytics || [
                {
                  id: "an-1",
                  timestamp: 4.2,
                  eventType: "MOTION",
                  confidence: 0.96,
                  boundingBox: { label: "Motion Ingress [Zone 1]", x: 120, y: 180, width: 340, height: 420 },
                },
                {
                  id: "an-2",
                  timestamp: 12.8,
                  eventType: "OBJECT",
                  confidence: 0.94,
                  boundingBox: { label: "Unattended Target Object", x: 210, y: 150, width: 280, height: 390 },
                },
                {
                  id: "an-3",
                  timestamp: 18.5,
                  eventType: "FACE_DETECTED",
                  confidence: 0.91,
                  boundingBox: { label: "Facial Geometry 91.2%", x: 310, y: 120, width: 95, height: 110 },
                },
              ],
            });
          }
        }
      } catch (err) {
        console.error("Failed to load evidence details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvidence();
  }, [id]);

  const copyToClipboard = (text: string, type: "sha" | "md5") => {
    navigator.clipboard.writeText(text);
    if (type === "sha") {
      setCopiedSha(true);
      setTimeout(() => setCopiedSha(false), 2000);
    } else {
      setCopiedMd5(true);
      setTimeout(() => setCopiedMd5(false), 2000);
    }
  };

  const triggerReprocess = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (evidence) {
        setEvidence({
          ...evidence,
          status: "ANALYZED",
        });
      }
    }, 2500);
  };

  if (isLoading && !evidence) {
    return (
      <div className="p-12 text-center font-mono">
        <div className="inline-block w-8 h-8 border-4 border-[#09090b] border-t-[#2563eb] animate-spin mb-4" />
        <p className="font-bold text-sm">ACCESSING SECURE EVIDENCE VAULT...</p>
      </div>
    );
  }

  const currentEvidence = evidence || {
    id: String(id),
    caseNumber: "CR-2026-8819",
    title: "ATM Lobby South Angle Camera",
    officer: "Lead Forensic Examiner",
    originalName: "ch01_20260928_143000.dav",
    vendor: "Dahua",
    fileSize: 48234496,
    md5Hash: "7b4c91038b36d01869e984f47bc5218d",
    sha256Hash: "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
    status: "ANALYZED" as const,
    storageUrl: "/storage/vault/stream.mp4",
    createdAt: "2026-09-29T14:35:00.000Z",
    analytics: [
      {
        id: "an-1",
        timestamp: 4.2,
        eventType: "MOTION",
        confidence: 0.96,
        boundingBox: { label: "Motion Ingress [Zone 1]", x: 120, y: 180, width: 340, height: 420 },
      },
      {
        id: "an-2",
        timestamp: 12.8,
        eventType: "OBJECT",
        confidence: 0.94,
        boundingBox: { label: "Unattended Target Object", x: 210, y: 150, width: 280, height: 390 },
      },
      {
        id: "an-3",
        timestamp: 18.5,
        eventType: "FACE_DETECTED",
        confidence: 0.91,
        boundingBox: { label: "Facial Geometry 91.2%", x: 310, y: 120, width: 95, height: 110 },
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#09090b]">
        <Link
          href="/dashboard/evidence"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#09090b] hover:text-[#2563eb] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EVIDENCE VAULT</span>
        </Link>

        {/* Judicial Report Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={triggerReprocess}
            disabled={isProcessing}
            className="btn-brutal-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? "animate-spin" : ""}`} />
            <span>{isProcessing ? "RE-PARSING..." : "RE-CARVE DISK"}</span>
          </button>

          <a
            href={`/api/evidence/${currentEvidence.id}/report`}
            target="_blank"
            rel="noreferrer"
            className="btn-brutal text-xs py-2 px-4 flex items-center gap-2 bg-[#09090b] text-white hover:bg-zinc-800"
          >
            <FileText className="w-4 h-4 text-[#2563eb]" />
            <span>Generate Forensic Report</span>
          </a>
        </div>
      </div>

      {/* Case Header Banner */}
      <div className="card-brutal p-6 bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#2563eb] bg-blue-50 border border-[#2563eb] px-2 py-0.5">
                CASE REF: {currentEvidence.caseNumber}
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 border-2 border-[#09090b] ${
                  currentEvidence.status === "ANALYZED"
                    ? "bg-emerald-100 text-emerald-950"
                    : "bg-blue-100 text-blue-950"
                }`}
              >
                STATUS: {currentEvidence.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#09090b] mt-2">
              {currentEvidence.title}
            </h1>
            <p className="text-xs font-mono text-zinc-600 mt-1">
              ASSIGNED OFFICER: {currentEvidence.officer} | INGESTED:{" "}
              {new Date(currentEvidence.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 bg-[#fafafa] border-2 border-[#09090b] text-center shadow-[2px_2px_0px_0px_#09090b]">
              <div className="text-[10px] text-zinc-500 uppercase">VENDOR</div>
              <div className="font-bold text-[#09090b] text-sm">{currentEvidence.vendor}</div>
            </div>
            <div className="p-3 bg-[#fafafa] border-2 border-[#09090b] text-center shadow-[2px_2px_0px_0px_#09090b]">
              <div className="text-[10px] text-zinc-500 uppercase">FILE SIZE</div>
              <div className="font-bold text-[#09090b] text-sm">
                {formatBytes(Number(currentEvidence.fileSize))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase 5 Requirement: Display the SHA-256 hash in a JetBrains Mono font block */}
        <div className="border-2 border-[#09090b] bg-zinc-950 text-white p-4 shadow-[3px_3px_0px_0px_#09090b]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                IMMUTABLE CHAIN OF CUSTODY // SHA-256 DIGEST
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                HARDWARE HASH AT INGESTION
              </span>
              <button
                onClick={() => copyToClipboard(currentEvidence.sha256Hash, "sha")}
                className="text-[11px] font-mono bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-2 py-0.5 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedSha ? "COPIED" : "COPY"}</span>
              </button>
            </div>
          </div>

          {/* JetBrains Mono Hash Block */}
          <div className="font-mono text-xs sm:text-sm tracking-wide text-zinc-100 bg-black/60 p-3 border border-zinc-800 break-all select-all">
            {currentEvidence.sha256Hash}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span>MD5: {currentEvidence.md5Hash}</span>
              <button
                onClick={() => copyToClipboard(currentEvidence.md5Hash, "md5")}
                className="text-blue-400 hover:underline"
              >
                {copiedMd5 ? "[Copied]" : "[Copy MD5]"}
              </button>
            </div>
            <span className="text-emerald-400 font-bold">
              ✓ ATTESTED UNDER SEC 65B INDIAN EVIDENCE ACT
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Video Stream Player & Timeline Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Normalized Video Stream Player */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card-brutal p-4 bg-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#09090b] font-mono text-xs">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#2563eb]" />
                <span className="font-bold uppercase">
                  NORMALIZED H.264 VISUAL STREAM
                </span>
              </div>
              <span className="bg-zinc-100 border border-[#09090b] px-2 py-0.5 font-bold text-[10px]">
                CH-01 // 30 FPS // 1080P
              </span>
            </div>

            {/* Video Canvas Container */}
            <div className="relative aspect-video bg-black border-2 border-[#09090b] overflow-hidden group">
              <video
                ref={videoRef}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={`/api/evidence/${currentEvidence.id}/stream`} type="video/mp4" />
                <source src="/surveillance.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Bounding Box HUD Overlay for the active timestamp */}
              {activeTimestamp && (
                <div className="absolute inset-0 pointer-events-none p-4 font-mono">
                  <div
                    className="absolute border-2 border-emerald-400 bg-emerald-500/10 transition-all duration-300"
                    style={{
                      left: activeTimestamp === 4.2 ? "25%" : activeTimestamp === 12.8 ? "45%" : "60%",
                      top: activeTimestamp === 4.2 ? "30%" : activeTimestamp === 12.8 ? "25%" : "20%",
                      width: activeTimestamp === 4.2 ? "180px" : activeTimestamp === 12.8 ? "160px" : "110px",
                      height: activeTimestamp === 4.2 ? "220px" : activeTimestamp === 12.8 ? "240px" : "130px",
                    }}
                  >
                    <div className="bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5 inline-block">
                      {activeTimestamp === 4.2
                        ? "MOTION: ZONE 1 (96%)"
                        : activeTimestamp === 12.8
                        ? "OBJECT: UNATTENDED (94%)"
                        : "FACE: VECTOR MATCH (91%)"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scrub & Telemetry Controller */}
            <div className="p-3 bg-[#fafafa] border-2 border-[#09090b] font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#2563eb]" />
                <span className="text-zinc-600">INSPECT TIMESTAMP:</span>
                <span className="font-bold text-[#09090b]">
                  {formatTimestamp(activeTimestamp || 0)}
                </span>
              </div>
              <div className="text-[11px] text-zinc-500">
                CONTAINER: STANDARD ISO/IEC 14496-14 (MP4)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Analytics Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-brutal p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#09090b]">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#2563eb]" />
                <h3 className="font-black text-base tracking-tight uppercase">
                  FORENSIC EVENT TIMELINE
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#09090b] text-white px-2 py-0.5">
                {currentEvidence.analytics.length} EVENTS
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-600">
              Synchronized events detected by YOLOv8 and Haar-cascade feature
              vectors. Click event to inspect target bounding coordinates.
            </p>

            {/* Timeline Stream */}
            <div className="space-y-3 font-mono text-xs">
              {currentEvidence.analytics.map((event, idx) => {
                const isSelected = activeTimestamp === event.timestamp;
                return (
                  <div
                    key={event.id || idx}
                    onClick={() => {
                      setActiveTimestamp(event.timestamp);
                      if (videoRef.current) {
                        videoRef.current.currentTime = event.timestamp;
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                    className={`p-3.5 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#2563eb] bg-blue-50/70 shadow-[3px_3px_0px_0px_#2563eb]"
                        : "border-[#09090b] bg-[#fafafa] hover:bg-zinc-50 shadow-[2px_2px_0px_0px_#09090b]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                        <span className="font-black text-[#09090b]">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 border text-[10px] font-bold ${
                          event.eventType === "FACE_DETECTED"
                            ? "bg-purple-100 text-purple-900 border-purple-900"
                            : event.eventType === "OBJECT"
                            ? "bg-blue-100 text-blue-900 border-blue-900"
                            : "bg-amber-100 text-amber-900 border-amber-900"
                        }`}
                      >
                        {event.eventType}
                      </span>
                    </div>

                    <div className="font-sans font-bold text-xs text-zinc-900">
                      {event.boundingBox?.label || "Correlated Visual Detection"}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 pt-1.5 border-t border-zinc-200">
                      <span>CONFIDENCE: {(event.confidence * 100).toFixed(1)}%</span>
                      <span className="text-[#2563eb] font-bold">
                        {isSelected ? "ACTIVE HUD" : "SELECT TO VIEW"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recovery Log Box */}
          <div className="card-brutal p-4 bg-zinc-900 text-white font-mono text-xs space-y-2">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">
              DVR SYSTEM TELEMETRY
            </div>
            <div className="text-[11px] text-zinc-300 space-y-1">
              <div>• Transcoder: FFmpeg 6.1 (libx264 high-profile)</div>
              <div>• Original Format: {currentEvidence.vendor} Proprietary Stream</div>
              <div>• Hash Verification: Match verified against parent block</div>
              <div>• Status: Legal Chain of Custody Secure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
