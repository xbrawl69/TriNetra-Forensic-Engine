export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Check if a specific file exists for this evidence, or fallback to the local surveillance stream
  const storageDir = path.join(process.cwd(), "public", "storage", "vault");
  let filePath = path.join(storageDir, `${id}.mp4`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(storageDir, "surveillance.mp4");
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), "public", "surveillance.mp4");
  }

  // If local file is found on disk, stream with standard byte-range headers
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      // Convert Node read stream to Web ReadableStream
      const stream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(stream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "video/mp4",
        },
      });
    }

    const fullStream = fs.createReadStream(filePath);
    const stream = new ReadableStream({
      start(controller) {
        fullStream.on("data", (chunk) => controller.enqueue(chunk));
        fullStream.on("end", () => controller.close());
        fullStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      },
    });
  }

  return new NextResponse("Video stream not found", { status: 404 });
}
