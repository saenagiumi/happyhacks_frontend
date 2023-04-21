import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            alignItems: "flex-start",
            backgroundColor: "#fff",
            backgroundImage: "url(https://www.happyhacks.app/bg.png)",
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "left",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#000",
              fontSize: 60,
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: 1.3,
              marginBottom: "30px",
              padding: "0 120px",
              width: "100%",
              wordWrap: "break-word",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#000",
              fontSize: 40,
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: 1.3,
              padding: "0 120px",
              width: "100%",
            }}
          >
          </div>
        </div>
      ),
      {
        height: 630,
        width: 1200,
      }
    );
  } catch (error) {
    console.log(`${error}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
