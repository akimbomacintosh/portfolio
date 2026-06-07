import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563EB, #0EA5E9)",
        }}
      />
    ),
    { ...size }
  );
}
