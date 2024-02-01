import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const secretKey = process?.env?.SECRET_RECAPTCHA;

  const postData = await request.json();
  const { gRecaptchaToken } = postData;
  let res: any;
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    return NextResponse.json({
      success: true,
      score: res.data?.score,
    });
  } else {
    return NextResponse.json({ success: false, score: res.data?.score });
  }
}
