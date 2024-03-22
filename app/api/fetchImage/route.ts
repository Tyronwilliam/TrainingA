import fetch from "node-fetch";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const image = res?.body?.image;
    if (!image) {
      throw new Error("Image URL not provided");
    }
    const response = await fetch(image);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer(); // Use arrayBuffer() to get binary data

    const imageBuffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
    const imageUrl = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

    return Response.json({ res: imageUrl, status: 200 });
  } catch (err) {
    return Response.json({ error: "Internal Server Error", status: 500 });
  }
}
