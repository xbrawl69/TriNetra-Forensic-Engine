export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const evidenceId = req.nextUrl.searchParams.get("evidenceId");

  try {
    const whereClause = evidenceId ? { evidenceId } : {};
    const analytics = await prisma.analytics.findMany({
      where: whereClause,
      include: {
        evidence: {
          select: {
            id: true,
            originalName: true,
            vendor: true,
            sha256Hash: true,
          },
        },
      },
      orderBy: { timestamp: "asc" },
      take: 50,
    });

    if (analytics.length > 0) {
      return NextResponse.json({
        success: true,
        count: analytics.length,
        timeline: analytics,
      });
    }

    // Default timeline events if database has no records yet
    const mockTimeline = [
      {
        id: "evt-101",
        evidenceId: evidenceId || "clx9011a000108l07a216c5d",
        timestamp: 3.4,
        eventType: "MOTION",
        confidence: 0.98,
        boundingBox: { x: 100, y: 150, width: 220, height: 310, label: "Zone 1 Trigger" },
        evidence: {
          id: evidenceId || "clx9011a000108l07a216c5d",
          originalName: "ch01_20260928_143000.dav",
          vendor: "Dahua",
          sha256Hash: "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
        },
      },
      {
        id: "evt-102",
        evidenceId: evidenceId || "clx9011a000108l07a216c5d",
        timestamp: 11.2,
        eventType: "OBJECT",
        confidence: 0.95,
        boundingBox: { x: 230, y: 140, width: 180, height: 350, label: "Backpack Detected" },
        evidence: {
          id: evidenceId || "clx9011a000108l07a216c5d",
          originalName: "ch01_20260928_143000.dav",
          vendor: "Dahua",
          sha256Hash: "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
        },
      },
      {
        id: "evt-103",
        evidenceId: evidenceId || "clx9011a000108l07a216c5d",
        timestamp: 19.8,
        eventType: "FACE_DETECTED",
        confidence: 0.92,
        boundingBox: { x: 300, y: 90, width: 90, height: 115, label: "Face Angle Verified" },
        evidence: {
          id: evidenceId || "clx9011a000108l07a216c5d",
          originalName: "ch01_20260928_143000.dav",
          vendor: "Dahua",
          sha256Hash: "b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78",
        },
      },
    ];

    return NextResponse.json({
      success: true,
      count: mockTimeline.length,
      timeline: mockTimeline,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Error querying timeline";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
