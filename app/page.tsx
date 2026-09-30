import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  FileCheck2,
  HardDrive,
  Activity,
  ArrowRight,
  Database,
  Lock,
  Layers,
  Terminal,
  Eye,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b]">

      {/* Main Header / Navigation */}
      <header className="border-b-2 border-[#09090b] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#09090b] text-white flex items-center justify-center font-black text-xl border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#2563eb]">
              <Eye className="w-6 h-6 text-[#2563eb]" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight leading-none">
                TRINETRA
              </div>
              <div className="text-[10px] font-mono tracking-widest text-[#2563eb] font-bold">
                FORENSIC ENGINE
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-wider">
            <a href="#features" className="hover:text-[#2563eb] transition-colors">
              [ Capabilities ]
            </a>
            <a href="#vendors" className="hover:text-[#2563eb] transition-colors">
              [ Supported Vendors ]
            </a>
            <Link href="/login" className="text-[#2563eb] hover:underline font-bold">
              [ Examiner Sign In ]
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="btn-brutal-secondary text-xs hidden sm:flex items-center gap-1.5 py-2 px-3"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/dashboard"
              className="btn-brutal text-sm flex items-center gap-2"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-2 border-[#09090b] bg-[#fafafa] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Mission Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#09090b] text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
                MULTI-VENDOR DVR / NVR SURVEILLANCE FORENSICS
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#09090b]">
                DECODE. RECOVER. <br />
                <span className="bg-[#2563eb] text-white px-2 py-0.5 inline-block my-1 border-2 border-[#09090b] shadow-[4px_4px_0px_0px_#09090b]">
                  ATTEST EVIDENCE.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-700 max-w-xl font-medium leading-relaxed">
                Automated raw byte ingestion and proprietary filesystem recovery
                for proprietary DVR/NVR architectures. Cryptographically
                verified SHA-256 chain of custody with integrated frame-level
                intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="btn-brutal text-base py-3 px-6 shadow-[5px_5px_0px_0px_#09090b] flex items-center gap-3"
                >
                  <Terminal className="w-5 h-5" />
                  <span>Enter Platform</span>
                </Link>
                <Link
                  href="/dashboard/evidence"
                  className="btn-brutal-secondary text-base py-3 px-6 shadow-[5px_5px_0px_0px_#09090b] flex items-center gap-3"
                >
                  <Activity className="w-5 h-5 text-[#2563eb]" />
                  <span>Ingest Footage</span>
                </Link>
              </div>

              {/* Protocol Spec Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-[#09090b]/10 max-w-lg font-mono text-xs">
                <div className="bg-white p-3 border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#09090b]">
                  <div className="text-zinc-500 text-[10px]">INTEGRITY</div>
                  <div className="font-bold text-sm text-[#09090b]">100% SHA-256</div>
                </div>
                <div className="bg-white p-3 border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#09090b]">
                  <div className="text-zinc-500 text-[10px]">THROUGHPUT</div>
                  <div className="font-bold text-sm text-[#09090b]">ZERO LOSS</div>
                </div>
                <div className="bg-white p-3 border-2 border-[#09090b] shadow-[2px_2px_0px_0px_#09090b]">
                  <div className="text-zinc-500 text-[10px]">STANDARDS</div>
                  <div className="font-bold text-sm text-[#2563eb]">SEC. 65B</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Visualization Video Feed */}
            <div className="lg:col-span-5">
              <div className="card-brutal overflow-hidden bg-black text-white relative">
                {/* Surveillance Video Header */}
                <div className="bg-[#09090b] px-3 py-2 border-b-2 border-white/20 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                    <span className="font-bold text-red-400">LIVE VISUALIZATION</span>
                  </div>
                  <span className="text-zinc-400 text-[10px]">CAM-04 [DAHUA_RAW]</span>
                </div>

                {/* Auto-playing Muted Looping Video */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter contrast-125"
                    poster="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
                  >
                    <source
                      src="/surveillance.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Forensic HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between font-mono text-[10px] text-emerald-400 bg-emerald-950/10">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/80 px-2 py-0.5 border border-emerald-500/40">
                        LAT: 28.6139° N | LON: 77.2090° E
                      </div>
                      <div className="bg-black/80 px-2 py-0.5 border border-emerald-500/40 text-yellow-400">
                        FPS: 30.00 [H.264 NORM]
                      </div>
                    </div>

                    <div className="border border-dashed border-emerald-400/60 p-2 max-w-[200px] bg-black/60 backdrop-blur-sm self-center">
                      <div className="text-[9px] text-zinc-300">YOLOv8 BBOX: #01</div>
                      <div className="text-white font-bold text-xs">VEHICLE DETECTED</div>
                      <div className="text-emerald-400 text-[9px]">CONFIDENCE: 98.4%</div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="bg-black/80 px-2 py-0.5 border border-emerald-500/40 text-[9px]">
                        HASH: e3b0c44298fc1c14...
                      </div>
                      <div className="bg-black/80 px-2 py-0.5 border border-emerald-500/40 text-red-400 font-bold">
                        REC [CH-04]
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Footer Telemetry */}
                <div className="p-3 bg-[#09090b] border-t-2 border-white/20 font-mono text-xs flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-zinc-300 text-[11px]">ASYNC WORKER POOL: 4 RUNNING</span>
                  </div>
                  <span className="text-[10px] text-[#2563eb] font-bold">BITRATE: 4.8 Mbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forensic Architecture Pillars */}
      <section id="features" className="py-16 bg-white border-b-2 border-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-mono font-bold text-[#2563eb] uppercase tracking-widest">
              [ Core Engine Capabilities ]
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#09090b] mt-1">
              ENGINEERED FOR JUDICIAL RIGOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-brutal p-6 bg-[#fafafa]">
              <div className="w-12 h-12 bg-[#2563eb] text-white flex items-center justify-center border-2 border-[#09090b] shadow-[3px_3px_0px_0px_#09090b] mb-4">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                1. Proprietary Parsing
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                Carves deep into non-standard storage structures including DHFS
                (Dahua), Hikvision HikFS, CP Plus, and Jovision. Recovers
                unallocated blocks and damaged indices.
              </p>
            </div>

            <div className="card-brutal p-6 bg-[#fafafa]">
              <div className="w-12 h-12 bg-[#09090b] text-white flex items-center justify-center border-2 border-[#09090b] shadow-[3px_3px_0px_0px_#2563eb] mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                2. Cryptographic Custody
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                Immutable SHA-256 and MD5 integrity verification on physical
                ingestion. Zero mutation of raw artifacts with an auditable
                relational trail in PostgreSQL.
              </p>
            </div>

            <div className="card-brutal p-6 bg-[#fafafa]">
              <div className="w-12 h-12 bg-emerald-600 text-white flex items-center justify-center border-2 border-[#09090b] shadow-[3px_3px_0px_0px_#09090b] mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                3. AI Correlation Engine
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                Distributed workers run YOLOv8 object recognition and facial
                vectorization to auto-populate timestamped event timelines and
                generate court-ready judicial reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Matrix */}
      <section id="vendors" className="py-12 bg-[#fafafa] border-b-2 border-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                [ Compatibility Matrix ]
              </span>
              <h3 className="text-xl font-black tracking-tight text-[#09090b]">
                VERIFIED HARDWARE CONTROLLERS
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-600">
              STATUS: CONTINUOUS RECOVERY ACTIVE
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            {["HIKVISION (HikFS/264)", "DAHUA (DHFS 4.x/5.x)", "CP PLUS (Orange/Blue)", "UNIVIEW / TVT"].map(
              (vendor) => (
                <div
                  key={vendor}
                  className="bg-white p-4 border-2 border-[#09090b] shadow-[3px_3px_0px_0px_#09090b] flex items-center justify-between"
                >
                  <span className="font-bold">{vendor}</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#09090b] text-[#fafafa] py-10 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <div className="font-black text-sm text-white flex items-center gap-2">
              <span>TRINETRA FORENSICS</span>
              <span className="text-[#2563eb] text-xs">v1.0.0</span>
            </div>
            <p className="text-zinc-400">
              Autonomous Multi-Vendor DVR/NVR Forensic Analysis Suite.
            </p>
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
            <span>AUDIT TRAIL: COMPLIANT</span>
            <span>AIR-GAPPED READY</span>
            <Link
              href="/dashboard"
              className="text-[#2563eb] font-bold hover:underline"
            >
              [ LAUNCH DASHBOARD ]
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
