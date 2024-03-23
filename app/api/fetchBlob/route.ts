import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const image = searchParams?.get("image");
    const name = searchParams?.get("name");
    const fileType = searchParams?.get("type")!;
    if (!image) {
      throw new Error("Image URL not provided");
    }
    const response = await fetch(image, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST, OPTIONS",
        "Content-Type": fileType,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const data = await response.blob(); // Get the image as Blob

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${name}"`,
      },
    });
  } catch (err) {
    return Response.json({ error: "Internal Server Error", status: 500 });
  }
}
