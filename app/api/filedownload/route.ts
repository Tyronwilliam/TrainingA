import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, params: { urlImage: string }) {
  //   const { url } = req.query;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.blob();
  //     res.setHeader("Content-Disposition", `attachment; filename="${url}"`);
  //     res.setHeader("Content-Type", response.headers.get("Content-Type"));
  //     data.pipe(res);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  //@ts-ignore
  const urlImage = params.urlImage;

  console.log(urlImage, "HELLLLOO");
  console.log(params, "HELLLLOO");
  try {
    if (typeof urlImage !== "string") {
      throw new Error("Invalid URL");
    }

    const response = await fetch(urlImage);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.arrayBuffer(); // Use arrayBuffer() instead of buffer()

    // response.setHeader(
    //   "Content-Type",
    //   response.headers.get("Content-Type") || "application/octet-stream"
    // );
    NextResponse.json(data);
  } catch (error) {
    console.error("Error downloading file:", error);
    NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
